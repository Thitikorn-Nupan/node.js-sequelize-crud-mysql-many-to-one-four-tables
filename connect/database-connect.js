// const log = require('../log/Logging').logger
const path = require('../service/rest-api-service').path
const dotenv = require('dotenv')
dotenv.config({path: path.resolve('../env/.env'),debug : true})

class DatabaseConnect {
    get sequelize() {
        return require("sequelize")
    }
    get connect() {
        return new this.sequelize(
            process.env.MYSQLL_DATABASE,
            process.env.MYSQLL_USERNAME,
            process.env.MYSQLL_PASSWORD,
            {
                dialect: "mysql",
                host: process.env.MYSQLL_HOST,
                port: process.env.MYSQLL_PORT
            }
        )
    }
}
/*new DatabaseConnect().connect.authenticate().then(() => {
    log.info('message : connected successfully!!')
}).catch((error) => {
    log.warn('message : failed connect!!')
    throw error
})*/
module.exports = new DatabaseConnect()