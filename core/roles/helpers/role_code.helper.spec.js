const RoleCodeHelper = require("./role_code.helper").default

describe("The [ROLE CODE HELPER CLASS] ", () => {
    it("should be defined", () => {
        expect(new RoleCodeHelper()).toBeDefined()
    })
    it("should generate a string when the [gen] function is called", () => {
        let response = RoleCodeHelper.gen()
        expect(response).toEqual(expect.any(String))
    })
})
