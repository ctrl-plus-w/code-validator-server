import { UserInputError } from 'apollo-server-express';

import Group from '@model/Group';
import Role from '@model/Role';
import User from '@model/User';

import { hash } from '@util/bcrypt.utils';
import { valOrUndefined } from '@/utils/format.utils';

interface GetUserArgs {
  id: number;
}

interface DeleteUserArgs {
  input: {
    id: number;
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

export const user = async (_parent: undefined, args: GetUserArgs) => {
  const { id } = args;

  const user = await User.findByPk(id);
  return user;
};

export const users = async () => {
  const users = await User.findAll();
  return users;
};

export const createUser = async (_parent: undefined, args: CreateUserArgs) => {
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

export const updateUser = async (_parent: undefined, args: UpdateUserArgs) => {
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

export const deleteUser = async (_parent: undefined, args: DeleteUserArgs) => {
  const { id } = args.input;

  const user = await User.findByPk(id);
  if (!user) throw new UserInputError('User not found');

  await user.destroy();

  return {
    deleted: true
  };
};
