export const OrganizationPropsSchema = {
  type: 'object',
  properties: {
    name: { type: 'object', errorMessage: { required: 'Name is required' } },
    email: { type: 'object', errorMessage: { required: 'Email is required' } },
    phone: { type: 'object' },
    tax_id: { type: 'object', errorMessage: { required: 'Tax ID is required' } },
    status: { type: 'object', errorMessage: { required: 'Status is required' } }
  },
  required: ['name', 'email', 'tax_id', 'status'],
};

