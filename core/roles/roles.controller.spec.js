let RolesController = require("./roles.controller").default
const UpdateRoleDto = require("./dtos/update.role.dto").default

describe("the controller for Roles", () => {
    it("should  be defined" , () => {
        let roleController = new RolesController()
        expect(roleController).toBeDefined()
    })
    describe("The [createRole] function", () => {
        let fakeResponse
        beforeEach(() => {

            fakeResponse = { send: jest.fn((data) => {
                    return data
                })}
        })
        it("should be defined", () => {
            let roleController = new RolesController()
            expect(roleController.createRole).toBeDefined()
        })
        it("fails when the name of the role in the body is empty", async () => {
            let fakeRequest = { body : { name: ""}}

            let roleController = new RolesController()
            let result = await roleController.createRole(fakeRequest, fakeResponse)

            expect(result).toEqual(
                expect.objectContaining({
                    success: false,
                    message: expect.any(String)
                })
            )
        })
        it("fails when the name in the request is null", async () => {
            let fakeRequest = { body : { name: null}}
            let mockRoleInteractor = {
                saveOneRole: jest.fn()
            }
            let roleController = new RolesController(mockRoleInteractor)

            let result = await roleController.createRole(fakeRequest, fakeResponse)

            expect(mockRoleInteractor.saveOneRole).not.toHaveBeenCalled()
            expect(result).toEqual(
                expect.objectContaining({
                    success: false,
                    message: expect.any(String)
                })
            )
        })
        it("fails when a role with the same name already exist", async () => {
            let fakeRequest = { body : { name: "administrateur"}}
            let mockRoleInteractor = {
                saveOneRole: jest.fn(),
                thisRoleNameAlreadyExist: jest.fn((roleName) => {
                    return false
                })
            }
            let roleController = new RolesController(mockRoleInteractor)

            let result = await roleController.createRole(fakeRequest, fakeResponse)

            expect(mockRoleInteractor.saveOneRole).not.toHaveBeenCalled()
            expect(mockRoleInteractor.thisRoleNameAlreadyExist).toHaveBeenCalled()
            expect(result).toEqual(
                expect.objectContaining({
                    success: false,
                    message: expect.any(String)
                })
            )
        })
        it("calls the interactor when all the verification have been done", async () => {
            let fakeRequest = { body : { name: "administrateur"}}
            let mockRoleInteractor = {
                saveOneRole: jest.fn(),
                thisRoleNameAlreadyExist: jest.fn((roleName) => {
                    return true
                })
            }
            let roleController = new RolesController(mockRoleInteractor)

            await roleController.createRole(fakeRequest, fakeResponse)

            expect(mockRoleInteractor.saveOneRole).toHaveBeenCalled()
        })
    })

    describe("The [retrieveAllRole] function", () => {
        let fakeResponse
        beforeEach(() => {
            fakeResponse = { send: jest.fn((data) => {
                    return data
                })}
        })
        it("should be defined", () => {
            let roleController = new RolesController()
            expect(roleController.retrieveAllRole).toBeDefined()
        })
        it("should call the right function for the repository", async () => {
            let mockRoleInteractor = {
                getAllRoles: jest.fn()
            }

            let roleController = new RolesController(mockRoleInteractor)
            await roleController.retrieveAllRole({}, fakeResponse)
            expect(mockRoleInteractor.getAllRoles).toHaveBeenCalled()
        })
    })

    describe(" The [retrieveOneRoleByCode] function", () => {
        let fakeResponse
        beforeEach(() => {
            fakeResponse = { send: jest.fn((data) => {
                    return data
                })}
        })
        it("Should be defined", () => {
            let roleController = new RolesController()
            expect(roleController.retrieveOneRoleByCode).toBeDefined()
        })
        it("should call the right repository", async () => {
            let request = { params: { code_role: "hgjgfjfk"}}
            let mockRoleInteractor = {
                getOneRoleByCode: jest.fn((code) => {

                })
            }

            let roleController = new RolesController(mockRoleInteractor)
            await roleController.retrieveOneRoleByCode(request, fakeResponse)
            expect(mockRoleInteractor.getOneRoleByCode).toHaveBeenCalledWith(request.params.code_role)
        })
        it("should call the rigth response when the serviec throws an error", async () => {
            let request = { params: { code_role: "hgjgfjfk"}}
            let mockRoleInteractor = {
                getOneRoleByCode: jest.fn((code) => {
                    throw new Error("test")
                })
            }

            let roleController = new RolesController(mockRoleInteractor)
            let data = await roleController.retrieveOneRoleByCode(request, fakeResponse)
            expect(data).toEqual(expect.objectContaining({
                success: expect.any(Boolean),
                message: expect.any(String)
            }))
        })
    })

    describe(" The [modifyOneRoleByCode] function", () => {
        let fakeResponse
        beforeEach(() => {
            fakeResponse = { json: jest.fn((data) => {
                    return data
                }),send: jest.fn((data) => {
                    return data
                })}
        })
        it("should be defined", () => {
            let roleController = new RolesController()
            expect(roleController.modifyOneRoleByCode).toBeDefined()
        })
        it("should call the function [updateOneRoleByCode] on the repository when all the data is here and teh roel is not here", async () => {
            let request = { params: { code_role: "hgjgfjfk"}, body: {role_name: "new name"}}
            let mockRepository = {
                updateOneRoleByCode: jest.fn((code, role_name) => {}),
                thisRoleNameAlreadyExist: jest.fn((roleName) => {
                    return true
                })
            }

            let roleController = new RolesController(mockRepository)
            await roleController.modifyOneRoleByCode(request, fakeResponse)
            expect(mockRepository.updateOneRoleByCode).toHaveBeenCalledWith(new UpdateRoleDto( request.body.role_name, request.params.code_role))
        })
    })
    describe(" The [deleteOneRoleByCode] function ", () => {
        let fakeResponse
        beforeEach(() => {
            fakeResponse = { send: jest.fn((data) => {
                    return data
                })}
        })
        it("should be defined", () => {
            let roleController = new RolesController()
            expect(roleController.deleteOneRoleByCode).toBeDefined()
        })
        it("should not call [The deleteOneRoleByCode function] when [ the code_role in the params of the request  is null]", async () => {
            let request = { params: { code_role: null}}
            let mockRoleInteractor = {
                deleteOneRoleByCode: jest.fn((code) => {

                })
            }

            let roleController = new RolesController(mockRoleInteractor)
            await roleController.deleteOneRoleByCode(request, fakeResponse)
            expect(mockRoleInteractor.deleteOneRoleByCode).not.toHaveBeenCalled()
        })
        it("should not call the [deleteOneRoleByCode function] when the [getOneRoleByCode returns NULL]", async () => {
            let request = { params: { code_role: "code"}}
            let mockRoleInteractor = {
                deleteOneRoleByCode: jest.fn((code) => {

                }),
                getOneRoleByCode:  jest.fn((code) => {
                    return null
                })
            }

            let roleController = new RolesController(mockRoleInteractor)
            let result = await roleController.deleteOneRoleByCode(request, fakeResponse)
            expect(result).toEqual(expect.objectContaining({
                success: false,
                message: expect.any(String)
            }))
            expect(mockRoleInteractor.getOneRoleByCode).toHaveBeenCalled()
            expect(mockRoleInteractor.deleteOneRoleByCode).not.toHaveBeenCalled()
        })
        it("should call [The deleteOneRoleByCode function] when [The getOneRoleByCode function returns data]", async () => {
            let request = { params: { code_role: "hgjgfjfk"}}
            let mockRoleInteractor = {
                deleteOneRoleByCode: jest.fn((code) => {

                }),
                getOneRoleByCode:  jest.fn((code) => {
                    return {
                        _id: "fake_id"
                    }
                })
            }

            let roleController = new RolesController(mockRoleInteractor)
            await roleController.deleteOneRoleByCode(request, fakeResponse)
            expect(mockRoleInteractor.deleteOneRoleByCode).toHaveBeenCalledWith(request.params.code_role)
        })
    })
})
