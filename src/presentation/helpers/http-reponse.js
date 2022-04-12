import MissingParamError from './missing-param-error.js';
import ServerError from './server-error';
import UnauthorizedError from './unauthorizedError-param-error.js';
export const badRequest = (paramName) => {
    return {
        statusCode: 400,
        body: new MissingParamError(paramName)

    };
}

export const serverError = () => {
    return {
        statusCode: 500,
        body: new ServerError()

    };
}

export const unauthorizedError = () => {
    return {
        statusCode: 401,
        body: new UnauthorizedError()
    };
}

export const ok = (data) => {
    return {
        statusCode: 200,
        body:data
    };
}
