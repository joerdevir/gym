export const UserPropsSchema = {
  type: 'object',
  properties: {
    name: { type: 'object', errorMessage: { required: 'Name is required' } },
    email: { type: 'object', errorMessage: { required: 'Email is required' } },
    phone: { type: 'object' },
    role: { type: 'object', errorMessage: { required: 'Role is required' } }
  },
  required: ['name', 'email', 'role'],
};
