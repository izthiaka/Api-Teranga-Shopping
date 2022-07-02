class DeleteRoleDto{
    constructor(message, code) {
        this.message = message 
        this.code = code
    }

    get message_process(){
        return this.message
    }

    get code_role_process(){
        return this.code
    }
}

module.exports = { default: DeleteRoleDto }
