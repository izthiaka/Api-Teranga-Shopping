class UpdateRoleDto{
    constructor(role_name, role_code) {
        this._role_name = role_name
        this._role_code = role_code
    }

    get roleName(){
        return this._role_name
    }

    get roleCode(){
        return this._role_code
    }
}

module.exports = { default: UpdateRoleDto }
