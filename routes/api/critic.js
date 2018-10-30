const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/").post(usersController.addCritic);

router.route("/:id").delete(usersController.deleteCritic)

// router.route("/").get(usersController.getCritics);

// router.route("/:id").get(usersController.findCritic);

module.exports = router;
