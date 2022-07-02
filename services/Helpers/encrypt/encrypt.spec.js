const EncryptImplementation = require("./encrypt.implementation").default

describe(" The Encrypt Implementation", () => {
    it('should be defined', () => {
        let encrypt = new EncryptImplementation()
        expect(encrypt).toBeDefined()
    })

    describe(" The function hash ", () => {
        it(" should be defined", () => {
            let encrypt = new EncryptImplementation()
            expect(encrypt.hash).toBeDefined()
        })
    })
})
