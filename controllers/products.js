const getProduct = (req, res) => {
  res.sendStatus(200);
  console.log(req.params.id);
};

const postProduct = (req, res) => {
  console.log(req.body.id);
  console.log(req.body.desc);
  res.sendStatus(201);
};
module.exports = { getProduct, postProduct };
