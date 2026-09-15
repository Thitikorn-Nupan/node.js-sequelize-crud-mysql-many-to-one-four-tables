const app = require('../service/rest-api-service').express()
const router = require('../router/router')
const path = require('../service/rest-api-service').path
const {createLogger} = require('../log/logging-v2')

const filename = path.basename(__filename);
const log = createLogger(filename);

app.use('/api-project',router.routerProject)
app.use('/api-programmer',router.routerProgrammer)
app.use('/api-sale',router.routerSale)
app.use('/api-marketing',router.routerMarketing)
app.listen(3000,function (errors) {
    if (errors) throw errors
    else log.info(`u r in port 3000`)
})