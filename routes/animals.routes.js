const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");
router.get("/animals", (req, res) => {
  const animals = [];
  const { size } = req.query;
  const limit = size || 20;
  for (let index = 0; index < limit; index++) {
    animals.push({
      bear: faker.animal.bear(),
      dog: faker.animal.dog(),
      cat: faker.animal.cat(),
    });
  }
  res.status(200).json(animals);
});
module.exports = router;
