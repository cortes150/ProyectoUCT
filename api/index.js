require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();
const routes = require("./routes/index.routes");
const {
  logErrors,
  errorHandLer,
  boomErrorHandLer,
} = require("./middleware/errorHandling.js");
const port = process.env.PORT || 1000;
app.use(express.json());

// app.get("/callback", (req, res) => {
//   console.log("hhhhhh");
//   res.redirect("http://localhost:3000/productos");
// });
app.use(cors());
app.use(routes);
app.use(logErrors);
app.use(boomErrorHandLer);
app.use(errorHandLer);
app.listen(port, () => {
  console.log("Mi puerto:" + port);
});
