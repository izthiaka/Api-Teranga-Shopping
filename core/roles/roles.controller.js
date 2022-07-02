const HttpResponseJsonPresenter = require("../../services/HttpResponse/HttpResponseJsonPresenter").default
const RolesInteractor = require("./roles.interactor").default
const UpdateRoleDto = require("./dtos/update.role.dto").default


class RolesController{
    constructor(roleInteractor = new RolesInteractor(), helperHttpJson = new HttpResponseJsonPresenter()) {
        this._helperHttpJson = helperHttpJson
        this._roleInteractor = roleInteractor
    }





    async createRole(req, res, next){
        try {
            if(req.body !== undefined){
                if(req.body.name !== undefined && req.body.name !== null && req.body.name.length > 0){
                    const role_name = req.body.name
                    const THIS_ROLE_EXIST_DOES_NOT_EXIST = await this._roleInteractor.thisRoleNameAlreadyExist(role_name)
                    if(THIS_ROLE_EXIST_DOES_NOT_EXIST){
                        const role_name = req.body.name
                        let response = await this._roleInteractor.saveOneRole(role_name)
                        return res.send(this._helperHttpJson.messageByDefaultSuccessTrueAndWithData("ROLE CREE AVEC SUCCES", response))
                    } else {
                        return res.send(this._helperHttpJson.messageByDefaultSuccessFalse("un role avec ce [nom] existe deja"))
                    }
                } else {
                    return res.send(this._helperHttpJson.messageByDefaultSuccessFalse("Le parametre [nom] est vide!"))
                }
            } else {
                return res.send(this._helperHttpJson.messageByDefaultSuccessFalse("Vous devez Specifier le nom du Role"))
            }
        }catch (error){
            //TODO send a message to the admin
            return res.send(this._helperHttpJson.messageByDefaultSuccessFalse("Une Erreur est survenue !"))
        }
    }



    async retrieveAllRole(req, res, next) {
        try{
            let response = await this._roleInteractor.getAllRoles()
            res.send(this._helperHttpJson.messageByDefaultSuccessTrueAndWithData("",response))
        }catch(error){
            //TODO send a message to the admin
            return res.send(this._helperHttpJson.messageByDefaultSuccessFalse("Une Erreur est survenue !"))
        }
    }




    async retrieveOneRoleByCode(request, response, next){
        try {
            const CODE_ROLE = request.params.code_role ? request.params.code_role : "code"
            let responseProcess = await this._roleInteractor.getOneRoleByCode(CODE_ROLE)
            response.send(this._helperHttpJson.messageByDefaultSuccessTrueAndWithData("",responseProcess))
        }catch (error){
            //TODO send a message to the admin
            //TODO logging
            return response.send(this._helperHttpJson.messageByDefaultSuccessFalse("Une Erreur est survenue !"))
        }
    }




    async deleteOneRoleByCode(request, response, next){
        try{
            const NOT_FOUND = null
            const CODE_ROLE = request.params.code_role.trim() ? request.params.code_role.trim() : null

            if (CODE_ROLE !== NOT_FOUND){
                let role = await this._roleInteractor.getOneRoleByCode(CODE_ROLE)
                if(role !== NOT_FOUND){
                    let responseProcess = await this._roleInteractor.deleteOneRoleByCode(CODE_ROLE)
                    const message = responseProcess.message_process
                    const code = responseProcess.code_role_process
                    return response.send(this._helperHttpJson.messageByDefaultSuccessTrueAndWithData(message, { code: code}))
                } else {
                    return response.send(this._helperHttpJson.messageByDefaultSuccessFalse("Le Code du Role N'existe Pas"))
                }
            } else {
                return response.send(this._helperHttpJson.messageByDefaultSuccessFalse("Le Code du Role est Requis pour cette action"))
            }
        } catch(error) {
            console.log(error)
            return response.send(this._helperHttpJson.messageByDefaultSuccessFalse("Une Erreur est survenue !"))
        }
    }




    async modifyOneRoleByCode(request, response, next){
        try{
            this.verifyTheParamsInTheUrl(request, response)
            this.verifyTheRequestBody(request, response)
            const CODE_ROLE = request.params.code_role 
            const ROLE_NAME = request.body.role_name 
            const THIS_ROLE_DOES_NOT_EXIST = await this._roleInteractor.thisRoleNameAlreadyExist(ROLE_NAME)
            if(THIS_ROLE_DOES_NOT_EXIST){
                let responseProcess = await this._roleInteractor.updateOneRoleByCode(new UpdateRoleDto(ROLE_NAME,CODE_ROLE))
                return response.send(this._helperHttpJson.messageByDefaultSuccessTrueAndWithData("SUCCES MISE A JOUR ROLE",responseProcess,201))
            } else {
                return response.send(this._helperHttpJson.messageByDefaultSuccessFalse("un role avec ce [nom] existe deja",403))
            }
        } catch(error){
            return response.send(this._helperHttpJson.messageByDefaultSuccessFalse("Une Erreur est survenue !",500))
        }
    }


    verifyTheParamsInTheUrl(request, response){
        if(request.params === undefined) {
            return response.json(this._helperHttpJson.messageByDefaultSuccessFalse("Vous devez Specifier le nom du Role"))
        }
        if(request.params.code_role === undefined ) {
            return response.json(this._helperHttpJson.messageByDefaultSuccessFalse("Le parametre [nom] n'est pas dans votre demande!"))
        }
        if(request.params.code_role.length < 0) {
            return response.json(this._helperHttpJson.messageByDefaultSuccessFalse("Le parametre [nom] est vide"))
        }
    }

    verifyTheRequestBody(request, response){
        if(request.body === undefined) {
            return response.json(this._helperHttpJson.messageByDefaultSuccessFalse("Vous devez Specifier le nom du Role"))
        }
        if(request.body.role_name === undefined || request.body.role_name === null){
            return response.json(this._helperHttpJson.messageByDefaultSuccessFalse("Le parametre [nom] n'est pas dans votre requete"))
        }

        if(request.body.role_name.length < 0){
            return response.json(this._helperHttpJson.messageByDefaultSuccessFalse("Le parametre [nom] est vide!"))
        }
    }



}

module.exports = { default: RolesController}
