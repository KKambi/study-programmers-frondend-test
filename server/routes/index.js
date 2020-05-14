var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/image/:id", (req, res, next) => {
  const { id } = req.params;

  //파일 존재 여부 체크
  try {
    const filePath = path.resolve(__dirname, `../public/images/(${id}).jpg`);
    fs.statSync(filePath);
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(404).json({ error: "파일 존재하지 않음" });
      return;
    }
  }

  const response = {
    name: `image-${id}`,
    url: `http://localhost:3000/images/(${id})`,
  };

  res.status(200).json(response);
});

module.exports = router;
