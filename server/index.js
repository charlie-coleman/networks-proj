const server = require('http').createServer().listen(3000);
const conn = require('./db').conn;
const { Op } = conn.Sequelize;
const io = require('socket.io')(server);
const { User, Conversation, Message } = require('./db').models;
conn.sync({ logging: false, force: false });
const mobileSockets = {};

io.on('connection', socket => {
  socket.on('newUser', credentials => {
    console.log('newUser');
    const { name, password } = credentials;
    User.findAll({
      where: {
        name
      }
    }).then((users) => {
      if(users.length === 0) {
        User.create({
          name,
          password
        }).then(user => {
          mobileSockets[user.id] = socket.id;
          socket.emit('authsuccess', { user: user });
          socket.broadcast.emit('newUser', { user: user});
        });
      }
      else {
        socket.emit('authfailed', { message: 'Username is in use.' });
      }
    });
  });

  socket.on('login', credentials => {
    console.log('login');
    const { name, password } = credentials;
    User.findOne({
      where: {
        name,
        password
      }
    }).then((user) => {
      if(!user) {
        socket.emit('authFailed', { message: 'Incorrect username or password' });
      }
      else {
        mobileSockets[user.id] = socket.id;
        socket.emit('authsuccess', { user: user });
      }
    });
  });

  socket.on('getUsers', () => {
    console.log('getUsers');
    User.findAll().then((users) => {
      if (!users) { users = []; }
      socket.emit('users', users);
    })
  })

  socket.on('getConversations', userId => {
    console.log('getConversations');
    User.findOne({
      where: {
        id: userId
      },
      include: [ conn.models.conversation ],
      order: [[ conn.models.conversation, 'createdAt', 'DESC' ]]
    }).catch((e) => console.log(e, "getConversations failed"))
    .then(user => {
      user.conversations.map(c => {
        Conversation.findOne({
          where: { id: c.GroupChat.conversationId },
          include: [ conn.models.user ]
        })
          .then(convo => {
            socket.emit('newConversation', convo);
          })
      });
    });
  })

  socket.on('openchat', id => {
    console.log('openchat');
    Conversation.getConversation(id)
      .then(conversation => {
        socket.emit('conversation', conversation);
        socket.emit('priorMessages', conversation.messages);
      });
  });

  socket.on('createchat', info => {
    console.log('createchat');
    const { name, userIds } = info;
    Conversation.createConversation(name, userIds)
      .then(conversation => {
        Conversation.findOne({
          where: {
            id: conversation[0][0].dataValues.conversationId
          },
          include: [conn.models.message, conn.models.user],
          order: [[conn.models.message, 'createdAt', 'DESC']]
        }).then(c => {
          socket.emit('conversation', c);
          socket.emit('newConversation', c);
          socket.emit('priorMessages', c.messages);
          c.users.map(u => socket.to(mobileSockets[u.id]).emit('newConversation', c));
        })
      });
  })

  socket.on('message', ({ text, sender, convoId }) => {
    console.log('message');
    Message.createMessage(text, sender, convoId)
      .then(message => {
        socket.emit('incomingMessage', message);
        Conversation.findOne({
          where: { id: convoId },
          include: [ conn.models.user ]
        })
          .then((conversation) => {
            conversation.users.filter(u => (u.id !== sender.id))
                .map(u => socket.to(mobileSockets[u.id])
                .emit('incomingMessage', message));
          });
      });
  });

});
