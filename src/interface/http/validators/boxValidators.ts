import {
  createBoxSchema,
  updateBoxSchema,
  listBoxesQuerySchema,
  publicBoxDetailQuerySchema,
} from '../../../application/boxes/dtos/boxDtos';
import {
  createBoxVersionSchema,
  updateBoxVersionSchema,
  listBoxVersionsQuerySchema,
} from '../../../application/boxes/dtos/boxVersionDtos';
import {
  createBoxItemSchema,
  updateBoxItemSchema,
} from '../../../application/boxes/dtos/boxItemDtos';
import {
  recomputeBoxVersionCapacitySchema,
  listCapacitySnapshotsQuerySchema,
  updateCapacitySnapshotStatusSchema,
  listInventoryReservationsQuerySchema,
} from '../../../application/boxes/dtos/capacityDtos';

export const boxValidators = {
  createBox: createBoxSchema,
  updateBox: updateBoxSchema,
  listBoxesQuery: listBoxesQuerySchema,
  publicBoxDetailQuery: publicBoxDetailQuerySchema,
  createBoxVersion: createBoxVersionSchema,
  updateBoxVersion: updateBoxVersionSchema,
  listBoxVersionsQuery: listBoxVersionsQuerySchema,
  createBoxItem: createBoxItemSchema,
  updateBoxItem: updateBoxItemSchema,
  recomputeBoxVersionCapacity: recomputeBoxVersionCapacitySchema,
  listCapacitySnapshotsQuery: listCapacitySnapshotsQuerySchema,
  updateCapacitySnapshotStatus: updateCapacitySnapshotStatusSchema,
  listInventoryReservationsQuery: listInventoryReservationsQuerySchema,
};
