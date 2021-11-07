import {
  user,
  users,
  createUser,
  updateUser,
  deleteUser
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

import Group from '@model/Group';
import User from '@model/User';
import Role from '@model/Role';

const resolvers = {
  Query: {
    user,
    users,
    role,
    roles,
    group,
    groups
    // answer,
    // answers,
    // evaluation,
    // evaluations
  },
  Mutation: {
    // login,
    createUser,
    updateUser,
    deleteUser,
    createRole,
    updateRole,
    deleteRole,
    createGroup,
    updateGroup,
    deleteGroup
    // answer,
    // updateAnswer,
    // deleteAnswer,
    // createEvaluation,
    // updateEvaluation,
    // deleteEvaluation,
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
  }
};

export default resolvers;
