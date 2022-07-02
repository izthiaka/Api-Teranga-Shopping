class HttpResponseJsonPresenter{
    messageByDefaultSuccessFalse(message, statusCode = 404, error = null){
        return {
            success: false,
            message: message,
            statusCode: statusCode
        }
    }

    messageByDefaultSuccessTrue(message, statusCode = 200){
        return {
            statusCode: statusCode,
            success: true,
            message: message
        }
    }

    messageByDefaultSuccessTrueAndWithData(message, data, statusCode = 200){
        return {
            statusCode: statusCode,
            success: true,
            message: message,
            data: data
        }
    }


}

module.exports = { default: HttpResponseJsonPresenter }
