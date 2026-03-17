import type { SubscriptionPlanRepository } from '../../../../domain/subscriptions/SubscriptionPlanRepository';
import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { ListSubscriptionPlansQuery } from '../../dtos/subscriptionPlanDtos';

export class AdminListSubscriptionPlansUseCase {
  constructor(
    private readonly subscriptionPlanRepository: SubscriptionPlanRepository,
    private readonly boxRepository: BoxRepository,
  ) {}

  async execute(query: ListSubscriptionPlansQuery) {
    if (query.boxId) {
      const box = await this.boxRepository.findById(query.boxId);
      if (!box) throw new Error('Box not found');
    }
    const skip = (query.page - 1) * query.limit;
    const filters =
      query.boxId !== undefined || query.active !== undefined
        ? {
            ...(query.boxId && { boxId: query.boxId }),
            ...(query.active !== undefined && { active: query.active }),
          }
        : undefined;
    const { items, total } = await this.subscriptionPlanRepository.list(skip, query.limit, filters);
    return { items, total, page: query.page, limit: query.limit };
  }
}
