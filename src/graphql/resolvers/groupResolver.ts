import { UserInputError } from 'apollo-server-express';

import Group from '@model/Group';

import { checkIsAdmin } from '@middleware/authentication.middleware';

import { slugify } from '@util/string.utils';

import { Context } from '@type/graphql';

interface GetGroupArgs {
  id: number;
}

interface CreateGroupArgs {
  input: {
    name: string;
  };
}

interface UpdateGroupArgs {
  input: {
    id: number;
    name?: string;
  };
}

interface DeleteGroupArgs {
  input: {
    id: number;
  };
}

export const group = async (
  _parent: undefined,
  args: GetGroupArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { id } = args;

  const group = await Group.findByPk(id);
  return group;
};

export const groups = async (
  _parent: undefined,
  _args: undefined,
  context: Context
) => {
  await checkIsAdmin(context);

  const groups = await Group.findAll();
  return groups;
};

export const createGroup = async (
  _parent: undefined,
  args: CreateGroupArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { name } = args.input;

  const group = await Group.findOne({ where: { name } });
  if (group) throw new UserInputError('Group already exists');

  const slug = slugify(name);

  const createdGroup = await Group.create({ name, slug });

  return createdGroup;
};

export const updateGroup = async (
  _parent: undefined,
  args: UpdateGroupArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { id, name } = args.input;

  const group = await Group.findByPk(id);
  if (!group) throw new UserInputError('Group not found');

  const slug = name ? slugify(name) : undefined;

  const updatedGroup = await group.update({
    name,
    slug
  });

  return updatedGroup;
};

export const deleteGroup = async (
  _parent: undefined,
  args: DeleteGroupArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { id } = args.input;

  const group = await Group.findByPk(id);
  if (!group) throw new UserInputError('Group not found');

  await group.destroy();

  return {
    deleted: true
  };
};
