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
        //if no pizza is found, send 404
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
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
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
};

module.exports = thoughtController;
