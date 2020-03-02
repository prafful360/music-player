const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();

const music = require("./api/routes/music");
app.use("/music", music);

// Config DataBase and Mongoose
mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({
      database_error: err
    });
  });
// DB Configuration ends here!

// Registering Cors
app.use(cors());
// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// configure body-parser ends here

// making multer.js a static file
app.use("/uploads", express.static("uploads"));

app.use(morgan("dev")); // Config Morgan
//define first route
app.get("/", (req, res) => {
  res.json("Hola MEVN devs....Assemble");
});
app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
