const router = require("express").Router();
const { User, Thought } = require("../models");

// get all users
// get single user by _id with thought and friend data
// post new user
// put an update to user by _id
// delete user by it's _id BONUS: delete it's associated thoughts when delted

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
