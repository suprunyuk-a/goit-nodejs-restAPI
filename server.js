const mongoose = require("mongoose");

const app = require("./app");
const { PORT = 3000 } = process.env;
mongoose
  .connect(
    "mongodb+srv://suprunyuk:Yma2U5OxnOPZxudw@contacts.rmfmoxh.mongodb.net/db-contacts"
  )
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
