const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/results/")
.put(usersController.postSurvey);

router.route("/")
.put(usersController.uploadImage);

router.route("/:id").get(usersController.findUser);

router.route("/all")
.post(usersController.findAll);

router.route("/topfive")
.put(usersController.addTopFive);

module.exports = router;
