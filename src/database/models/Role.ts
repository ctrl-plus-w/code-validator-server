/**
 *
 * Role model
 *
 * ---
 *
 * slug: string
 * name: string
 *
 */

import {
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  Model,
  Optional,
  Sequelize
} from 'sequelize';

import type User from '@model/User';

export interface RoleAttributes {
  id: number;
  slug: string;
  name: string;
  permission: number;
}

export type RoleCreationAttributes = Optional<RoleAttributes, 'id'>;

export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  public id!: number;

  public slug!: string;

  public name!: string;

  public permission!: number;

  public users!: User[];

  public getUsers!: HasManyGetAssociationsMixin<User>;

  public countUsers!: HasManyCountAssociationsMixin;

  public hasUser!: HasManyHasAssociationMixin<User, number>;

  public hasUsers!: HasManyHasAssociationsMixin<User, number>;

  public setUsers!: HasManySetAssociationsMixin<User, number>;

  public addUser!: HasManyAddAssociationMixin<User, number>;

  public addUsers!: HasManyAddAssociationsMixin<User, number>;

  public removeUser!: HasManyRemoveAssociationMixin<User, number>;

  public removeUsers!: HasManyRemoveAssociationsMixin<User, number>;

  public createUser!: HasManyCreateAssociationMixin<User>;
}

export const initRole = (sequelize: Sequelize): void => {
  Role.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      permission: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      modelName: 'role',
      tableName: 'role',
      sequelize
    }
  );
};

export default Role;
