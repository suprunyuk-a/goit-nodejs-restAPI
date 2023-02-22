const Joi = require("joi");
const contactsPlan = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const updateFavoriteContact = Joi.object({
  favorite: Joi.bool().required(),
});
module.exports = { contactsPlan, updateFavoriteContact };
