const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'rajatraj', {
    dialect: 'mysql',
    host: 'localhost',
});

module.exports = sequelize;
