const ImplementationUUID = require("./ImplementationUUID").default
class UuidAdapter{
    constructor(uuidService = new ImplementationUUID()) {
        this._uuidService = uuidService
    }

    getUUID(){
        return this._uuidService.generateUUID()
    }
}

module.exports = { default: UuidAdapter }
