import { UserInputError } from 'apollo-server-express';
import { sign, verify } from 'jsonwebtoken';

import Group from '@model/Group';
import Role from '@model/Role';
import User from '@model/User';

import { hash, verify as compare } from '@util/bcrypt.utils';

import { checkIsAdmin } from '@middleware/authentication.middleware';

import { Context } from '@type/graphql';

import CONFIG from '@/config';

interface GetUserArgs {
  id: number;
}

interface DeleteUserArgs {
  input: {
    id: number;
  };
}

interface LoginArgs {
  input: {
    username: string;
    password: string;
  };
}

interface ValidateTokenArgs {
  input: {
    token: string;
  };
}

interface CreateUserArgs {
  input: {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    gender: string;

    roleId: number;
  };
}

interface UpdateUserArgs {
  input: {
    id: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    password?: string;
    gender?: string;

    roleId?: number;
    groupId?: number;
  };
}

export const user = async (
  _parent: undefined,
  args: GetUserArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { id } = args;

  const user = await User.findByPk(id);
  return user;
};

export const users = async (
  _parent: undefined,
  _args: undefined,
  context: Context
) => {
  await checkIsAdmin(context);

  const users = await User.findAll();
  return users;
};

export const login = async (_parent: undefined, args: LoginArgs) => {
  const AUTH_ERROR = new UserInputError('Wrong username or password');

  const { password, username } = args.input;

  const user = await User.findOne({ where: { username }, include: [Role] });
  if (!user) throw AUTH_ERROR;

  const isPasswordValid = compare(password, user.password);
  if (!isPasswordValid) throw AUTH_ERROR;

  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName
  };

  const token = sign(payload, CONFIG.AUTH.TOKEN_SALT, {
    expiresIn: `${CONFIG.AUTH.TOKEN_DURATION}h`
  });

  return {
    ...payload,
    token
  };
};

export const validateToken = async (
  _parent: undefined,
  args: ValidateTokenArgs
) => {
  const { token } = args.input;

  try {
    const payload = verify(token, CONFIG.AUTH.TOKEN_SALT);

    if (typeof payload === 'string') throw new Error();

    return {
      ...payload,
      token
    };
  } catch (_) {
    throw new UserInputError('Invalid token');
  }
};

export const createUser = async (
  _parent: undefined,
  args: CreateUserArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { firstName, gender, lastName, password, username, roleId } =
    args.input;

  if (!['male', 'female'].includes(gender))
    throw new UserInputError('Gender must be "male" or "female"');

  const user = await User.findOne({ where: { username } });
  if (user) throw new UserInputError('User already exists');

  const role = await Role.findByPk(roleId);
  if (!role) throw new UserInputError('Role not found');

  const createdUser = await User.create({
    firstName,
    lastName,
    gender,
    username,
    password: hash(password)
  });

  await createdUser.setRole(role);

  return {
    ...createdUser.toJSON(),
    role: role.toJSON()
  };
};

export const updateUser = async (
  _parent: undefined,
  args: UpdateUserArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const {
    id,
    firstName,
    lastName,
    gender,
    username,
    password,
    roleId,
    groupId
  } = args.input;

  let role: Role | null = null;
  let group: Group | null = null;

  const user = await User.findByPk(id);
  if (!user) throw new UserInputError('User not found');

  role = await user.getRole();
  group = await user.getGroup();

  if (roleId) {
    role = await Role.findByPk(roleId);
    if (!role) throw new UserInputError('Role not found');

    await user.setRole(role);
  }

  if (groupId) {
    group = await Group.findByPk(groupId);
    if (!group) throw new UserInputError('Group not found');

    await user.setGroup(group);
  }

  const updatedUser = await user.update({
    username,
    firstName,
    lastName,
    password: password ? hash(password) : undefined,
    gender
  });

  return {
    ...updatedUser.toJSON(),
    group,
    role
  };
};

export const deleteUser = async (
  _parent: undefined,
  args: DeleteUserArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { id } = args.input;

  const user = await User.findByPk(id);
  if (!user) throw new UserInputError('User not found');

  await user.destroy();

  return {
    deleted: true
  };
};
