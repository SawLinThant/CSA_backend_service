import type { DeliveryFrequency } from '../../subscriptions/SubscriptionPlan';

export class CycleDateCalculator {
  addCycle(from: Date, frequency: DeliveryFrequency): Date {
    if (frequency === 'weekly') return this.addWeeks(from, 1);
    return this.addMonthsSafe(from, 1);
  }

  private addWeeks(date: Date, weeks: number): Date {
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() + weeks * 7);
    return result;
  }

  private addMonthsSafe(date: Date, months: number): Date {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const targetMonth = month + months;
    const targetYear = year + Math.floor(targetMonth / 12);
    const normalizedMonth = ((targetMonth % 12) + 12) % 12;
    const maxDay = new Date(Date.UTC(targetYear, normalizedMonth + 1, 0)).getUTCDate();
    const clampedDay = Math.min(day, maxDay);

    return new Date(
      Date.UTC(
        targetYear,
        normalizedMonth,
        clampedDay,
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
        date.getUTCMilliseconds(),
      ),
    );
  }
}

