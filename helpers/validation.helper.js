const { check, query, body } = require("express-validator/check");

const validateSample= [
  query("").not().isEmpty().withMessage("Should not be empty"),
  body("").isIn([]).withMessage("Invalid"),
  body("").not().isEmpty().withMessage("Should not be empty"),
];

module.exports = { validateSample};
