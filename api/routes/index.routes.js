const express = require("express");
const air = require("./products.routes");
const ani = require("./animals.routes");
const router = express.Router();
router.use("/api/products", air);
router.use(ani);
module.exports = router;
// function routerApi(app){
// app.use("/api/v1",router);
//     const router = express.Router();
//     router.use(air)
//     router.use(ani)
// }
//module.exports = routerApi(app);
