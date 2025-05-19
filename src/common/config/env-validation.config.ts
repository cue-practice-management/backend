import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MONGO_URI: Joi.string().uri().required(),
  MONGO_DB_NAME: Joi.string().required(),

  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().required(),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number().required(),
  JWT_REFRESH_COOKIE_NAME: Joi.string().required(),

  SUPER_ADMIN_EMAIL: Joi.string().email().required(),
  SUPER_ADMIN_PASSWORD: Joi.string().min(8).required(),
  SUPER_ADMIN_PHONE: Joi.string()
    .pattern(/^\d{10}$/)
    .required(),
  SUPER_ADMIN_DOCUMENT_NUMBER: Joi.string().alphanum().required(),
});
