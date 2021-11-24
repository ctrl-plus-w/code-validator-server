import { AuthenticationError, UserInputError } from 'apollo-server-express';

import Evaluation from '@model/Evaluation';
import Answer from '@model/Answer';
import User from '@model/User';

import {
  checkIsAdmin,
  checkIsAdminOrProfessor,
  isLoggedIn
} from '@middleware/authentication.middleware';

import { Context } from '@type/graphql';

import CONFIG from '@/config';

interface GetAnswerArgs {
  id: number;
}

interface GetAnswersArgs {
  evaluationId?: number;
}

interface UpdateAnswerArgs {
  input: {
    id: number;

    elementUsage?: number;
    cleanliness?: number;
    unitTests?: number;

    note?: string;
  };
}

interface DeleteAnswerArgs {
  id: number;
}

export const answer = async (
  _parent: undefined,
  args: GetAnswerArgs,
  context: Context
) => {
  await isLoggedIn(context);

  const { user } = context;
  if (!user) throw new AuthenticationError('You must be logged in');

  const { id } = args;

  const role = context.jwt.role.slug;

  if (role === CONFIG.ROLES.ADMIN.SLUG) {
    const answer = await Answer.findByPk(id);
    return answer;
  }

  if (role === CONFIG.ROLES.PROFESSOR.SLUG) {
    const evaluationIds = await user
      .getEvaluations({ attributes: ['id'] })
      .then((evs) => evs.map((ev) => ev.id));

    const answer = await Answer.findOne({
      where: { id },
      include: [
        { model: Evaluation, where: { id: evaluationIds }, attributes: [] }
      ]
    });

    return answer;
  }

  if (role === CONFIG.ROLES.STUDENT.SLUG) {
    const [answer] = await user.getAnswers({ limit: 1 });
    return answer;
  }
};

export const answers = async (
  _parent: undefined,
  args: GetAnswersArgs,
  context: Context
) => {
  await isLoggedIn(context);

  const { user } = context;
  if (!user) throw new AuthenticationError('You must be logged in');

  const role = context.jwt.role.slug;

  const params = { include: [{ model: User }, { model: Evaluation }] };

  if (role === CONFIG.ROLES.ADMIN.SLUG) {
    const answers = await Answer.findAll(params);
    return answers;
  }

  if (role === CONFIG.ROLES.PROFESSOR.SLUG) {
    const { evaluationId } = args;
    if (!evaluationId)
      throw new UserInputError('You must specify the evaluation id');

    const [evaluation] = await user.getEvaluations({ attributes: ['id'] });

    const answers = await evaluation.getAnswers();
    return answers;
  }

  if (role === CONFIG.ROLES.STUDENT.SLUG) {
    const answers = await user.getAnswers();
    return answers;
  }

  return [];
};

export const updateAnswer = async (
  _parent: undefined,
  args: UpdateAnswerArgs,
  context: Context
) => {
  await checkIsAdminOrProfessor(context);

  const { user } = context;
  if (!user) throw new UserInputError('You must be logged in');

  const role = context.jwt.role.slug;

  const { id, cleanliness, elementUsage, note, unitTests } = args.input;

  const userEvaluationsId = (
    await user.getEvaluations({ attributes: ['id'] })
  ).map((ev) => ev.id);

  const professorParams = {
    include: [
      { model: Evaluation, where: { id: userEvaluationsId }, attributes: [] }
    ]
  };

  const params = role === CONFIG.ROLES.ADMIN.SLUG ? {} : professorParams;

  const answer = await Answer.findByPk(id, { ...params });

  if (!answer) throw new UserInputError('Answer not found');

  const updatedAnswer = await answer.update({
    cleanliness,
    elementUsage,
    note,
    unitTests,
    corrected: true
  });

  const owner = await updatedAnswer.getUser();
  const evaluation = await updatedAnswer.getEvaluation();

  return {
    ...updatedAnswer.toJSON(),
    evaluation,
    owner
  };
};

export const deleteAnswer = async (
  _parent: undefined,
  args: DeleteAnswerArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { id } = args;

  const answer = await Answer.findByPk(id);
  if (!answer) throw new UserInputError('Answer not found');

  await answer.destroy();

  return {
    deleted: true
  };
};
