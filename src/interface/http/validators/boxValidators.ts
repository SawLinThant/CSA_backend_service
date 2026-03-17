import {
  createBoxSchema,
  updateBoxSchema,
  listBoxesQuerySchema,
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

export const boxValidators = {
  createBox: createBoxSchema,
  updateBox: updateBoxSchema,
  listBoxesQuery: listBoxesQuerySchema,
  createBoxVersion: createBoxVersionSchema,
  updateBoxVersion: updateBoxVersionSchema,
  listBoxVersionsQuery: listBoxVersionsQuerySchema,
  createBoxItem: createBoxItemSchema,
  updateBoxItem: updateBoxItemSchema,
};
