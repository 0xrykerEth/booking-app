const Sequelize = require('sequelize');

const sequelize = require('../utils/database')

const Form =  sequelize.define('Form',{
    username : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    phone : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    email : {
        type : Sequelize.STRING,
        allowNull : false,
    }
})


module.exports = Form;