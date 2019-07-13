//Connect to the database using Sequelize
const Sequelize = require('sequelize');

const db = new Sequelize('postgresql://coder:pg123@localhost:5432/users', {
    define: {
        // The `timestamps` field specify whether or not the `createdAt` and `updatedAt` fields will be created.
        // This was true by default, but now is false by default
        timestamps: false
      }
});

module.exports = db;