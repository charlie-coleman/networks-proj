const https = require('https');
const http = require('http');
const fs = require('fs');
const conn = require('./db').conn;
const { Op } = conn.Sequelize;
const socket = require('socket.io');
const { User, Conversation, Message } = require('./db').models;
conn.sync({ logging: false, force: true });
const mobileSockets = {};

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/charlie-coleman.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/charlie-coleman.com/fullchain.pem")
};

const server = https.createServer(options).listen(8080);
// const server = http.createServer().listen(8080);
const io = socket(server);

const unRegex = /^[a-zA-Z0-9\-._:\(\)\!\?]*$/;

io.on('connection', socket => {
  socket.on('newUser', credentials => {
    const { name, password } = credentials;
    if (name.match(unRegex) === null) {
      socket.emit('authfailed', 'Improper username. Illegal characters.');
    }
    else if (name.length < 1) {
      socket.emit('authfailed', 'Improper username. You need a username.');
    }
    else if (name.length > 18) {
      socket.emit('authfailed', 'Improper username. Username too long.');
    }
    else {
      User.findAll({
        where: {
          name
        }
      }).then((users) => {
        if(users.length === 0) {
          User.createSecureUser(name, password).then(user => {
            mobileSockets[user.id] = socket.id;
            socket.emit('authsuccess', user);
            socket.broadcast.emit('newUser', user);
          });
        }
        else {
          socket.emit('authfailed', 'Username is in use.');
        }
      });
    }
  });

  socket.on('login', credentials => {
    const { name, password } = credentials;
    User.login(name, password).then((user) => {
      if(!user) {
        socket.emit('authfailed', 'Incorrect username or password');
      }
      else {
        mobileSockets[user.id] = socket.id;
        socket.emit('authsuccess', user);
      }
    });
  });

  socket.on('getUsers', () => {
    User.findAll().then((users) => {
      if (!users) { users = []; }
      socket.emit('users', users);
    })
  })

  socket.on('getConversations', userId => {
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
    Conversation.getConversation(id)
      .then(conversation => {
        socket.emit('conversation', conversation);
        socket.emit('priorMessages', conversation.messages);
      });
  });

  socket.on('createchat', info => {
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
