const Sequelize = require('sequelize');
const credentials = require('./.credentials.json');

const credString = credentials.username+':'+credentials.password;
const conn = new Sequelize('postgres://' + credString + '@localhost/chat_app_db');

module.exports = conn;
