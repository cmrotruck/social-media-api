const router = require("express").Router();
const {
  getAllUsers,
  addUser,
  deleteUser,
  getUserById,
  updateUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-controller");

// /api/users

router
  .route("/")
  //get all users
  .get(getAllUsers)
  //post a new user
  .post(addUser);

router
  .route("/:id")
  //get a single user by its _id and populated thought and friend data
  .get(getUserById)
  //put to update a user by its _id
  .put(updateUser)
  //deleted to remove user by its _id
  .delete(deleteUser);
//BONUS: Remove a users's associated thoughts when deleted.

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
