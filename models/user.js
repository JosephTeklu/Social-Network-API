// username
//     String
//     Unique
//     Required
//     Trimmed

// email
//     String
//     Required
//     Unique
//     Must match a valid email address (look into Mongoose's matching validation)

// thoughts
//     Array of _id values referencing the Thought model

// friends
//     Array of _id values referencing the User model (self-reference)

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: "Username is required",
    trimmed: true,
  },
  email: {
    type: String,
    required: "Email is required",
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// return the length of the user's friend's array
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// initialize the user model
const User = model("user", userSchema);

module.exports = User;
