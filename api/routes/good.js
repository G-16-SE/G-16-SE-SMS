const { Router } = require("express");
const router = Router();

const GoodController = require("../controllers/good");

const checkAuth = require("../middlewares/authentication/user-auth");

router.get("/allgoods", checkAuth, GoodController.getgoods);

router.get("/alltypes", checkAuth, GoodController.getGoodTypes);

module.exports.goodRouter = router;

