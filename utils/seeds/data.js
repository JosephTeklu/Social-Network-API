const reaction = [
  {
    reactionBody: "wow",
    username: "BizTheHabesha",
  },
  {
    reactionBody: "ewww",
    username: "Kalmonk3y",
  },
  {
    reactionBody: "idk",
    username: "simye",
  },
  {
    reactionBody: "again",
    username: "biruk_obama",
  },
];

const thought = [
  {
    thoughtText: "i think im gonna get a visectomy",
    username: "simye",
    reactions: [reaction[0], reaction[3]],
  },
  {
    thoughtText: "you like my car?",
    username: "kalmonk3y",
    reactions: [reaction[2], reaction[0]],
  },
  {
    thoughtText: "what book should i read next?",
    username: "BizTheHabesha",
    reactions: [reaction[3], reaction[2]],
  },
  {
    thoughtText: "listen to my new song",
    username: "biruk_obama",
    reactions: [reaction[1], reaction[0]],
  },
];

const user = [
  {
    username: "BizTheHabesha",
    email: "biz@gmail.com",
    // thoughts: [thought[2]],
    // friends: ["Kalmonk3y", "biruk_obama", "simye"],
  },
  {
    user: "Kalmonk3y",
    email: "kalmonk3y@gmail.com",
    // thoughts: [thought[1]],
    // friends: ["biruk_obama", "simye", "BizTheHabesha"],
  },
  {
    username: "biruk_obama",
    email: "biruk@gmail.com",
    // thoughts: [thought[3]],
    // friends: ["Kalmonk3y", "simye", "BizTheHabesha"],
  },
  {
    username: "simye",
    email: "simye@gmail.com",
    // thoughts: [thought[0]],
    // friends: ["Kalmonk3y", "biruk_obama", "BizTheHabesha"],
  },
];

module.exports = { user, thought };
