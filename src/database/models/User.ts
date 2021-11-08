/**
 *
 * User model
 *
 * ---
 *
 * firstname: string
 * lastname: string
 * username: string
 * password: string
 * gender: string
 *
 * role: Role
 * group: Group;
 *
 * answers: Answer[]
 *
 * evaluations: Evaluation[]
 *
 */

import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
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

import type Evaluation from '@model/Evaluation';
import type Answer from '@model/Answer';
import type Group from '@model/Group';
import type Role from '@model/Role';

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;

  gender: string | null;
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>;

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;

  public firstName!: string;

  public lastName!: string;

  public username!: string;

  public password!: string;

  public gender!: string | null;

  public role?: Role;

  public getRole!: BelongsToGetAssociationMixin<Role>;

  public setRole!: BelongsToSetAssociationMixin<Role, number>;

  public createRole!: BelongsToCreateAssociationMixin<Role>;

  public group?: Group;

  public getGroup!: BelongsToGetAssociationMixin<Group>;

  public setGroup!: BelongsToSetAssociationMixin<Group, number>;

  public createGroup!: BelongsToCreateAssociationMixin<Group>;

  public answers!: Answer[];

  public getAnswers!: HasManyGetAssociationsMixin<Answer>;

  public countAnswers!: HasManyCountAssociationsMixin;

  public hasAnswer!: HasManyHasAssociationMixin<Answer, number>;

  public hasAnswers!: HasManyHasAssociationsMixin<Answer, number>;

  public setAnswers!: HasManySetAssociationsMixin<Answer, number>;

  public addAnswer!: HasManyAddAssociationMixin<Answer, number>;

  public addAnswers!: HasManyAddAssociationsMixin<Answer, number>;

  public removeAnswer!: HasManyRemoveAssociationMixin<Answer, number>;

  public removeAnswers!: HasManyRemoveAssociationsMixin<Answer, number>;

  public createAnswer!: HasManyCreateAssociationMixin<Answer>;

  public evaluations!: Evaluation[];

  public getEvaluations!: HasManyGetAssociationsMixin<Evaluation>;

  public countEvaluations!: HasManyCountAssociationsMixin;

  public hasEvaluation!: HasManyHasAssociationMixin<Evaluation, number>;

  public hasEvaluations!: HasManyHasAssociationsMixin<Evaluation, number>;

  public setEvaluations!: HasManySetAssociationsMixin<Evaluation, number>;

  public addEvaluation!: HasManyAddAssociationMixin<Evaluation, number>;

  public addEvaluations!: HasManyAddAssociationsMixin<Evaluation, number>;

  public removeEvaluation!: HasManyRemoveAssociationMixin<Evaluation, number>;

  public removeEvaluations!: HasManyRemoveAssociationsMixin<Evaluation, number>;

  public createEvaluation!: HasManyCreateAssociationMixin<Evaluation>;
}

export const initUser = (sequelize: Sequelize): void => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      modelName: 'user',
      tableName: 'user',
      sequelize
    }
  );
};

export default User;
