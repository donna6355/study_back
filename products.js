const { Router } = require("express");

const productRouter = Router()
  .get("/:id", (req, res) => {
    res.sendStatus(200);
    console.log(req.params.id);
  })
  .post("/", (req, res) => {
    console.log(req.body.id);
    console.log(req.body.desc);
    res.sendStatus(201);
  });
module.exports = productRouter;
