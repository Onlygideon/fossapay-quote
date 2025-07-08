import * as Joi from 'joi';

export const CreateQuoteSchema = Joi.object({
  amount: Joi.number().positive().required(),
  targetCurrency: Joi.string().uppercase().required(),
});
