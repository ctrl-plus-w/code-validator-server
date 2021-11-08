/**
 *
 * Group model
 *
 * ---
 *
 * slug: string
 * name: string
 *
 */

import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin
} from 'sequelize';

import type User from '@model/User';

export interface GroupAttributes {
  id: number;
  slug: string;
  name: string;
}

export type GroupCreationAttributes = Optional<GroupAttributes, 'id' | 'slug'>;

export class Group
  extends Model<GroupAttributes, GroupCreationAttributes>
  implements GroupAttributes
{
  public id!: number;

  public slug!: string;

  public name!: string;

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

  public groups!: Group[];

  public getGroups!: HasManyGetAssociationsMixin<Group>;

  public countGroups!: HasManyCountAssociationsMixin;

  public hasGroup!: HasManyHasAssociationMixin<Group, number>;

  public hasGroups!: HasManyHasAssociationsMixin<Group, number>;

  public setGroups!: HasManySetAssociationsMixin<Group, number>;

  public addGroup!: HasManyAddAssociationMixin<Group, number>;

  public addGroups!: HasManyAddAssociationsMixin<Group, number>;

  public removeGroup!: HasManyRemoveAssociationMixin<Group, number>;

  public removeGroups!: HasManyRemoveAssociationsMixin<Group, number>;

  public createGroup!: HasManyCreateAssociationMixin<Group>;
}

export const initGroup = (sequelize: Sequelize): void => {
  Group.init(
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
      }
    },
    {
      modelName: 'group',
      tableName: 'group',
      sequelize
    }
  );
};

export default Group;
