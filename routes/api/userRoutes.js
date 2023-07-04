const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const { User, Thought } = require("../../models");

// all users show up but not their recpetive thoughts or friends
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// single user by id shows up but not it's respective thoughts or friends
router.get("/:_id", async (req, res) => {
  try {
    // if the given id is not a valid id return 500 with error message
    if (!isValidObjectId(req.params._id)) {
      res.status(500).json({ messsage: "the given id is not a valid user id" });
      return;
    }

    // find user with given id
    const userById = await User.findOne({ _id: req.params._id });

    // if there is no user at the given id return 500 with error message
    if (!userById)
      res.status(500).json({ message: "no user found at this id" });
    else res.status(200).json(userById);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    // deconstruct the body
    const { username, email } = req.body;

    // check if there is a username and email
    if (!username || !email) {
      res.status(500).json({ message: "no username or email provided" });
      return;
    }

    // check if the username or email has already been used
    const checkUsername = await User.findOne({ username });
    const checkEmail = await User.findOne({ email });
    if (checkUsername || checkEmail) {
      res
        .status(500)
        .json({ message: "the provided username or email already exists" });
      return;
    }

    // create new user
    const newUser = await User.create({ username, email });
    res.json(200).json(newUser);
  } catch (error) {
    if (!res.headersSent) res.status(500).json(error);
    console.log(error);
  }
});

router.put("/:_id", async (req, res) => {
  try {
    // if the given id is not a valid id return 500 with error message
    if (!isValidObjectId(req.params._id)) {
      res.status(500).json({ messsage: "the given id is not a valid user id" });
      return;
    }

    // find user with given id
    const userById = await User.findOne({ _id: req.params._id });

    // if there is no user at the given id return 500 with error message
    if (!userById) {
      res.status(500).json({ message: "no user found at this id" });
    }

    // deconstruct json
    const { username, email } = req.body;

    let checkUsername;
    let checkEmail;
    // check if the username or email has already been used
    if (username) {
      checkUsername = await User.findOne({ username });
    }
    if (email) {
      checkEmail = await User.findOne({ email });
    }

    if (checkUsername || checkEmail) {
      res
        .status(500)
        .json({ message: "the provided username or email already exists" });
      console.log(checkUsername);
      console.log(checkEmail);

      return;
    }

    // empty onject to hold possible updates
    const updates = {};
    if (username) {
      updates.username = username;
    }
    if (email) {
      updates.email = email;
    }

    // make the update to the user
    const updated = await User.updateOne({ _id: req.params._id }, updates, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    if (!res.headersSent) res.status(500).json(error);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    // if the given id is not a valid id return 500 with error message
    if (!isValidObjectId(req.params._id)) {
      res.status(500).json({ messsage: "the given id is not a valid user id" });
      return;
    }

    // find user with given id
    const userById = await User.findOne({ _id: req.params._id });

    // if there is no user at the given id return 500 with error message
    if (!userById) {
      res.status(500).json({ message: "no user found at this id" });
    }

    // delete user
    await User.findByIdAndDelete({ _id: req.params._id });
    res.status(200).json({ message: "User succesfully deleted" });
  } catch (error) {
    if (!res.headersSent) res.status(500).json(error);
  }
});

module.exports = router;
