import { Model } from 'objection';
import knex from '../config/database';
import Rides from './rides.model';
import LookingForDrivers from './lookingForDrivers.model';
import Statuses from './statuses.model';
import Users from './users.model';

Model.knex(knex);

class UserRides extends Model {
  id!: number;
  userId!: number;
  rideId!: number;
  lookingForDriverId?: number;
  statusId!: number;

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['userId', 'rideId', 'statusId'],
      properties: {
        id: { type: 'integer' },
        userId: { type: 'integer' },
        rideId: { type: 'integer' },
        lookingForDriverId: { type: ['integer', 'null'] },
        statusId: { type: 'integer' },
      },
    };
  }

  static get tableName(): string {
    return 'userRides';
  }

  static get relationMappings() {
    return {
      ride: {
        relation: Model.BelongsToOneRelation,
        modelClass: Rides,
        join: {
          from: 'userRides.rideId',
          to: 'rides.id',
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: Users,
        join: {
          from: 'userRides.userId',
          to: 'users.id',
        },
      },
      lookingForDriver: {
        relation: Model.BelongsToOneRelation,
        modelClass: LookingForDrivers,
        join: {
          from: 'userRides.lookingForDriverId',
          to: 'lookingForDrivers.id',
        },
      },
      status: {
        relation: Model.BelongsToOneRelation,
        modelClass: Statuses,
        join: {
          from: 'userRides.statusId',
          to: 'statuses.id',
        },
      },
    };
  }
}

export async function getUserRidesByUserId(
  userId: number,
): Promise<UserRides[]> {
  try {
    return await UserRides.query()
        .where('userRides.userId', userId) // filter by userId
        .withGraphFetched(`[user, status, lookingForDriver, ride.[driver, startAddress.[street.[city]],destinationAddress.[street.[city]]]]`)
  } catch (error) {
    console.error('Error getting userRides:', error);
    throw error;
  }
}

export default UserRides;
