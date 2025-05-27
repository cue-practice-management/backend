export const VALIDATION_MESSAGES = {
  REQUIRED: '$property is required',
  INVALID_EMAIL: 'The email format is invalid',
  INVALID_DATE: '$property must be a valid date string',
  INVALID_ENUM: '$property contains an invalid value',
  PASSWORD_TOO_WEAK:
    'Password must contain at least 8 characters, including uppercase, lowercase, numbers and special characters',
  INVALID_PHONE_CO:
    'Phone number must be a valid Colombian mobile number (starts with 3 and has 10 digits)',
  INVALID_DOCUMENT_FORMAT:
    '$property is not valid for document type "$constraint1"',
  INVALID_MONGO_ID: '$property is not a valid MongoDB ObjectId',
  INVALID_NUMBER: '$property must be a number',
  INVALID_URL: '$property must be a valid URL',
};
