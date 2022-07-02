const RoleRepository = require("../../services/Database/schemas/roleSchema").default
const GenerateRoleCode = require("./helpers/role_code.helper").default
const RoleModel = require("./model/Role").default



class RolesDatabaseAdapter {
    constructor(repository = RoleRepository, roleHelper = GenerateRoleCode) {
        this._repository = repository
        this._roleHelper = roleHelper
    }



    async deleteById(id) {
        await this._repository.deleteOne({ _id: id })
    }





    async insertOneRole(role_name) {
        let body = {
            role_name: role_name,
            code_role: this._roleHelper.gen()
        }

        return await this._repository.create(body)
    }




    async findAll() {
        const options = {
            page: 1,
            limit: 10,
            collation: {
                locale: 'en',
            },
        }

        return await this._repository.paginate({}, options)
            .then((data) => data)
    }




    async findOneByCode(code) {
        return this._repository.findOne({ code_role: code })
    }




    async updateOneRoleByHisCode(roleName, roleCode) {
        let docFinal = null
        this._repository.findOneAndUpdate({ code_role: roleCode }, { $set: { role_name: roleName } }, { new: true }, (error, doc) => {
            docFinal = doc
        })
        return await this.findOneByCode(roleCode)
    }




    async findOneByName(name) {
        return await this._repository.findOne({ role_name: name })
    }




    async theCodeRoleExist(code){
        let data = await this._repository.findOne({code_role: code})
        if(data === null) return false 
        return data._id === undefined 
    }





    async theRoleIsAdmin(code){
        let data = await this._repository.findOne({code_role: code})
        if(data === null) return false 
        return data.role_name === RoleModel.getAdminRoleLibelle() 
    }





    async theRoleIsPartner(code_role){
        let data = await this._repository.findOne({code_role: code_role})
        if(data === null) return false 
        return data.role_name === RoleModel.getPartnerRoleLibelle() 
    }


    async theRoleIsCustomer(code_role){
        let data = await this._repository.findOne({code_role: code_role})
        if(data === null) return false 
        return data.role_name === RoleModel.getCustomerRoleLibelle() 
    }





    async deleteOneRoleByHisCode(code_role){
        return await this._repository.deleteOne({ code_role: code_role })
    }




    async findByName(name){
        return await this._repository.findOne({role_name: name})
    }







}

module.exports = { default: RolesDatabaseAdapter }
