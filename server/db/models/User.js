const bcrypt = require('bcrypt');
const conn = require('../conn');
const { Sequelize } = conn;
const saltRounds = 10;

const User = conn.define('user', {
  name : Sequelize.STRING,
  password : Sequelize.STRING
});

User.createSecureUser = function(name, password) {
  return bcrypt.hash(password, saltRounds).then(function(hash) {
    return User.create({
      name,
      password: hash
    });
  });
}

User.login = function(name, password) {
  return User.findOne({
    where: {
      name
    }
  }).then((user) => {
    if (!user)
      return null;
    else {
      return bcrypt.compare(password, user.password).then(function(res) {
        if (res)
          return user;
        else
          return null;
      });
    }
  });
}

User.prototype.toJSON = function() {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
}

module.exports = User;
