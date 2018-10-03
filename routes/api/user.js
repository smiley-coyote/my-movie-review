const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/results/")
.put(usersController.postSurvey);

router.route("/user/:id").get(usersController.findUser);


module.exports = router;
