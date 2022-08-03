import path from 'path';
import { buildConfig } from '../buildConfig';
import { CollectionConfig } from '../../src/collections/config/types';
import { devUser } from '../credentials';

const Categories: CollectionConfig = {
  slug: 'categories',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
};

const Tags: CollectionConfig = {
  slug: 'tags',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
};

const Opportunity: CollectionConfig = {
  slug: 'opportunities',
  fields: [
    {
      name: 'opportunity',
      label: 'Opportunity Name',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
  ],
};

export default buildConfig({
  admin: {
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config?.resolve?.alias,
          fs: path.resolve(__dirname, './mocks/emptyModule.js'),
        },
      },
    }),
  },
  collections: [
    Opportunity,
    Tags,
    Categories,
  ],
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    });
    await payload.create({
      collection: 'tags',
      data: {
        name: 'tag',
      },
    });
    await payload.create({
      collection: 'categories',
      data: {
        name: 'category',
      },
    });
  },
});
