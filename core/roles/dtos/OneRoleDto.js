class OneRoleDto {
    constructor(name, code) {
        this._name = name
        this._code = code 
    }

    get roleName(){
        return this._name
    }

    get roleCode(){
        return this._code
    }

    toJson(){
        return {
            name: this._name,
            code: this._code
        }
    }
}

module.exports = { default: OneRoleDto }
