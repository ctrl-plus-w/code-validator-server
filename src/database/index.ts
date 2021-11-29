import { Sequelize, Dialect } from 'sequelize';

import Evaluation, { initEvaluation } from '@model/Evaluation';
import Answer, { initAnswer } from '@model/Answer';
import Group, { initGroup } from '@model/Group';
import Role, { initRole } from '@model/Role';
import User, { initUser } from '@model/User';

import CONFIG from '@/config';

const { NAME, PASSWORD, USER, DIALECT } = CONFIG.DATABASE;

if (!NAME || !PASSWORD || !USER || !DIALECT)
  throw new Error('Missing credentials');

const sequelize = new Sequelize(NAME, USER, PASSWORD, {
  dialect: DIALECT as Dialect,
  logging: false
});

/* Initialize the models */

initEvaluation(sequelize);
initAnswer(sequelize);
initGroup(sequelize);
initRole(sequelize);
initUser(sequelize);

/* Register the associations */
User.belongsTo(Role, { foreignKey: 'roleId' });
User.belongsTo(Group);
User.hasMany(Answer);
User.hasMany(Evaluation);

Role.hasMany(User);

Group.hasMany(User);
Group.hasMany(Evaluation);

Answer.belongsTo(User);
Answer.belongsTo(Evaluation);

Evaluation.hasMany(Answer);
Evaluation.belongsTo(User);
Evaluation.belongsTo(Group);

export default sequelize;
