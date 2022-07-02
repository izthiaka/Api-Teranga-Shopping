const EncryptImplementation = require("./encrypt.implementation").default

class EncryptAdapter{
    constructor(encryptInterface = new EncryptImplementation() ) {
        this._encryptInterface = encryptInterface
    }

    hash(value){
        return this._encryptInterface.hash(value)
    }

    decrypt(value){
        return this._encryptInterface.decrypt(value)
    }


}


module.exports = { default: EncryptAdapter}
