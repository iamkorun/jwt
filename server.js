const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
app.use(bodyParser.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

const userRoute = require("./routes/user");
app.use("/user", userRoute);

mongoose
  .connect(process.env.URL_MONGO, {
    useNewUrlParser: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log("Server running PORT : ", process.env.PORT);
      console.log("For Pull");
    })
  )
  .catch((error) => {
    console.log("Error to connect database", error);
  });
