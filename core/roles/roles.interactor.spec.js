const RolesInteractor = require("./roles.interactor").default
const UpdateRoleDto = require("./dtos/update.role.dto").default
const DeleteRoleDto = require("./dtos/DeleteRoleDto").default

describe("the RolesInteractor Class", () => {
    it("should be defined", () => {
        let interactor = new RolesInteractor()
        expect(interactor).toBeDefined()
    })
    describe(" The [saveOneRole] function ", () => {
        it("should exist", () => {
            let interactor = new RolesInteractor()
            expect(interactor.saveOneRole).toBeDefined()
        })
        it("should call the [RoleRepository] to save", async () => {
            let mockRepository = {
                insertOneRole: jest.fn()
            }
            let interactor = new RolesInteractor(mockRepository)
            await interactor.saveOneRole("partenaire")
            expect(mockRepository.insertOneRole).toHaveBeenCalled()
        })
        it("should return a good [JSON MESSAGE] when [RoleRepository] works fine", async () => {
            let mockRepository = {
                insertOneRole: jest.fn().mockImplementationOnce((roleName, codeRole) => {
                    return {
                        code_role: `${codeRole}${roleName}`,
                        name: roleName
                    }
                })
            }
            let interactor = new RolesInteractor(mockRepository)
            const parameter = "partenaire"
            let response = await interactor.saveOneRole(parameter)
            expect(mockRepository.insertOneRole).toHaveBeenCalledWith(parameter)
            expect(response).toEqual(expect.objectContaining({
                code_role: expect.any(String),
                name: expect.any(String)
            }))
        })
        it("should return a good [JSON MESSAGE] when [RoleRepository] throws and error", async () => {
            let mockRepository = {
                insertOneRole: jest.fn(() => {
                    throw new Error("Une Erreur est survenue durant l'insertion")
                })
            }
            const parameter = "partenaire"
            let interactor = new RolesInteractor(mockRepository)
            let response = await interactor.saveOneRole(parameter)
            expect(response).toEqual(expect.objectContaining({
                success: false,
                message: expect.any(String)
            }))
        })
    })

    describe(" The [getAllRoles] function ", () => {
        it("should be defined", () => {
            let interactor = new RolesInteractor()
            expect(interactor.getAllRoles).toBeDefined()
        })
        it("should call the repository", () => {
            let mockRepository = {
                findAll: jest.fn()
            }

            let interactor = new RolesInteractor(mockRepository)
            interactor.getAllRoles()
            expect(mockRepository.findAll).toHaveBeenCalled()
        })
    })
    describe(" The [getOneRoleById] function", () => {
        it("should be defined", () => {
            let interactor = new RolesInteractor()
            expect(interactor.getOneRoleByCode).toBeDefined()
        })
        it("should call the repository", () => {
            let mockRepository = {
                findOneByCode: jest.fn()
            }

            let interactor = new RolesInteractor(mockRepository)
            interactor.getOneRoleByCode()
            expect(mockRepository.findOneByCode).toHaveBeenCalled()
        })
    })
    describe(" The [updateOneRoleByCode] function", () => {
        it("should be defined", () => {
            let interactor = new RolesInteractor()
            expect(interactor.updateOneRoleByCode).toBeDefined()
        })
        it("should call the repository with right dto", async() => {
            let mockRepository = {
                updateOneRoleByHisCode: jest.fn((roleName, roleCode) => {

                })
            }
            let interactor = new RolesInteractor(mockRepository)
            let updateRoleDto = new UpdateRoleDto("role", "code")
            await interactor.updateOneRoleByCode(updateRoleDto)
            expect(mockRepository.updateOneRoleByHisCode).toHaveBeenCalledWith(updateRoleDto.roleName, updateRoleDto.roleCode)
        })
    })
    describe(" The [getOneRoleByName] function", () => {
        it("should be defined", () => {
            let interactor = new RolesInteractor()
            expect(interactor.getOneRoleByName).toBeDefined()
        })
        it("should call the function [findOneByName] on the repository", async () => {
            let mockRepository = {
                findOneByName: jest.fn((roleName) => {

                })
            }
            let interactor = new RolesInteractor(mockRepository)
            await interactor.getOneRoleByName("role")
            expect(mockRepository.findOneByName).toHaveBeenCalledWith("role")
        })
    })
    describe(" The [thisRoleNameAlreadyExist] function ", () => {
        it("should be defined", () => {
            let interactor = new RolesInteractor()
            expect(interactor.thisRoleNameAlreadyExist).toBeDefined()
        })

        it("should call the [getOneRoleByName] function", async () => {
            let interactor = new RolesInteractor()
            const NAME = "adminsitrateur"
            const getOneByName = jest.spyOn(interactor, 'getOneRoleByName').mockImplementationOnce((data) => { return {_id: "fake id"}})
            await interactor.thisRoleNameAlreadyExist(NAME)
            expect(getOneByName).toHaveBeenCalledWith(NAME)
        })

        it("should call the [getOneRoleByName] function and when the [data exist] it return [false]", async () => {
            let interactor = new RolesInteractor()
            const NAME = "adminsitrateur"
            jest.spyOn(interactor, 'getOneRoleByName').mockImplementationOnce((data) => {
                return {
                    _id: "fake_id"
                }
            })
            let does_not_exist = await interactor.thisRoleNameAlreadyExist(NAME)
            expect(does_not_exist).toBeFalsy()
        })

        it("should call the [getOneRoleByName] function and when the [data is null] it returns [true]", async () => {
            let interactor = new RolesInteractor()
            const NAME = "adminsitrateur"
            jest.spyOn(interactor, 'getOneRoleByName').mockImplementationOnce((data) => {
                return null
            })
            let does_not_exist = await interactor.thisRoleNameAlreadyExist(NAME)
            expect(does_not_exist).toBeTruthy()
        })
    })
    describe(" The [deleteOneRoleByCode] function", () => {
        it("should be defined", () => {
            let interactor = new RolesInteractor()
            expect(interactor.deleteOneRoleByCode).toBeDefined()
        })
        it("should call the function [deleteOneRoleByHisCode] on the repository", async () => {
            let mockRepository = {
                deleteOneRoleByHisCode: jest.fn((roleName) => {
                    return {deletedCount: 0}
                })
            }
            let interactor = new RolesInteractor(mockRepository)
            await interactor.deleteOneRoleByCode("role_code")
            expect(mockRepository.deleteOneRoleByHisCode).toHaveBeenCalledWith("role_code")
        })
        it("should return a [JSON MESSAGE] when [The function deleteOneRoleByHisCode returns bad message] ", async () => {
            let mockRepository = {
                deleteOneRoleByHisCode: jest.fn((roleName) => {
                    return {deletedCount: 1}
                })
            }
            let interactor = new RolesInteractor(mockRepository)
            let data = await interactor.deleteOneRoleByCode("role_code")
            expect(mockRepository.deleteOneRoleByHisCode).toHaveBeenCalledWith("role_code")

            expect(data).toEqual(new DeleteRoleDto(expect.any(String), "role_code"))
        })

    })
})
