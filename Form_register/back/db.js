const {sequelize, Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME ,// название бд
    process.env.DB_USER ,// имя пользователя
    process.env.DB_PASSWORD ,// пароль от бд
    {
        dialect:'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)