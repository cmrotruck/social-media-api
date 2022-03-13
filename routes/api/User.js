const router = require("express").Router();
const { getAllUsers, addUser } = require("../../controllers/user-controller");

// /api/users

router
  .route("/")
  //get all users
  .get(getAllUsers)
  //post a new user
  .post(addUser);

router.use(":id", (req, res) => {
  //get a single user by its _id and populated thought and friend data
  //put to update a user by its _id
  //deleted to remove user by its _id
  //BONUS: Remove a users's associated thoughts when deleted.
});

module.exports = router;
