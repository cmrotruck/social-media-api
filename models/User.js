const { Schema, model } = require("mongoose");
const validate = require("mongoose-validator");
const { Thought } = require("./Thought");
// const regexEmail = `/^\w[A-Za-z0-9._-]+@\w[A-Za-z0-9]+[.]+\w[A-Za-z0-9]+/`;

function validateEmail(email) {
  var regexEmail = /^\w[A-Za-z0-9._-]+@\w[A-Za-z0-9]+[.]+\w[A-Za-z0-9]+/;
  return regexEmail.test(email);
}

const UserSchema = new Schema(
  {
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
      required: "Email address is required",
      //unique
      unique: true,
      //must match a valid email address (look into Mongoose's matching validation)
      validate: [validateEmail, "Please fill a valid email address"],
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
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const User = model("User", UserSchema);

module.exports = User;
