const { Router } = require("express");

const productRouter = Router().get("/:id", (req, res) => {
  res.sendStatus(200);
  console.log(req.params.id);
});

module.exports = productRouter;
