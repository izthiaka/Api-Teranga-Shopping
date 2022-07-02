const express = require("express")
const router = express.Router()
/*
const IsSuperAdminMiddleware = new(require("../users/super_admin/middlewares/is-admin.middleware").default)
*/
let roleController = new (require("./roles.controller").default)

// const middleware = (req, res, next) => IsSuperAdminMiddleware.invoke(req, res, next)



/*
    permits to create one [ROLE]
 */
router.post("/create", (req,res, next) => {
    return roleController.createRole(req, res, next)
})



/*
    permits to retrieve all the [ROLE]
 */
router.get("/all", (req,res, next) => {
    return roleController.retrieveAllRole(req, res, next)
})



/*
    permits to retrieve one [ROLE] by [code_role]
 */
router.get("/get/:code_role", (req,res, next) => {
    return roleController.retrieveOneRoleByCode(req, res, next)
})



/*
    permits to update one [ROLE] by [code_role]
 */
router.put("/update/:code_role", (req,res, next) => {
    return roleController.modifyOneRoleByCode(req, res, next)
})



/*
    delete one [ROLE] by [code_role]
 */
router.delete("/delete/:code_role", (req,res, next) => {
    return roleController.deleteOneRoleByCode(req, res, next)
})

module.exports = { router }
