"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.harvestValidators = void 0;
const harvestDtos_1 = require("../../../application/harvests/dtos/harvestDtos");
exports.harvestValidators = {
    createHarvest: harvestDtos_1.createHarvestSchema,
    updateHarvest: harvestDtos_1.updateHarvestSchema,
    listMyHarvestsQuery: harvestDtos_1.listMyHarvestsQuerySchema,
    listHarvestsQuery: harvestDtos_1.listHarvestsQuerySchema,
};
//# sourceMappingURL=harvestValidators.js.map