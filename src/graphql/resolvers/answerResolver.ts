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
  id?: number;
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

  if (role in [CONFIG.ROLES.ADMIN.SLUG, CONFIG.ROLES.PROFESSOR.SLUG]) {
    const answers =
      role === CONFIG.ROLES.ADMIN.SLUG
        ? await Answer.findAll(params)
        : await user.getAnswers(params);

    return answers;
  } else {
    const { id } = args;
    if (!id) throw new UserInputError('You must specify the evaluation id');

    const evaluation = await Evaluation.findByPk(id);
    if (!evaluation) throw new UserInputError('Evaluation not found');

    const answers = await evaluation.getAnswers(params);
    return answers;
  }
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

  const params = { where: { id }, limit: 1 };

  const [answer] =
    role === CONFIG.ROLES.ADMIN.SLUG
      ? await Answer.findAll(params)
      : await user.getAnswers(params);

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
    updatedAnswer,
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
