import ServerError from './server-error';
import UnauthorizedError from './unauthorizedError-param-error.js';
export const badRequest = (error) => {
    return {
        statusCode: 400,
        body: error

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
