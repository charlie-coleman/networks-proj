const conn = require('./conn');
const Conversation = require('./models/Conversation');
const Message = require('./models/Message');
const User = require('./models/User');

User.belongsToMany(Conversation, { through: 'GroupChat' });
Conversation.belongsToMany(User, { through: 'GroupChat' });
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
