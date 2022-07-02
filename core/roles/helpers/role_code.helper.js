const UUIDAdapter = require("../../../services/Helpers/uuid/UuidAdapter").default

class RoleCodeHelper {
    static CONTEXT_NAME = "TERANGA_SHOPPING"
    static gen(role_name = ""){
        return `${role_name.trim().replace(/ /g,"_")}${this.CONTEXT_NAME}${new UUIDAdapter().getUUID()}${new Date().toISOString()}`
    }
}

module.exports = { default: RoleCodeHelper }
