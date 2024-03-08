console.log("hey");
console.log(process.env.test);

const express = require("express");
const router = require("./routers");
const app = express();

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
  .get("/", (req, res) => {
    console.log("Hi!");
    res.sendStatus(200); //health check
  })
  .use(router)
  .listen(3000, () => console.log("Server is runnig on 3000"));
