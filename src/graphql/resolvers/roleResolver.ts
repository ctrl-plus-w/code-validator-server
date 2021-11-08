import { UserInputError } from 'apollo-server-express';

import Role from '@model/Role';

import { checkIsAdmin } from '@middleware/authentication.middleware';

import { slugify } from '@util/string.utils';

import { Context } from '@type/graphql';

interface GetRoleArgs {
  id: number;
}

interface CreateRoleArgs {
  input: {
    name: string;
    permission: number;
  };
}

interface UpdateRoleArgs {
  input: {
    id: number;
    name?: string;
    permission?: number;
  };
}

interface DeleteRoleArgs {
  input: {
    id: number;
  };
}

export const role = async (
  _parent: undefined,
  args: GetRoleArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { id } = args;

  const role = await Role.findByPk(id);
  return role;
};

export const roles = async (
  _parent: undefined,
  _args: undefined,
  context: Context
) => {
  await checkIsAdmin(context);

  const roles = await Role.findAll();
  return roles;
};

export const createRole = async (
  _parent: undefined,
  args: CreateRoleArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { name, permission } = args.input;

  const role = await Role.findOne({ where: { name } });
  if (role) throw new UserInputError('Role already exists');

  const slug = slugify(name);

  const createdRole = await Role.create({
    name,
    slug,
    permission
  });

  return {
    ...createdRole.toJSON()
  };
};

export const updateRole = async (
  _parent: undefined,
  args: UpdateRoleArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { id, name, permission } = args.input;

  const role = await Role.findByPk(id);
  if (!role) throw new UserInputError('Role not found');

  const slug = name ? slugify(name) : undefined;

  const updatedRole = await role.update({
    name,
    slug,
    permission
  });

  return updatedRole;
};

export const deleteRole = async (
  _parent: undefined,
  args: DeleteRoleArgs,
  context: Context
) => {
  await checkIsAdmin(context);

  const { id } = args.input;

  const role = await Role.findByPk(id);
  if (!role) throw new UserInputError('Role not found');

  await role.destroy();

  return {
    deleted: true
  };
};
