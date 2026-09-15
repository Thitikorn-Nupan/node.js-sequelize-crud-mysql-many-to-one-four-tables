const marketing = require('../../entities/marketing/marketing')
const project = require("../../entities/projects");
const sale = require("../../entities/sale/sale");
const path = require('../../service/rest-api-service').path
const {createLogger} = require('../../log/logging-v2')

const filename = path.basename(__filename);
const log = createLogger(filename);

class CrudMarketing {
    reads = async () => {
        try {
            return await marketing.findAll().catch((err) => {
                log.warn("check reads method async of CrudMarketing {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in reads method async of CrudMarketing {} : "+errors.message)
            throw errors
        }
    }
    read = async (m_id) => {
        try {
            return await marketing.findByPk(m_id).catch((err) => {
                log.warn("check read method async of CrudMarketing {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in read(m_id) method async of CrudMarketing {} : "+errors.message)
            throw errors
        }
    }

    create = async (fullname , salary , level) => {
        try {
            return await marketing.create({fullname, salary, level}).catch((err) => {
                log.warn("check create method async of CrudMarketing {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in create method async of CrudMarketing {} : "+errors.message)
            throw errors
        }
    }

    delete = async (m_id) => {
        try {
            return await marketing.destroy({where: {m_id: m_id}}).catch((err) => {
                log.warn("check delete method async of CrudMarketing {} : " + err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in delete method async of CrudMarketing {} : "+errors.message)
            throw errors
        }
    }

    update = async (fullname , salary  , level , m_id) => {
        try {
            return await marketing.findAll({where: {m_id: m_id}}).then( async data => {
                // console.log(data) // data stores default values
                if (data.length !== 0) {
                    await project.update({fullname,salary,level}, {where: {m_id: m_id} })
                    return `updated`
                }
                return `not found sale id ${m_id}`
            })
        } catch (errors) {
            log.warn("somethings was wrong in update method async of CrudSale {} : "+errors.message)
            throw errors
        }
    }

}

module.exports = CrudMarketing