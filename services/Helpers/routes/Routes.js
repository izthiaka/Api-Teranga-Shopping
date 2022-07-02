const dotenv = require("dotenv")
dotenv.config()
const URL = process.env.URL

class Routes{

    static BASE_URL = URL

    static getUrlForConfirmationAdminEmail(key){
        return `${this.BASE_URL}/api/v2/users/admin/${key}/confirmation_account`
    }


    static getUrlForConfirmationPartnerEmail(key){
        return `${this.BASE_URL}/api/v2/users/partner/${key}/confirmation_account`
    }

    static getUrlForConfirmationCustomerEmail(key){
        return `${this.BASE_URL}/api/v2/users/customer/${key}/confirmation_account`
    }

}

module.exports = { default: Routes }
