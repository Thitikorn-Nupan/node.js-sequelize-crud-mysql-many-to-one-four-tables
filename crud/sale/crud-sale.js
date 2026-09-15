const sale = require('../../entities/sale/sale')
const marketing = require("../../entities/marketing/marketing");
const programmer = require("../../entities/programmer/programmer");
const project = require("../../entities/projects");
const path = require('../../service/rest-api-service').path
const {createLogger} = require('../../log/logging-v2')

const filename = path.basename(__filename);
const log = createLogger(filename);

class CrudSale {
    reads = async () => {
        log.info("reads method async of CrudProgrammer is used")
        try {
            return await sale.findAll().catch((err) => {
                log.warn("check reads method async of CrudSale {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in reads method async of CrudSale {} : "+errors.message)
            throw errors
        }
    }
    read = async (s_id) => {
        log.info("read(m_id) method async of CrudMarketing is used")
        try {
            return await sale.findByPk(s_id).catch((err) => {
                log.warn("check read method async of CrudSale {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in read(p_id) method async of CrudSale {} : "+errors.message)
            throw errors
        }
    }
    create = async (fullname , salary , level) => {
        try {
            return await sale.create({fullname, salary, level}).catch((err) => {
                log.warn("check create method async of CrudSale {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in create method async of CrudSale {} : "+errors.message)
            throw errors
        }
    }

    delete = async (s_id) => {
        try {
            return await sale.destroy({where: {s_id: s_id}}).catch((err) => {
                log.warn("check delete method async of CrudSale {} : " + err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in delete method async of CrudSale {} : "+errors.message)
            throw errors
        }
    }

    update = async (fullname , salary  , level , s_id) => {
        try {
            return await sale.findAll({where: {s_id: s_id}}).then( async data => {
                // console.log(data) // data stores default values
                if (data.length !== 0) {
                    await project.update({fullname,salary,level}, {where: {s_id: s_id} })
                    return `updated`
                }
                return `not found sale id ${s_id}`
            })
        } catch (errors) {
            log.warn("somethings was wrong in update method async of CrudSale {} : "+errors.message)
            throw errors
        }
    }

}

module.exports = CrudSale