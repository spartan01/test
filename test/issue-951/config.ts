import { devUser } from '../credentials';
import { buildConfig } from '../buildConfig';

const tagSlug = 'tags';

const openAccess = {
  create: () => true,
  read: () => true,
  update: () => true,
  delete: () => true,
};

export default buildConfig({
  collections: [
    {
      slug: 'posts',
      access: openAccess,
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'tags',
          type: 'relationship',
          relationTo: tagSlug,
          hasMany: true,
        },
      ],
    },
    {
      slug: tagSlug,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
  ],
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    });

    const tag1 = await payload.create({
      collection: tagSlug,
      data: {
        name: 'tag1',
      },
    });

    const tag2 = await payload.create({
      collection: tagSlug,
      data: {
        name: 'tag1',
      },
    });

    console.log('tag1.id', tag1.id);
    console.log('tag2.id', tag2.id);
  },
});
