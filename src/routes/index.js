const { Router } = require("express");
const { unlink } = require("fs-extra");
const path = require("path");
const router = Router();

const Image = require("../models/Imagen");

router.get("/", async (req, res) => {
  const images = await Image.find();
  res.render("index", { images });
});

router.get("/upload", (req, res) => {
  res.render("upload");
});

router.post("/upload", async (req, res) => {
  const image = new Image();
  image.title = req.body.title;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = `/img/uploads/${req.file.filename}`;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;

  await image.save();

  console.log(image);

  res.redirect("/");
});

router.get("/image/:id", async (req, res) => {
  const image = await Image.findById(req.params.id);
  res.render("profile", { image });
});

router.get("/image/delete/:id", async (req, res) => {
  const { id } = req.params;
  const imageDelete = await Image.findByIdAndDelete(id);
  try {
    await unlink(path.resolve(`./src/public/${imageDelete.path}`));
  } catch (e) {
    console.log(e);
  }
  res.redirect("/");
});

module.exports = router;
