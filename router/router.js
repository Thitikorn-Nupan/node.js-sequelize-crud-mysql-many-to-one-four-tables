const log = require('../log/logging').logger
const bodyParser = require('../service/rest-api-service').bodyParser

/** variable for any router */
const routerProject = require('../service/rest-api-service').express.Router()
const routerMarketing = require('../service/rest-api-service').express.Router()
const routerProgrammer = require('../service/rest-api-service').express.Router()
const routerSale = require('../service/rest-api-service').express.Router()

/** variable for any crud  */
const crudMarketing = require('../crud/marketing/crud-marketing') , CrudMarketingObj = new crudMarketing()
const crudProgrammer = require('../crud/programmer/crud-programmer') , CrudProgrammerObj = new crudProgrammer()
const crudSale = require('../crud/sale/crud-sale') , CrudSaleObj = new crudSale()
const crudProject = require('../crud/crud-projects') , CrudProjectObj = new crudProject()

/** set meddler ware */
routerProject.use(bodyParser.json())
routerProject.use(bodyParser.urlencoded({extended : true}))
routerMarketing.use(bodyParser.json())
routerMarketing.use(bodyParser.urlencoded({extended : true}))
routerProgrammer.use(bodyParser.json())
routerProgrammer.use(bodyParser.urlencoded({extended : true}))
routerSale.use(bodyParser.json())
routerSale.use(bodyParser.urlencoded({extended : true}))


const dateObject = new Date(), date = (`0${dateObject.getDate()}`).slice(-2), month = (`0${dateObject.getMonth() + 1}`).slice(-2), year = dateObject.getFullYear()
//log.info(`${year}-${month}-${date}`)

