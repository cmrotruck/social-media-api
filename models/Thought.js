const { Schema, model } = require("mongoose");
const usernameRegex = `^\w{1,280}`;

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
      match: [usernameRegex, "username must be between 1 and 280 charachters"],
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
    reations: [
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
  return reactions.length + 1;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
