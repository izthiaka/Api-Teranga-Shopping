class Role {
    static getPartnerRoleLibelle(){
        return "PARTNER"
    }
    static getAdminRoleLibelle(){
        return "ADMIN"
    }
    static getCustomerRoleLibelle(){
        return "CUSTOMER"
    }
}

module.exports = { default: Role }