/** Project */
routerProject.get('/reads',async (req , res) => {
    try {
        await CrudProjectObj.reads().then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from reads async method from crud project {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerProject get method values (reads) : ${errors.message}`)
        throw errors
    }
})
routerProject.get('/read/(:project_name)',async (req , res) => {
    try {
        await CrudProjectObj.read(req.params["project_name"]).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from read(project_name) async method from crud project {} : "+errors.message)
            throw res.json({
                cause : errors.message ,
                status : 406
            })
        })
    }catch (errors) {
        log.warn(`cause from routerProject get method values (read) : ${errors.message}`)
        throw errors
    }
})
routerProject.post('/create/programmer/(:p_id)/sale/(:s_id)/marketing/(:m_id)',async (req , res) => {
    try {
        let {project_name , project_cost , project_status} = req.body
        let project_build = `${year}-${month}-${date}`
        await CrudProjectObj.create(project_name , project_cost,project_build , project_status ,req.params["p_id"] , req.params["s_id"] , req.params["m_id"]).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from create async method from crud project {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerProject get method values (create) : ${errors.message}`)
        throw errors
    }
})
routerProject.delete('/delete/(:project_name)',async (req , res) => {
    try {
        await CrudProjectObj.delete(req.params["project_name"]).then((result) => {
            return res.status(200).json({
                status:"ok",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from delete(project_name) async method from crud project {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerProject get method values (delete) : ${errors.message}`)
        throw errors
    }
})
routerProject.put('/update/(:project_name_old)',async (req , res) => {
    try {
        let {project_name , project_cost , project_status} = req.body
        await CrudProjectObj.update(project_name , project_cost , project_status ,req.params["project_name_old"]).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from update async method from crud project {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerProject get method values (update) : ${errors.message}`)
        throw errors
    }
})
routerProject.put('/update-header/programmer/(:p_id)/sale/(:s_id)/marketing/(:m_id)/(:project_name_old)',async (req , res) => {
    try {
        let {project_name , project_cost , project_status} = req.body
        await CrudProjectObj.updateHeader(req.params["project_name_old"],req.params["p_id"],req.params["s_id"],req.params["m_id"], project_name , project_cost , project_status ).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from update async method from crud project {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerProject get method values (update) : ${errors.message}`)
        throw errors
    }
})

/** Marketings */
routerMarketing.get('/reads',async (req , res) => {
    try {
        await CrudMarketingObj.reads().then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from reads async method from crud marketing {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerMarketing get method values (reads) : ${errors.message}`)
        throw errors
    }
})
routerMarketing.get('/read/(:m_id)',async (req , res) => {
    try {
        await CrudMarketingObj.read(req.params["m_id"]).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from read(m_id) async method from crud marketing {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerMarketing get method values (read) : ${errors.message}`)
        throw errors
    }
})
routerMarketing.post('/create',async (req , res) => {
    try {
        let {fullname , salary , level} = req.body
        await CrudMarketingObj.create(fullname,salary,level).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from create async method from crud marketing {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerMarketing get method values (create) : ${errors.message}`)
        throw errors
    }
})
routerMarketing.delete('/delete/(:m_id)',async (req , res) => {
    try {
        await CrudMarketingObj.delete(req.params["m_id"]).then((result) => {
            return res.status(200).json({
                status:"ok",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from delete async method from crud marketing {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerMarketing get method values (delete) : ${errors.message}`)
        throw errors
    }
})
routerMarketing.put('/update/(:m_id)',async (req , res) => {
    try {
        let {fullname , salary , level} = req.body
        await CrudMarketingObj.update(fullname , salary , level,req.params["m_id"]).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from update async method from crud marketing {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerMarketing get method values (update) : ${errors.message}`)
        throw errors
    }
})

/** Programmer */
routerProgrammer.get('/reads',async (req , res) => {
    try {
        await CrudProgrammerObj.reads().then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from reads async method from crud programmer {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerProgrammer get method values (reads) : ${errors.message}`)
        throw errors
    }
})
routerProgrammer.get('/read/(:p_id)',async (req , res) => {
    try {
        await CrudProgrammerObj.read(req.params["p_id"]).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from read(p_id) async method from crud programmer {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerProgrammer get method values (read) : ${errors.message}`)
        throw errors
    }
})
routerProgrammer.post('/create',async (req , res) => {
    try {
        let {fullname , salary , level} = req.body
        await CrudProgrammerObj.create(fullname,salary,level).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from create async method from crud programmer {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerProgrammer get method values (create) : ${errors.message}`)
        throw errors
    }
})
routerProgrammer.delete('/delete/(:p_id)',async (req , res) => {
    try {
        await CrudProgrammerObj.delete(req.params["p_id"]).then((result) => {
            return res.status(200).json({
                status:"ok",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from delete async method from crud programmer {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerProgrammer get method values (delete) : ${errors.message}`)
        throw errors
    }
})
routerProgrammer.put('/update/(:p_id)',async (req , res) => {
    try {
        let {fullname , salary , level} = req.body
        await CrudProgrammerObj.update(fullname , salary , level,req.params["p_id"]).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from update async method from crud programmer {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerProgrammer get method values (update) : ${errors.message}`)
        throw errors
    }
})

/** Sale */
routerSale.get('/reads',async (req , res) => {
    try {
        await CrudSaleObj.reads().then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from reads async method from crud sale {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerSale get method values (reads) : ${errors.message}`)
        throw errors
    }
})
routerSale.get('/read/(:s_id)',async (req , res) => {
    try {
        await CrudSaleObj.read(req.params["s_id"]).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from read(p_id) async method from crud sale {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerSale get method values (read) : ${errors.message}`)
        throw errors
    }
})
routerSale.post('/create',async (req , res) => {
    try {
        let {fullname , salary , level} = req.body
        await CrudSaleObj.create(fullname,salary,level).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from create async method from crud sale {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerSale get method values (create) : ${errors.message}`)
        throw errors
    }
})
routerSale.delete('/delete/(:s_id)',async (req , res) => {
    try {
        await CrudSaleObj.delete(req.params["s_id"]).then((result) => {
            return res.status(200).json({
                status:"ok",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from delete async method from crud sale {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerSale get method values (delete) : ${errors.message}`)
        throw errors
    }
})
routerSale.put('/update/(:s_id)',async (req , res) => {
    try {
        let {fullname , salary , level} = req.body
        await CrudSaleObj.update(fullname , salary , level,req.params["s_id"]).then((result) => {
            return res.status(202).json({
                status:"accepted",
                data : result
            })
        }).catch((errors) => {
            log.warn("something was wrong from update async method from crud sale {} : "+errors.message)
            throw errors
        })
    }catch (errors) {
        log.warn(`cause from routerSale get method values (update) : ${errors.message}`)
        throw errors
    }
})

module.exports = {
    routerProject ,
    routerSale ,
    routerProgrammer ,
    routerMarketing
}