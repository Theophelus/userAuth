const Sequelize = require('sequelize');
const db = require('../sql/database');

//Define a database Model using Sequelize
const Users = db.define('users', {
    'id': {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    'first_name': {
        type: Sequelize.STRING,
        allowNull: false,
        max: 255,
    },
    'last_name': {
        type: Sequelize.STRING,
        allowNull: false,
        max: 255,
    },
    'email': {
        type: Sequelize.STRING,
        allowNull: false,
        max: 255,
        min: 6,
    },
    'password': {
        type: Sequelize.STRING,
        allowNull: false,
        max: 255,
        min: 8
    }
});
module.exports = Users;