const { db } = require("../models/Thought");
const Thought = require("../models/Thought");
const User = require("../models/User");

const thoughtController = {
  //functions go in here
  //get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .sort({ _id: -1 })
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //get a single thought by its _id
  getAThought({ params, body }, res) {
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        //if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  //post to create a new thought (dont forget to push the created
  //thoughts _id to the associated user's thoughts array field)
  addThought({ params, body }, res) {
    console.log("request to add thought made.");
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  updateThought({ params, body }, res) {
    console.log("request to update thought made.");
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        //if no thought is found, send 404
        console.log(dbThoughtData);
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteThought({ params }, res) {
    //delete thought
    Thought.findByIdAndDelete(params.id, { new: true })
      .then(({ dbThoughtData }) => {
        console.log("dbthoughtData:", dbThoughtData);
        // return dbThoughtData;
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.id } },
          { new: true, runValidators: true }
        );
      })
      .then((dbThoughtData) => {
        console.log(dbThoughtData);
        if (!dbThoughtData) {
          res.status(404).json({
            message: "No thought found with this id!",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  addReaction({ params, body }, res) {
    //add a reaction
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        //if no data, send 404 status
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteReaction({ params }, res) {
    //delete reaction
    console.log(params.thoughtId, params.reactionId);
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        console.log(dbThoughtData);
        if (!dbThoughtData) {
          res.status(404).json({
            message: "No thought and/or reaction found with this id!",
          });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
