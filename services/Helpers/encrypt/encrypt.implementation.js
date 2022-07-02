const crypto = require("crypto")


/*
    https://attacomsian.com/blog/nodejs-encrypt-decrypt-data
 */
class EncryptImplementation{
    constructor() {
        this._algorithm = 'aes-256-ctr'
        this._secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'
        this._iv = crypto.randomBytes(16) 
    }



    hash(value){
        const cipher = crypto.createCipheriv(this._algorithm, this._secretKey, this._iv)

        const encrypted = Buffer.concat([cipher.update(value), cipher.final()])

        return {
            iv: this._iv.toString('hex'),
            content: encrypted.toString('hex')
        }
    }



    decrypt(hash){
        const decipher = crypto.createDecipheriv(this._algorithm, this._secretKey, Buffer.from(hash.iv, 'hex'))

        const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])

        return decrypted.toString()
    }





}


module.exports = { default: EncryptImplementation }
