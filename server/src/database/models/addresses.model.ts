import { Model } from 'objection';
import knex from '../config/database';
import { AddressIds } from '../../types/model';
import Streets from './streets.model';

Model.knex(knex);

class Addresses extends Model {
  id!: number;
  streetId!: number;
  zipCode!: string;
  houseNumber!: string;

  static get addresses() {
    return {
      required: ['id', 'streetId', 'zipCode', 'houseNumber'],
      properties: {
        id: { type: 'integer', unsigned: true },
        streetId: { type: 'integer' },
        houseNumber: { type: 'string', length: 7 },
        zipCode: { type: 'string', length: 9 },
      },
    };
  }

  static get relationMappings() {
    return {
      street: {
        relation: Model.BelongsToOneRelation,
        modelClass: Streets,
        join: {
          from: 'addresses.streetId',
          to: 'streets.id',
        },
      },
    };
  }

  static get tableName(): string {
    return 'addresses';
  }
}

export const createStartAndDestinationAddress = async (
  startZipCode: string,
  startHouseNumber: string,
  destinationZipCode: string,
  destinationHouseNumber: string,
  startStreetId: number,
  destinationStreetId: number,
): Promise<AddressIds> => {
  const addressIds: AddressIds = {
    startAddressId: -1,
    destinationAddressId: -1,
  };

  try {
    const existingStartAddress = await Addresses.query().findOne({
      streetId: startStreetId,
      zipCode: startZipCode,
      houseNumber: startHouseNumber,
    });

    if (!existingStartAddress) {
      const newStartAddress = await Addresses.query().insert({
        streetId: startStreetId,
        zipCode: startZipCode,
        houseNumber: startHouseNumber,
      });
      addressIds.startAddressId = newStartAddress.id;
    } else {
      addressIds.startAddressId = existingStartAddress.id;
    }
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Cannot create an starting address');
  }

  try {
    const existingDestinationAddress = await Addresses.query().findOne({
      streetId: destinationStreetId,
      zipCode: destinationZipCode,
      houseNumber: destinationHouseNumber,
    });

    if (!existingDestinationAddress) {
      const newDestinationAddress = await Addresses.query().insert({
        streetId: destinationStreetId,
        zipCode: destinationZipCode,
        houseNumber: destinationHouseNumber,
      });
      addressIds.destinationAddressId = newDestinationAddress.id;
    } else {
      addressIds.destinationAddressId = existingDestinationAddress.id;
    }

    return addressIds;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Cannot create an destination address');
  }
};
export default Addresses;
