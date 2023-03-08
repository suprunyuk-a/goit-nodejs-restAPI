const createHttpError = require("http-errors");
const { modelUser } = require("../../models");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await modelUser.User.findOne({ verificationToken });

    if (!user) {
      throw createHttpError(404, "User not found");
    }
    await modelUser.User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
    res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = verifyEmail;
