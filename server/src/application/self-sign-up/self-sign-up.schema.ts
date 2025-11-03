
export const SelfSignUpInputSchema = {
  type: 'object',
  properties: {
    full_name: {
      type: 'string',
      minLength: 3,
      maxLength: 100,
      errorMessage: {
        minLength: 'Full name must be at least 3 characters long',
        maxLength: 'Full name must be less than 100 characters long',
      }
    },
    email: {
      type: 'string',
      format: 'email',
      errorMessage: { format: 'Invalid email' },
    },
    phone: {
      type: 'string',
    },
    password: {
      type: 'string',
      minLength: 8,
      maxLength: 128,
      errorMessage: {
        minLength: 'Password must be at least 8 characters long',
        maxLength: 'Password must be less than 128 characters long',
      },
    },
  },
  required: ['full_name', 'email', 'password'],
  errorMessage: {
    required: {
      full_name: 'Full name is required',
      email: 'Email is required',
      password: 'Password is required',
    }
  }
};
