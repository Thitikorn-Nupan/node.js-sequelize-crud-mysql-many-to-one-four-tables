const connect = require('../../connect/database-connect').connect
const sequelize = require('../../connect/database-connect').sequelize
class Programmer {
    get programmer() {
        return connect.define("header_programmers",
            {
                p_id: {
                    type: sequelize.INTEGER ,
                    primaryKey: true ,
                    autoIncrement: true
                } ,
                fullname: {
                    type: sequelize.STRING
                } ,
                salary: {
                    type: sequelize.DECIMAL
                }
                ,
                level: {
                    type: sequelize.STRING
                }
            } ,
            {
                freezeTableName: true , // freeze name table not using *s on name
                timestamps: false  // don't use createdAt/update
            }
        );
    }
}

module.exports = new Programmer().programmer