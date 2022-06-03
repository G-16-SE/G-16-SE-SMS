const { Router } = require("express");
const router = Router();

const GoodController = require("../controllers/good");

const checkAuth = require("../middlewares/authentication/user-auth");

router.get("/allgoods", GoodController.getgoods);

router.get("/alltypes", GoodController.getGoodTypes);

module.exports.goodRouter = router;