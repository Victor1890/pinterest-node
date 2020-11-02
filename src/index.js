const express = require("express");
const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const { v4: uuid } = require("uuid");
const { format } = require("timeago.js");

//Initializations
const app = express();
require("./db/database");

//Settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/img/uploads"),
  filename: (req, file, cb, filename) => {
    cb(null, uuid() + path.extname(file.originalname));
  },
});
app.use(multer({ storage: storage }).single("image"));

//Globals Variables
app.use((req, res, next) => {
  app.locals.format = format;
  next();
});

//Routes
app.use(require("./routes/index"));

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Start the server
app.listen(3000, () => {
  console.log(`Server on port ${3000}`);
});
