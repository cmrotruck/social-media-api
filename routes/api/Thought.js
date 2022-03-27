const router = require("express").Router();
const {
  getAllThoughts,
  addThought,
  addReaction,
  getAThought,
  deleteReaction,
  deleteThought,
  updateThought,
} = require("../../controllers/thought-controller");

// /api/thoughts

//get all thoughts
router.route("/").get(getAllThoughts);

//get a single thought by its _id
router.route("/:id").get(getAThought);

//post to create a new thought(don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route("/").post(addThought);
//put to update a thought by its _id
router.route("/:id").put(updateThought);
//delete to remove a thought by its _id
router.route("/:id/user/:userId").delete(deleteThought);

// /api/thoughts/:thoughtId/reactions

//delete to pull and remove a reaction by the reaction's reactionId value
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

//post to create a reaction stored in a single thought's reactions array field
router.route("/:thoughtId/reactions").post(addReaction);

module.exports = router;
