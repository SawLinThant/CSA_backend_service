import type { BoxRepository } from '../../../../domain/boxes/BoxRepository';
import type { PublicBoxDetailQuery } from '../../dtos/boxDtos';
export declare class PublicGetBoxDetailUseCase {
    private readonly boxRepository;
    constructor(boxRepository: BoxRepository);
    execute(boxId: string, query: PublicBoxDetailQuery): Promise<{
        box: {
            id: string;
            name: string;
            description: string | null;
            imageUrl: string | null;
        };
        activePlan: {
            id: string;
            name: string;
            price: number;
            deliveryFrequency: import("../../../../generated/prisma/enums").DeliveryFrequency;
            deliveriesPerCycle: number;
        } | null;
        activeVersion: {
            id: string;
            versionName: string;
            startDate: Date;
            endDate: Date | null;
        } | null;
        sampleItems: {
            id: string;
            quantity: number;
            optional: boolean;
            product: {
                id: string;
                name: string;
                unit: string;
                imageUrl: string | null;
            };
            farmer: {
                id: string;
                name: string;
                farmName: string;
            };
        }[];
        meta: {
            referenceDate: Date;
            disclaimer: string;
        };
    }>;
}
//# sourceMappingURL=PublicGetBoxDetailUseCase.d.ts.map