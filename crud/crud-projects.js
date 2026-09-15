const project = require('../entities/projects')
const programmer = require('../entities/programmer/programmer')
const sale = require('../entities/sale/sale')
const marketing = require('../entities/marketing/marketing')
// call the hasMany() method from the model that can have many rows of the other model.
// The code below will add the p_id (pk) attribute/field to the project field p_id (FK) model./
// But keep in mind that you can’t query the data of the programmer model from the project model like this
const path = require('../service/rest-api-service').path
const {createLogger} = require('../log/logging-v2')

const filename = path.basename(__filename);
const log = createLogger(filename);
/*
    const data = await project.findByPk(1, {
      include: programmer,
    });
    // because the programmer model is not associated with the project model in Sequelize
    // notice your table
    // programmer table didn't have foreign key

*/
programmer.hasMany(project,{ foreignKey: 'p_id' })
sale.hasMany(project,{ foreignKey: 's_id' })
marketing.hasMany(project,{ foreignKey: 'm_id' })
/*
    call belongTo
    so can use above

    const data = await project.findByPk(1, {
      include: programmer,
    });
*/
project.belongsTo(programmer,{ foreignKey: 'p_id' })
project.belongsTo(sale,{ foreignKey: 's_id' })
project.belongsTo(marketing,{ foreignKey: 'm_id' })


class CrudProjects {
    reads = async () => {
        try {
            return  await project.findAll({
                include: [programmer,sale,marketing] , // include three tables (programmer == header_programmers , sale == header_sales , marketing == header_marketings)
                attributes : {exclude:['p_id','s_id','m_id']} // ignore some columns from projects table
            }).catch((err) => {
                log.warn("check reads method async of CrudProjects {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in reads method async of CrudProjects {} : "+errors.message)
            throw errors
        }
        /*
        *
        * Executing (default): SELECT `projects`.`project_name`, `projects`.`project_cost`, `projects`.`project_build`, `projects`.`p_id`, `projects`.`s_id`, `projects`.`m_id`,
        * `header_programmer`.`p_id` AS `header_programmer.p_id`, `header_programmer`.`fullname` AS `header_programmer.fullname`, `header_programmer`.`salary` AS `header_programmer.salary`, `header_programmer`.`level` AS `header_programmer.level`,
        * `header_sale`.`s_id` AS `header_sale.s_id`, `header_sale`.`fullname` AS `header_sale.fullname`, `header_sale`.`salary` AS `header_sale.salary`, `header_sale`.`level` AS `header_sale.level`,
        * `header_marketing`.`m_id` AS `header_marketing.m_id`, `header_marketing`.`fullname` AS `header_marketing.fullname`, `header_marketing`.`salary` AS `header_marketing.salary`, `header_marketing`.`level` AS `header_marketing.level`
        * FROM `projects` AS `projects` LEFT OUTER JOIN `header_programmers` AS `header_programmer` ON `projects`.`p_id` = `header_programmer`.`p_id` LEFT OUTER JOIN `header_sales` AS `header_sale` ON `projects`.`s_id` = `header_sale`.`s_id` LEFT OUTER JOIN `header_marketings` AS `header_marketing` ON `projects`.`m_id` = `header_marketing`.`m_id`;
        * */
    }
    read = async (project_name) => {
        try {
            return  await project.findByPk(project_name, {
                include: [programmer,sale,marketing] , // include three tables (programmer == header_programmers , sale == header_sales , marketing == header_marketings)
                attributes : {exclude:['p_id','s_id','m_id']} // ignore some columns from projects table
            }).catch((err) => {
                log.warn("check read(project_name) method async of CrudProjects {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in read(project_name) method async of CrudProjects {} : "+errors.message)
            throw errors
        }
    }

    create = async (project_name, project_cost , project_build ,project_status , p_id , s_id , m_id) => {
        try {

            let saleFound = await sale.findByPk(s_id).catch((errors)=>{
                log.warn("there is no sale id : "+s_id)
                throw errors
            })
            let programmerFound = await programmer.findByPk(p_id).catch((errors)=>{
                log.warn("there is no programmer id : "+p_id)
                throw errors
            })
            let marketingFound = await marketing.findByPk(m_id).catch((errors)=>{
                log.warn("there is no marketing id : "+m_id)
                throw errors
            })

            return await project.create({project_name, project_cost, project_build, project_status, p_id, s_id, m_id}).catch((err) => {
                log.warn("check create(project_name, project_cost , project_build , p_id , s_id , m_id) method async of CrudProjects {} : "+err.message)
                throw err
            })

        } catch (errors) {
            log.warn("somethings was wrong in create method async of CrudProjects {} : "+errors.message)
            throw errors
        }
    }

    delete = async (project_name) => {
        try {
            return await project.destroy({where: {project_name: project_name}}).catch((err) => {
                log.warn("check read(project_name) method async of CrudProjects {} : " + err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in read(project_name) method async of CrudProjects {} : "+errors.message)
            throw errors
        }
    }

    update = async ( project_name , project_cost  , project_status , project_name_old) => {
        try {
            return await project.findAll({where: {project_name: project_name_old}}).then( async data => {
                // console.log(data) // data stores default values
                 if (data.length !== 0) {
                     await project.update({project_name , project_cost  , project_status}, {where: {project_name: project_name_old} })
                     return `updated`
                 }
                return `not found project name ${project_name_old}`
             })
        } catch (errors) {
            log.warn("somethings was wrong in update method async of CrudProjects {} : "+errors.message)
            throw errors
        }
    }

    updateHeader = async (project_name_old , p_id, s_id, m_id ,  project_name , project_cost  , project_status) => {
        try {
            return await project.findAll({where: {project_name: project_name_old}}).then( async data => {
                // console.log(data) // data stores default values
                if (data.length !== 0) {
                    // await project.update({project_name , project_cost  , project_status}, {where: {project_name: project_name_old} })
                    await sale.findByPk(s_id).catch((errors)=>{
                        log.warn("there is no sale id : "+s_id)
                        throw errors
                    })
                    await programmer.findByPk(p_id).catch((errors)=>{
                        log.warn("there is no programmer id : "+p_id)
                        throw errors
                    })
                    await marketing.findByPk(m_id).catch((errors)=>{
                        log.warn("there is no marketing id : "+m_id)
                        throw errors
                    })
                    project.update({project_name,project_cost,project_status,p_id:p_id , s_id:s_id , m_id: m_id},{where:{project_name:project_name_old}}).catch((err) => {
                        log.warn("update header method async of CrudProjects {} : " + err.message)
                        throw err
                    })
                    return `updated`
                }
                return `not found project name ${project_name}`
            })
        } catch (errors) {
            log.warn("somethings was wrong in update header method async of CrudProjects {} : "+errors.message)
            throw errors
        }
    }

}

module.exports = CrudProjects