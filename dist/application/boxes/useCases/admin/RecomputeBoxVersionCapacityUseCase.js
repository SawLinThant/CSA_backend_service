"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecomputeBoxVersionCapacityUseCase = void 0;
const prismaClient_1 = __importDefault(require("../../../../infrastructure/db/prismaClient"));
function startOfDay(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
function endOfDay(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 23, 59, 59, 999));
}
class RecomputeBoxVersionCapacityUseCase {
    constructor(boxVersionRepository, boxItemRepository, capacitySnapshotRepository) {
        this.boxVersionRepository = boxVersionRepository;
        this.boxItemRepository = boxItemRepository;
        this.capacitySnapshotRepository = capacitySnapshotRepository;
    }
    async execute(boxVersionId, input) {
        const boxVersion = await this.boxVersionRepository.findById(boxVersionId);
        if (!boxVersion)
            throw new Error('Box version not found');
        const cycleDate = startOfDay(input.cycleDate);
        if (boxVersion.startDate > cycleDate) {
            throw new Error('Box version is not active for the selected cycle');
        }
        if (boxVersion.endDate && boxVersion.endDate < cycleDate) {
            throw new Error('Box version has already ended for the selected cycle');
        }
        const items = await this.boxItemRepository.listByBoxVersionId(boxVersionId);
        const requiredItems = items.filter((item) => !item.optional && item.quantity > 0);
        if (requiredItems.length === 0) {
            const snapshot = await this.capacitySnapshotRepository.upsertForCycle({
                boxVersionId,
                cycleDate,
                maxBoxes: 0,
            });
            return { snapshot, debug: { reason: 'no_required_items', itemCaps: [] } };
        }
        const cycleStart = startOfDay(cycleDate);
        const cycleEnd = endOfDay(cycleDate);
        const itemCaps = [];
        for (const item of requiredItems) {
            const agg = await prismaClient_1.default.harvest.aggregate({
                where: {
                    farmerId: item.farmerId,
                    productId: item.productId,
                    status: 'approved',
                    harvestDate: { lte: cycleEnd },
                    availableUntil: { gte: cycleStart },
                },
                _sum: { quantityAvailable: true },
            });
            const totalAvailable = agg._sum.quantityAvailable ?? 0;
            itemCaps.push({
                boxItemId: item.id,
                cap: Math.floor(totalAvailable / item.quantity),
            });
        }
        const maxBoxes = itemCaps.length ? Math.max(0, Math.min(...itemCaps.map((v) => v.cap))) : 0;
        const snapshot = await this.capacitySnapshotRepository.upsertForCycle({
            boxVersionId,
            cycleDate,
            maxBoxes,
        });
        return { snapshot, debug: { reason: 'computed', itemCaps } };
    }
}
exports.RecomputeBoxVersionCapacityUseCase = RecomputeBoxVersionCapacityUseCase;
//# sourceMappingURL=RecomputeBoxVersionCapacityUseCase.js.map