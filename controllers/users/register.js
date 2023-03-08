const createError = require("http-errors");
const { modelUser } = require("../../models");
const { usersSchema } = require("../../schema");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const sendEmail = require("../../helpers/sendEmail");
const { v4: uuidv4 } = require("uuid");
const register = async (req, res, next) => {
  try {
    const { error } = usersSchema.validate(req.body);
    if (error) {
      throw createError(400, `${error.message}`);
    }
    const { email, password, subscription } = req.body;
    const user = await modelUser.User.findOne({ email });
    if (user) {
      throw createError(409, `Email in use ${email}`);
    }
    const avatarURL = gravatar.url(email);

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const verificationToken = uuidv4();

    const result = await modelUser.User.create({
      email,
      password: hashPassword,
      subscription,
      avatarURL,
      verificationToken,
    });

    const mail = {
      to: email,
      subject: "Підтвердження реєстрації",
      html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Підтвердіть реєстрацію</a>`,
    };
    await sendEmail(mail);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        email,
        subscription: result.subscription,
        avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = register;
