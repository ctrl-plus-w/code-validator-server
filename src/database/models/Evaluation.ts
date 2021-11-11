/**
 *
 * Evaluation model
 *
 * ---
 *
 * slug: string
 * title: string
 * subject: string
 * deadline: Date
 * owner: User
 * answers: Answer[]
 * group: Group
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

import type Answer from '@model/Answer';
import type User from '@model/User';
import Group from './Group';

export interface EvaluationAttributes {
  id: number;

  title: string;
  slug: string;

  subject: string;

  deadline: Date;
}

export type EvaluationCreationAttributes = Optional<EvaluationAttributes, 'id'>;

export class Evaluation
  extends Model<EvaluationAttributes, EvaluationCreationAttributes>
  implements EvaluationAttributes
{
  public id!: number;

  public title!: string;

  public slug!: string;

  public subject!: string;

  public deadline!: Date;

  public createdAt!: Date;

  public updatedAt!: Date;

  public user!: User;

  public getUser!: BelongsToGetAssociationMixin<User>;

  public setUser!: BelongsToSetAssociationMixin<User, number>;

  public createUser!: BelongsToCreateAssociationMixin<User>;

  public group!: Group;

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
}

export const initEvaluation = (sequelize: Sequelize): void => {
  Evaluation.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      subject: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      modelName: 'evaluation',
      tableName: 'evaluation',
      sequelize
    }
  );
};

export default Evaluation;
