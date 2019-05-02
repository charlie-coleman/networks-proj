const conn = require('../conn');
const { Sequelize } = conn;
const { Op } = Sequelize;

const Conversation = conn.define('conversation', {
  name: Sequelize.STRING
});

Conversation.getConversation = function(id) {
  return Conversation.findOne({
    where: {
      id: id
    },
    include: [ conn.models.message, conn.models.user ],
    order: [[ conn.models.message, 'createdAt', 'DESC' ]]
  })
    .then(conversation => conversation);
};

Conversation.createConversation = function(name, userIds) {
  return Conversation.create({
    name
  }).then(conversation => {
    return conversation.setUsers(userIds).then(c => c);
  });
}

module.exports = Conversation;
