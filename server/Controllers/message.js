const Message = require("../Models/message");

module.exports.createMessage = async (req, res, next) => {
  try {
    const { sender, reciever, content } = req.body;
    const message = await Message.create({
      sender,
      reciever,
      content,
      date: Date.now(),
    });
    return res.json({ status: true });
  } catch (error) {
    next(error);
  }6
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const { user1, user2 } = req.body;
    const messages = await Message.find({
      $or: [
        { sender: user1, reciever: user2 },
        { sender: user2, reciever: user1 },
      ],
    });
    if(messages){
        return res.json(messages);
    }
    else{
        const nodata = []
        return res.json(nodata);
    }
  } catch (error) {
    next(error);
  }
};
