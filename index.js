console.log("hey");
console.log(process.env.test);

const express = require("express");
const app = express();
const productRouter = require("./products.js");

app
  .use(express.json())
  .use((req, res, next) => {
    console.log(req.query);
    if (req.query.token) {
      console.log("has token");
      return;
    }
    next();
  })
  .use("/products", productRouter)
  .get("/", (req, res) => {
    console.log("Hi!");
    res.send("good");
  })
  .listen(3000, () => console.log("Server is runnig on 3000"));
