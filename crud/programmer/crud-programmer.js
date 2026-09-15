const programmer = require('../../entities/programmer/programmer')
const sale = require("../../entities/sale/sale");
const project = require("../../entities/projects");
const path = require('../../service/rest-api-service').path
const {createLogger} = require('../../log/logging-v2')

const filename = path.basename(__filename);
const log = createLogger(filename);

class CrudProgrammer {
    reads = async () => {
        log.info("reads method async of CrudProgrammer is used")
        try {
            return await programmer.findAll().catch((err) => {
                log.warn("check reads method async of CrudProgrammer {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in reads method async of CrudProgrammer {} : "+errors.message)
            throw errors
        }
    }
    read = async (p_id) => {
        log.info("read(m_id) method async of CrudMarketing is used")
        try {
            return await programmer.findByPk(p_id).catch((err) => {
                log.warn("check read method async of CrudProgrammer {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in read(p_id) method async of CrudProgrammer {} : "+errors.message)
            throw errors
        }
    }
    create = async (fullname , salary , level) => {
        try {
            return await programmer.create({fullname, salary, level}).catch((err) => {
                log.warn("check create method async of CrudProgrammer {} : "+err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in create method async of CrudProgrammer {} : "+errors.message)
            throw errors
        }
    }

    delete = async (p_id) => {
        try {
            return await programmer.destroy({where: {p_id: p_id}}).catch((err) => {
                log.warn("check delete method async of CrudProgrammer {} : " + err.message)
                throw err
            })
        } catch (errors) {
            log.warn("somethings was wrong in delete method async of CrudProgrammer {} : "+errors.message)
            throw errors
        }
    }
    update = async (fullname , salary  , level , p_id) => {
        try {
            return await programmer.findAll({where: {p_id: p_id}}).then( async data => {
                // console.log(data) // data stores default values
                if (data.length !== 0) {
                    await project.update({fullname,salary,level}, {where: {p_id: p_id} })
                    return `updated`
                }
                return `not found programmer id ${p_id}`
            })
        } catch (errors) {
            log.warn("somethings was wrong in update method async of CrudProgrammer {} : "+errors.message)
            throw errors
        }
    }
}

module.exports = CrudProgrammer