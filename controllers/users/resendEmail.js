const createError = require("http-errors");
const { emailSchema } = require("../../schema");
const { modelUser } = require("../../models");
const sendEmail = require("../../helpers/sendEmail");

const resendEmail = async (req, res, next) => {
  try {
    const { error } = emailSchema.validate(req.body);
    if (error) {
      throw createError(400, `${error.message}`);
    }
    const { email } = req.body;
    const user = await modelUser.User.findOne({ email });
    if (!user) {
      throw createError(404, "Not found");
    }
    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }
    const mail = {
      to: email,
      subject: "Підтвердження реєстрації",
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Підтвердіть реєстрацію</a>`,
    };
    await sendEmail(mail);
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = resendEmail;
