const app = require("./app");
require("dotenv").config();

const connectwithDb = require("./config/db");

connectwithDb();

app.listen(process.env.PORT, () => {
  console.log(`server is runing at PORT: ${process.env.PORT}`);
});
