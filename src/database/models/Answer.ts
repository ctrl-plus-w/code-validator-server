/**
 *
 * Answer model
 *
 * ---
 *
 * evaluation: Evaluation
 * user: User
 * content: string
 *
 * corrected: boolean
 *
 * elementUsage: number
 * cleanliness: number
 * unitTests: number
 * note: string
 *
 */

import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  Optional,
  Sequelize
} from 'sequelize';

import type Evaluation from '@model/Evaluation';
import type User from '@model/User';

interface AnswerAttributes {
  id: number;
  corrected: boolean;
  elementUsage: number;
  cleanliness: number;
  unitTests: number;
  note: string;
}

type AnswerCreationAttributes = Optional<AnswerAttributes, 'id'>;

export class Answer
  extends Model<AnswerAttributes, AnswerCreationAttributes>
  implements AnswerAttributes
{
  public id!: number;

  public corrected!: boolean;

  public elementUsage!: number;

  public cleanliness!: number;

  public unitTests!: number;

  public note!: string;

  public createdAt!: Date;

  public updatedAt!: Date;

  public user!: User;

  public getUser!: BelongsToGetAssociationMixin<User>;

  public setUser!: BelongsToSetAssociationMixin<User, number>;

  public createUser!: BelongsToCreateAssociationMixin<User>;

  public evaluation!: Evaluation;

  public getEvaluation!: BelongsToGetAssociationMixin<Evaluation>;

  public setEvaluation!: BelongsToSetAssociationMixin<Evaluation, number>;

  public createEvaluation!: BelongsToCreateAssociationMixin<Evaluation>;
}

export const initAnswer = (sequelize: Sequelize): void => {
  Answer.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      corrected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      elementUsage: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      cleanliness: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      unitTests: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },
      note: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      modelName: 'answer',
      tableName: 'answer',
      sequelize
    }
  );
};

export default Answer;
