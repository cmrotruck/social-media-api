const { Schema, model, Types } = require("mongoose");
const usernameRegex = `/^{1,280}/`;
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    //reactionId
    reactionId: {
      //use mongoose's objectID data type
      type: Schema.Types.ObjectId,
      //default vale is set to a new objectId
      default: () => new Types.ObjectId(),
    },

    //reactionBody
    reactionBody: {
      //string
      type: String,
      //required
      required: true,
      //280 character max
      max: 280,
    },

    //username
    username: {
      //string
      type: String,
      //required
      required: "A username must be included with a reaction.",
    },

    //createdAt
    createdAt: {
      //date
      type: Date,
      //set default value to the current timestamp
      default: Date.now,
      //Use a getter method to format the timestamp on query
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const ThoughtSchema = new Schema(
  {
    //thoughtText
    thoughtText: {
      //string
      type: String,
      //required
      required: "You need to provide a thought",
      trim: true,
      //must be between 1 and 280 characters
      validate: [
        ({ length }) => {
          length >= 1 && length <= 280;
        },
        "username must be between 1 and 280 charachters",
      ],
      // match: [usernameRegex, "username must be between 1 and 280 charachters"],
    },

    //CreatedAt
    createdAt: {
      //date
      type: Date,
      //set default value to the current timestamp
      default: Date.now,
      //Use a getter method to format the timestamp on query
      get: (createdAtVal) => dateFormat(createdAtVal),
    },

    //username
    username: {
      //string
      type: String,
      //required
      required: "A username but be provided on thoughts;",
    },

    //reaction(these are like replies)
    reactions: [
      //array of nested documents created with the reactionSchema
      ReactionSchema,
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

//schema settings
//create a virtual called reactionCount that retrieves the number of reactions on a thought.
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
