import { AuthenticationError, UserInputError } from 'apollo-server-express';

import Evaluation from '@model/Evaluation';
import Answer from '@model/Answer';
import Group from '@model/Group';
import User from '@model/User';

import {
  checkIsAdminOrProfessor,
  checkIsProfessor
} from '@middleware/authentication.middleware';

import { Context } from '@type/graphql';
import { slugify } from '@util/string.utils';

interface GetEvaluationArgs {
  id: number;
}

interface CreateEvaluationArgs {
  input: {
    title: string;
    subject: string;

    deadline: Date;

    groupId: number;
  };
}

interface UpdateEvaluationArgs {
  input: {
    id: number;

    title?: string;
    subject?: string;

    deadline?: Date;

    groupId?: number;
  };
}

interface DeleteEvaluationArgs {
  input: {
    id: number;
  };
}

export const evaluation = async (
  _parent: undefined,
  args: GetEvaluationArgs,
  context: Context
) => {
  await checkIsAdminOrProfessor(context);

  const user = context.user;
  if (!user) throw new AuthenticationError('You must be logged in');

  const { id } = args;

  const role = context.jwt.role.slug;

  const params = { where: { id }, limit: 1 };

  const [evaluation] =
    role === 'professeur'
      ? await user.getEvaluations(params)
      : await Evaluation.findAll(params);

  return evaluation;
};

export const evaluations = async (
  _parent: undefined,
  args: undefined,
  context: Context
) => {
  await checkIsAdminOrProfessor(context);

  const { user } = context;
  if (!user) throw new AuthenticationError('You must be logged in');

  const role = context.jwt.role.slug;

  const where = role === 'enseignant' ? { id: user.id } : {};

  const evaluations = await Evaluation.findAll({
    include: [{ model: User, where }, { model: Answer }, { model: Group }]
  });

  return evaluations;
};

export const createEvaluation = async (
  _parent: undefined,
  args: CreateEvaluationArgs,
  context: Context
) => {
  await checkIsProfessor(context);

  const { user } = context;
  if (!user) throw new AuthenticationError('You must be logged in');

  const { deadline, groupId, subject, title } = args.input;

  const slug = slugify(title);

  const evaluation = await Evaluation.findOne({ where: { slug } });
  if (evaluation) throw new UserInputError('Evaluation already exists');

  const group = await Group.findByPk(groupId);
  if (!group) throw new UserInputError('Group not found');

  const createdEvaluation = await user.createEvaluation({
    title,
    slug,
    deadline,
    subject
  });

  await createdEvaluation.setGroup(group);

  return {
    ...createdEvaluation.toJSON(),
    owner: user,
    group: group
  };
};

export const updateEvaluation = async (
  _parent: undefined,
  args: UpdateEvaluationArgs,
  context: Context
) => {
  await checkIsAdminOrProfessor(context);

  const { user } = context;
  if (!user) throw new AuthenticationError('You must be logged in');

  const { id, deadline, groupId, subject, title } = args.input;

  const role = context.jwt.role.slug;

  const params = { where: { id }, limit: 1 };

  let group: Group | null;

  const [evaluation] =
    role === 'administrateur'
      ? await Evaluation.findAll(params)
      : await user.getEvaluations(params);

  if (!evaluation) throw new UserInputError('Evaluation not found');

  const owner = await evaluation.getUser();
  group = await evaluation.getGroup();

  if (groupId) {
    group = await Group.findByPk(groupId);
    if (!group) throw new UserInputError('Group not found');

    await evaluation.setGroup(group);
  }

  const updatedEvaluation = await evaluation.update({
    title,
    slug: title ? slugify(title) : undefined,
    deadline,
    subject
  });

  return {
    ...updatedEvaluation.toJSON(),
    group,
    owner
  };
};

export const deleteEvaluation = async (
  _parent: undefined,
  args: DeleteEvaluationArgs,
  context: Context
) => {
  await checkIsAdminOrProfessor(context);

  const { user } = context;
  if (!user) throw new AuthenticationError('You must be logged in');

  const { id } = args.input;

  const role = context.jwt.role.slug;

  const params = { where: { id }, limit: 1 };

  const [evaluation] =
    role === 'administrateur'
      ? await Evaluation.findAll(params)
      : await user.getEvaluations(params);

  if (!evaluation) throw new UserInputError('Evaluation not found');

  await evaluation.destroy();

  return {
    deleted: true
  };
};
