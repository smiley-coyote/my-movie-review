module.exports = function (passport) {
	const path = require("path");
	const router = require('express').Router();
	const userRoutes = require("./api/user");
	const ratingRoutes = require("./api/rating");
	const criticRoutes = require("./api/critic")

	// User routes
	router.use("/user", userRoutes);

	// Rating routes
	router.use("/rating", ratingRoutes);

	// Critic routes
	router.use("/critic", criticRoutes);

	return router;
};