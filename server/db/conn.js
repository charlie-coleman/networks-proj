const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://postgres:facesarestrange1234@localhost/chat_app_db');

module.exports = conn;
