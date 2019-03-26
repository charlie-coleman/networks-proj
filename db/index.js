const conn = require('./conn');
const Conversation = require('./models/Conversation.js');
const Message = require('./models/Message.js');
const User = require('./models/User.js');

User.hasMany(Conversation);
Conversation.belongsTo(User, { as: 'user1' });
Conversation.belongsTo(User, { as: 'user2' });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  conn,
  models: {
    Conversation,
    User,
    Message
  }
};
