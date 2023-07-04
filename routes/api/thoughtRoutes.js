const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const { User, Thought } = require("../../models");

// delete to remove thought by _id

// /:thoughtId/reactions
// post create reaction in single thought's reaction array
// delete reaction by reactionId
// all users show up but not their recpetive thoughts or friends

router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:_id", async (req, res) => {
  try {
    // if the given id is not a valid id return 500 with error message
    if (!isValidObjectId(req.params._id)) {
      res
        .status(500)
        .json({ messsage: "the given id is not a valid thought id" });
      return;
    }

    // find user with given id
    const thoughtById = await Thought.findOne({ _id: req.params._id });

    // if there is no thought at the given id return 500 with error message
    if (!thoughtById)
      res.status(500).json({ message: "no thought found at this id" });
    else res.status(200).json(thoughtById);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    // deconstruct the body
    const { thoughtText, username } = req.body;

    // check if there is a username given from the body
    if (!username || !thoughtText) {
      res.status(500).json({ message: "no username or thought text provided" });
      return;
    }

    // find the user to add the thought to
    const user = await User.findOne({ username });

    // if the user does not exist throw error
    if (!user) {
      res.status(400).json({ message: "The given username does not exist" });
      return;
    }

    // create new thought
    const newThought = await Thought.create({ thoughtText, username });

    // add the thought to the user's thoughts array
    user.thoughts.push(newThought._id);

    await user.save();

    res.json(200).json(newThought);
  } catch (error) {
    if (!res.headersSent) res.status(500).json(error);
    console.log(error);
  }
});

router.put("/:_id", async (req, res) => {
  try {
    // if the given id is not a valid id return 500 with error message
    if (!isValidObjectId(req.params._id)) {
      res
        .status(500)
        .json({ messsage: "the given id is not a valid thought id" });
      return;
    }

    // find thought with given id
    const thoughtById = await Thought.findOne({ _id: req.params._id });

    // if there is no thought at the given id return 500 with error message
    if (!thoughtById) {
      res.status(500).json({ message: "no thought found at this id" });
    }

    // deconstruct json
    const { thoughtText } = req.body;
    // if a new htought is not given throw error
    if (!thoughtText) {
      res.status(400).json({ message: "new thought is required to update" });
      return;
    }

    // update the thought
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params._id,
      {
        thoughtText,
      },
      { new: true }
    );

    res.status(200).json(updatedThought);
  } catch (error) {
    if (!res.headersSent) res.status(500).json(error);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    // if the given id is not a valid id return 500 with error message
    if (!isValidObjectId(req.params._id)) {
      res
        .status(500)
        .json({ messsage: "the given id is not a valid thought id" });
      return;
    }

    // find user with given id
    const thoughtById = await Thought.findOne({ _id: req.params._id });

    // if there is no thought at the given id return 500 with error message
    if (!thoughtById) {
      res.status(500).json({ message: "no user found at this id" });
    }

    // delete the thought
    await Thought.findByIdAndDelete({ _id: req.params._id });
    res.status(200).json({ message: "Thought succesfully deleted" });
  } catch (error) {
    if (!res.headersSent) res.status(500).json(error);
  }
});

module.exports = router;
