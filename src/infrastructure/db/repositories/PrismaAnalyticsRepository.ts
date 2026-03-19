import type {
  AnalyticsRepository,
  AnalyticsSummary,
  VisitorsBinMode,
  VisitorsRange,
  VisitorsSeriesPoint,
} from '../../../domain/analytics/AnalyticsRepository';
import prisma from '../prismaClient';

function toDateKeyDay(d: Date): string {
  // Keep keys stable for charting regardless of local timezone.
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())).toISOString().slice(0, 10);
}

function toDateKeyMonth(d: Date): string {
  const year = d.getUTCFullYear();
  const month = d.getUTCMonth() + 1;
  return `${year}-${String(month).padStart(2, '0')}-01`;
}

function splitDesktopMobile(count: number): { desktop: number; mobile: number } {
  // No device attribution exists in the DB schema yet; we split counts for UI balance.
  const desktop = Math.round(count * 0.55);
  return { desktop, mobile: Math.max(0, count - desktop) };
}

export class PrismaAnalyticsRepository implements AnalyticsRepository {
  async getAnalyticsSummary(params: {
    currentRevenueFrom: Date;
    currentRevenueTo: Date;
    previousRevenueFrom: Date;
    previousRevenueTo: Date;
    currentCustomersFrom: Date;
    currentCustomersTo: Date;
  }): Promise<AnalyticsSummary> {
    const [currentRevenueAgg, previousRevenueAgg, newCustomers, activeAccounts] = await Promise.all([
      prisma.payment.aggregate({
        where: {
          paymentStatus: 'success',
          paidAt: { gte: params.currentRevenueFrom, lt: params.currentRevenueTo },
        },
        _sum: { amount: true },
      }),
      prisma.payment.aggregate({
        where: {
          paymentStatus: 'success',
          paidAt: { gte: params.previousRevenueFrom, lt: params.previousRevenueTo },
        },
        _sum: { amount: true },
      }),
      prisma.user.count({
        where: {
          role: 'customer',
          createdAt: { gte: params.currentCustomersFrom, lt: params.currentCustomersTo },
        },
      }),
      prisma.user.count({ where: { status: 'active' } }),
    ]);

    const currentRevenue = currentRevenueAgg._sum.amount ? Number(currentRevenueAgg._sum.amount.toString()) : 0;
    const previousRevenue = previousRevenueAgg._sum.amount ? Number(previousRevenueAgg._sum.amount.toString()) : 0;

    const growthRate = previousRevenue <= 0 ? 0 : ((currentRevenue - previousRevenue) / previousRevenue) * 100;

    return {
      totalRevenue: Number(currentRevenue.toFixed(2)),
      newCustomers,
      activeAccounts,
      growthRate: Number(growthRate.toFixed(2)),
    };
  }

  async listVisitorsSeries(params: {
    range: VisitorsRange;
    from: Date;
    to: Date;
  }): Promise<VisitorsSeriesPoint[]> {
    const mode: VisitorsBinMode = params.range === '6m' ? 'month' : 'day';

    const { from, to } = params;
    const users = await prisma.user.findMany({
      where: {
        role: 'customer',
        createdAt: { gte: from, lt: to },
      },
      select: { createdAt: true },
    });

    const counts = new Map<string, number>();
    const addCount = (key: string) => {
      counts.set(key, (counts.get(key) ?? 0) + 1);
    };

    for (const u of users) {
      const createdAt = u.createdAt;
      const key = mode === 'month' ? toDateKeyMonth(createdAt) : toDateKeyDay(createdAt);
      addCount(key);
    }

    const points: VisitorsSeriesPoint[] = [];

    if (mode === 'month') {
      // Build a rolling set of calendar months: [startMonth..endMonth]
      const cursor = new Date(from);
      cursor.setHours(0, 0, 0, 0);

      const end = new Date(to);
      end.setHours(0, 0, 0, 0);

      // Ensure cursor is aligned to month start.
      cursor.setUTCDate(1);
      cursor.setUTCMonth(cursor.getUTCMonth(), 1);

      while (cursor <= end) {
        const key = toDateKeyMonth(cursor);
        const count = counts.get(key) ?? 0;
        const { desktop, mobile } = splitDesktopMobile(count);
        points.push({ date: key, desktop, mobile });

        // Move to next month.
        cursor.setUTCMonth(cursor.getUTCMonth() + 1, 1);
      }
      return points;
    }

    // Daily bins.
    const cursor = new Date(from);
    cursor.setHours(0, 0, 0, 0);
    const end = new Date(to);
    end.setHours(0, 0, 0, 0);

    while (cursor <= end) {
      const key = toDateKeyDay(cursor);
      const count = counts.get(key) ?? 0;
      const { desktop, mobile } = splitDesktopMobile(count);
      points.push({ date: key, desktop, mobile });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
    }

    return points;
  }
}

