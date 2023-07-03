const connection = require("../../config/connection");
const { User, Thought } = require("../../models");
const { user, thought } = require("./data.js");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
    console.log("collection 'users' dropped");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thought" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thought");
    console.log("collection 'thought' dropped");
  }

  // Add the users and thoughts to the collection and await the results
  await User.collection.insertMany(user);
  await Thought.collection.insertMany(thought);

  // Log out the seed data to indicate what should appear in the database
  console.table(user);
  console.table(thought);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
