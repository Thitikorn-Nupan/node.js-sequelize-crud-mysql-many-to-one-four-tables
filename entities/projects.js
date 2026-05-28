const connect = require('../connect/database-connect').connect
const sequelize = require('../connect/database-connect').sequelize
class Projects {
    get projects() {
        return connect.define("projects",
            {
                project_name: {
                    type: sequelize.STRING ,
                    primaryKey: true
                } ,
                project_cost: {
                    type: sequelize.DOUBLE
                } ,
                project_build: {
                    type: sequelize.DATE
                }
                ,
                project_status: {
                    type: sequelize.BOOLEAN
                }
                ,
                p_id : {
                    type : sequelize.INTEGER ,
                    references: { // setting details foreign key field
                        model: 'header_programmers', // map this field to table
                        key: 'p_id' // reference of this field
                    }
                }
                ,
                s_id : {
                    type : sequelize.INTEGER ,
                    references: { // setting details foreign key field
                        model: 'header_sales', // map this field to table
                        key: 's_id' // reference of this field
                    }
                }
                ,
                m_id : {
                    type :sequelize.INTEGER ,
                    references: { // setting details foreign key field
                        model: 'header_marketings', // map this field to table
                        key: 'm_id' // reference of this field
                    }
                }
            } ,
            {
                freezeTableName: true , // freeze name table not using *s on name
                timestamps: false  // don't use createdAt/update
            }
        );
    }
}

module.exports = new Projects().projects