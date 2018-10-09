const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/results/")
.put(usersController.postSurvey);

router.route("/:id").get(usersController.findUser);

router.route("/")
.get(usersController.findAll);

module.exports = router;
