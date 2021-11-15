import {
  user,
  users,
  createUser,
  updateUser,
  deleteUser,
  login,
  validateToken
} from '@resolver/userResolver';

import {
  role,
  roles,
  createRole,
  updateRole,
  deleteRole
} from '@resolver/roleResolver';

import {
  group,
  groups,
  createGroup,
  updateGroup,
  deleteGroup
} from '@resolver/groupResolver';

import {
  evaluation,
  evaluations,
  answer,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation
} from '@resolver/evaluationResolver';

import {
  answer as getAnswer,
  answers,
  updateAnswer,
  deleteAnswer
} from '@resolver/answerResolver';

import Evaluation from '@model/Evaluation';
import Group from '@model/Group';
import User from '@model/User';
import Role from '@model/Role';
import Answer from '@/database/models/Answer';

const resolvers = {
  Query: {
    user,
    users,
    role,
    roles,
    group,
    groups,
    answer: getAnswer,
    answers,
    evaluation,
    evaluations
  },
  Mutation: {
    login,
    validateToken,
    createUser,
    updateUser,
    deleteUser,
    createRole,
    updateRole,
    deleteRole,
    createGroup,
    updateGroup,
    deleteGroup,
    answer,
    updateAnswer,
    deleteAnswer,
    createEvaluation,
    updateEvaluation,
    deleteEvaluation
  },
  User: {
    role: async (parent: User) => {
      const role = await parent.getRole();
      return role;
    },

    group: async (parent: User) => {
      const group = await parent.getGroup();
      return group;
    }
  },
  Role: {
    users: async (parent: Role) => {
      const users = await parent.getUsers();
      return users;
    }
  },
  Group: {
    users: async (parent: Group) => {
      const users = await parent.getUsers();
      return users;
    }
  },
  Evaluation: {
    answers: async (parent: Evaluation) => {
      const answers = await parent.getAnswers({ include: [{ model: User }] });
      return answers;
    },
    totalUsers: async (parent: Evaluation) => {
      const group = parent.group || (await parent.getGroup());
      const usersCount = await group.countUsers();
      return usersCount;
    },
    completedUsers: async (parent: Evaluation) => {
      const answersCount = await parent.countAnswers();
      return answersCount;
    }
  },
  Answer: {
    user: async (parent: Answer) => {
      const user = await parent.getUser();
      return user;
    },
    evaluation: async (parent: Answer) => {
      const evaluation = await parent.getEvaluation();
      return evaluation;
    }
  }
};

export default resolvers;
