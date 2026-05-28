class RestApiService {
    static get express() {
        return require('express')
    }
    static get bodyParser() {
        return require('body-parser')
    }
    static get path() {
        return require('path')
    }
}
module.exports = RestApiService