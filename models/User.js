const { Schema, model } = require("mongoose");
const { Thought } = require("./Thought");
const regexEmail = `/^\w[A-Za-z0-9._-]+@\w[A-Za-z0-9]+[.]+\w[A-Za-z0-9]+/`;

const User = new Schema({
  //username
  username: {
    //string
    type: String,
    //unique
    unique: true,
    //required
    required: "A username is required",
    //trimmed
    trim: true,
  },
  //email
  email: {
    //string
    type: String,
    //required
    required: true,
    //unique
    unique: true,
    //must match a valid email address (look into Mongoose's matching validation)
    match: [regexEmail, "Please fill a valid email address"],
  },
  //thoughts
  thoughts: [
    {
      //array of _id values referencing the Thought model
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  //friends
  friends: [
    {
      //array of _id values referencing the User model(self-reference)
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
