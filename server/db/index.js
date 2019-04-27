const conn = require('./conn');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const User = require('./models/User');

Conversation.belongsTo(User, { as: 'user1' });
Conversation.belongsTo(User, { as: 'user2' });
User.hasMany(Conversation);
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