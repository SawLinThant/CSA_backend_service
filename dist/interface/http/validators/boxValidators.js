"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boxValidators = void 0;
const boxDtos_1 = require("../../../application/boxes/dtos/boxDtos");
const boxVersionDtos_1 = require("../../../application/boxes/dtos/boxVersionDtos");
const boxItemDtos_1 = require("../../../application/boxes/dtos/boxItemDtos");
const capacityDtos_1 = require("../../../application/boxes/dtos/capacityDtos");
exports.boxValidators = {
    createBox: boxDtos_1.createBoxSchema,
    updateBox: boxDtos_1.updateBoxSchema,
    listBoxesQuery: boxDtos_1.listBoxesQuerySchema,
    publicBoxDetailQuery: boxDtos_1.publicBoxDetailQuerySchema,
    createBoxVersion: boxVersionDtos_1.createBoxVersionSchema,
    updateBoxVersion: boxVersionDtos_1.updateBoxVersionSchema,
    listBoxVersionsQuery: boxVersionDtos_1.listBoxVersionsQuerySchema,
    createBoxItem: boxItemDtos_1.createBoxItemSchema,
    updateBoxItem: boxItemDtos_1.updateBoxItemSchema,
    recomputeBoxVersionCapacity: capacityDtos_1.recomputeBoxVersionCapacitySchema,
    listCapacitySnapshotsQuery: capacityDtos_1.listCapacitySnapshotsQuerySchema,
    updateCapacitySnapshotStatus: capacityDtos_1.updateCapacitySnapshotStatusSchema,
    listInventoryReservationsQuery: capacityDtos_1.listInventoryReservationsQuerySchema,
};
//# sourceMappingURL=boxValidators.js.map