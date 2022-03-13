const router = require("express").Router();
const thoughtRoutes = require("./Thought");
const userRoutes = require("./User");

router.use("/thoughts", thoughtRoutes);
router.use("/users", userRoutes);

module.exports = router;
