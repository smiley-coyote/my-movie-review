const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/").post(usersController.postRating);

router.route("/writeup").put(usersController.postReview);

router.route("/").get(usersController.getRatings);

router.route("/:id").get(usersController.findRating);

module.exports = router;
