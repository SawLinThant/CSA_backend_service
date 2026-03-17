import {
  createHarvestSchema,
  updateHarvestSchema,
  listMyHarvestsQuerySchema,
  listHarvestsQuerySchema,
} from '../../../application/harvests/dtos/harvestDtos';

export const harvestValidators = {
  createHarvest: createHarvestSchema,
  updateHarvest: updateHarvestSchema,
  listMyHarvestsQuery: listMyHarvestsQuerySchema,
  listHarvestsQuery: listHarvestsQuerySchema,
};
