const url_seeder_file = require("./roles.json")
const HttpResponseJsonPresenter = require("../../../HttpResponse/HttpResponseJsonPresenter").default
const RolesInteractor = require("../../../../core/roles/roles.interactor").default



class RolesSeederController{

    constructor(interactor = new RolesInteractor(), response = new HttpResponseJsonPresenter()){
        this._interactor = interactor 
        this._presenter = response 
    }


    async seed(){
        try {
            let roles = url_seeder_file

            if (roles != null) {
                let {success, failed} = await this.insertSeederIsNotExist(roles)

                let response = {
                    size: roles.length,
                    insert: success,
                    already_done: failed
                }

                return this._presenter.messageByDefaultSuccessTrueAndWithData("Seeders Roles", response)

            } else {
                return this._presenter.messageByDefaultSuccessFalse("File Seeders not found")
            }
        } catch (error) {
            return this._presenter.messageByDefaultSuccessFalse("Erreur d'execution")
        }
    }



    async insertSeederIsNotExist(roles) {
        let seederToInsert = 0
        let failed = 0

        for (let index = 0; index < roles.length; index++) {
            const THIS_ROLE_DOES_NOT_EXIST = await this._interactor.thisRoleNameAlreadyExist(roles[index].name)
            if (THIS_ROLE_DOES_NOT_EXIST) {
                await this._interactor.saveOneRole(roles[index].name)
                seederToInsert++
            } else {
                failed++
            }
        }

        return {
            success: seederToInsert,
            failed: failed
        }
    }






}


module.exports = { default: RolesSeederController }
