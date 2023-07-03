const { Schema, model } = require("mongoose");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new Schema.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: "Reaction message is required",
    maxlength: 280,
  },
  username: {
    type: String,
    required: "Username is required",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const thoughSchema = new Schema({
  thoughText: {
    type: String,
    required: "Thought is required",
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    get: (value) => value.toDateString(),
  },
  username: {
    type: String,
    required: "Username is required",
  },
  reactions: [reactionSchema],
});

thoughSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// initialize the thought model
const Thought = model("thought", thoughSchema);

module.exports = Thought;
