const connect = require('../../connect/database-connect').connect
const sequelize = require('../../connect/database-connect').sequelize
class Sale {
    get sale() {
        return connect.define("header_sales",
            {
                s_id: {
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

module.exports = new Sale().sale