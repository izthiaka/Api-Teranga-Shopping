const UUIDAdapter = require("./UuidAdapter").default

describe("The Adapter of the UUID", () => {
    it("should be defined", () => {
        expect(new UUIDAdapter()).toBeDefined()
    })
    it("should call the [REPOSITORY] when needed ", async () => {
        let mockRepository = {
            generateUUID: jest.fn()
        }

        let uuidAdapter = new UUIDAdapter(mockRepository)
        await uuidAdapter.getUUID()
        expect(mockRepository.generateUUID).toHaveBeenCalled()
    })
})
