const { User, Thought } = require("../models");
// const User = require("../models/User");

const userController = {
  //find all users
  getAllUsers(req, res) {
    User.find({})
      // .populate({
      //   path: "Thought",
      //   select: "-__v",
      // })
      // .select(".__v")
      .sort({ _id: -1 })
      .then((dbUserData) => {
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //add a user
  addUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
