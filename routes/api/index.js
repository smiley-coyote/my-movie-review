const router = require("express").Router();
const userRoutes = require("./user");
const ratingRoutes = require("./rating");
const criticRoutes = require("./critic")

// User routes
router.use("/user", userRoutes);

// Rating routes
router.use("/rating", ratingRoutes);

// Critic routes
router.use("/critic", criticRoutes);

module.exports = router;
