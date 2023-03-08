const sgEmail = require("@sendgrid/mail");

require("dotenv").config();

const nodemailer = require("nodemailer");

const { MYAPI_SENDGRID, SENDGRID_EMAIL, META_PASSWORD } = process.env;
const nodemalierConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: SENDGRID_EMAIL,
    pass: META_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(nodemalierConfig);

sgEmail.setApiKey(MYAPI_SENDGRID);

const sendEmail = async (body) => {
  try {
    const email = { ...body, from: SENDGRID_EMAIL };
    await transporter.sendMail(email);
    console.log("Email send success", { ...body, SENDGRID_EMAIL });
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;
