const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/pinterest-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Db is connected"))
  .catch((error) => console.log("error"));
