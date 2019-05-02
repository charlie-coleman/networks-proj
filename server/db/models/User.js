const conn = require('../conn');
const { Sequelize } = conn;

const User = conn.define('user', {
  name : Sequelize.STRING,
  password : Sequelize.STRING
});

User.prototype.toJSON = function() {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
}

module.exports = User;
