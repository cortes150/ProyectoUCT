const express = require("express");
const ProductsService = require("../services/product.service");
const validatorHandler = require("../middleware/validator.Handler");
const {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
} = require("../schemas/product.schema");
const router = express.Router();
const service = new ProductsService();

router.get("/filter", (req, res) => {
  res.send("Este es un filtro");
});
// router.use((req, res, next) => {
//   if (!req.oidc.isAuthenticated()) {
//     return res.redirect("/login");
//   }
//   next();
// });
router.get("/", async (req, res) => {
  try {
    // res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
    const products = await service.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});
router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: "Updated All Fields",
    data: body,
    id,
  });
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const respuesta = await service.delete(id);
    res.json(respuesta);
  } catch (error) {
    // res.status(404).json({
    //   message: error.message,
    // });
    next(error);
  }
});

module.exports = router;
// const express = require("express");
// const router = express.Router();
// const { faker } = require("@faker-js/faker");
// router.get("/", (req, res) => {
//   const airlines = [];
//   const { size } = req.query;
//   const limit = size || 20;
//   for (let index = 0; index < limit; index++) {
//     airlines.push({
//       airport: faker.airline.airport(),
//       flightNumber: faker.airline.flightNumber(),
//     });
//   }
//   res.status(200).json(airlines);
// });
// router.post("/create", (req, res) => {
//   const body = req.body;
//   console.log(body);
//   res.json({
//     message: "created",
//     dato: body,
//   });
// });

// router.patch("/:id", (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   res.json({
//     message: "update all fields",
//     data: body,
//     id,
//   });
// });
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   res.json({
//     message: "update all fields",
//     data: body,
//     id,
//   });
// });
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   res.json({
//     message: "Deleted",
//     id,
//   });
// });
// module.exports = router;
