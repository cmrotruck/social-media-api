const router = require("express").Router();
const {
  getAllThoughts,
  addThought,
  getAThought,
} = require("../../controllers/thought-controller");

// /api/thoughts

//get all thoughts
router.route("/").get(getAllThoughts);

//get a single thought by its _id
router.route("/:id").get(getAThought);

//post to create a new thought(don't forget to push the created thought's _id to the associated user's thoughts array field)
router.route("/:userId").post(addThought);
//put to update a thought by its _id

//delete to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions
//post to create a reaction stored in a single thought's reactions array field

//delete to pull and remove a reaction by the reaction's reactionId value

module.exports = router;
