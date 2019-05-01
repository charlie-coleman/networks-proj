const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://networks:password@localhost/chat_app_db');

module.exports = conn;
