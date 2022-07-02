const RolesDatabaseAdapter = require("./roles.database.adapter").default
const HttpResponseJsonPresenter = require("../../services/HttpResponse/HttpResponseJsonPresenter").default
const DeleteRoleDto = require("./dtos/DeleteRoleDto").default

const OneRoleDto = require("./dtos/OneRoleDto").default



class RolesInteractor{
    constructor(roleRepository = new RolesDatabaseAdapter(), presenter = new HttpResponseJsonPresenter()) {
        this._repository = roleRepository
        this._presenter = presenter
    }

    async saveOneRole(role_name){
        try {
            return await this._repository.insertOneRole(role_name)
        }catch (error) {
            return this._presenter.messageByDefaultSuccessFalse("IMPOSSIBLE D'INSERER LE ROLE")
        }
    }




    async getAllRoles(){
        try {
            return await this._repository.findAll()
        }catch (error){
            throw new Error(error.toString())
        }
    }




    async getOneRoleByCode(code){
        try {
            return await this._repository.findOneByCode(code)
        }catch(error){
            throw new Error(error.toString())
        }
    }




    async getOneRoleByName(role_name){
        try {
            return await this._repository.findOneByName(role_name)
        }catch(error){
            throw new Error(error.toString())
        }
    }




    async thisRoleNameAlreadyExist(role_name){
        try {
            let data = await this.getOneRoleByName(role_name)
            if(data === null) return true
            return data._id === undefined
        }catch(error){
            throw new Error(error.toString())
        }
    }




    async updateOneRoleByCode(updateRoleDto){
        try{
            const role_name = updateRoleDto.roleName
            const role_code = updateRoleDto.roleCode
            return await this._repository.updateOneRoleByHisCode(role_name, role_code)
        }catch(error){
            throw new Error(error.toString())
        }
    }




    async deleteOneRoleByCode(roleCode){
        try{
            const NOTHING = 0
            let isDeletedResult = await this._repository.deleteOneRoleByHisCode(roleCode)

            if(isDeletedResult.deletedCount !== NOTHING){
                return new DeleteRoleDto("SUPPRESSION REUSSIE", roleCode)
            } else {
                return new DeleteRoleDto("AUCUN ELEMENT SUPPRIME", roleCode)
            }
        } catch (error) {
            throw new Error(error.toString())
        }
    }




    async findOneRoleByName(name){
        try{
            const data = await this._repository.findByName(name)
            if(data !== null){
                const response = new OneRoleDto(data.role_name, data.code_role).toJson()
                return this._presenter.messageByDefaultSuccessTrueAndWithData('SUCCESS', response, 200)
            } else {
                return this._presenter.messageByDefaultSuccessFalse('Un Code avec ce nom est inexistant ', 404)
            }
        }catch(error){
            throw new Error(error.toString())
        }
    }





}

module.exports = { default: RolesInteractor }
