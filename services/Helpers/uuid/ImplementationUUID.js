const { v4: uuidv4 } = require('uuid')

class ImplementationUUID{
    generateUUID(){
        return uuidv4()
    }
}

module.exports = { default: ImplementationUUID}
