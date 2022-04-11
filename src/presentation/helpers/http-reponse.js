import MissingParamError from './missing-param-error.js';


    export const badRequest=(paramName)=>{
        return {
            statusCode: 400,
            body:new MissingParamError(paramName)

        };
    }

    export const serverError=()=>{
        return {
            statusCode: 500,
        };
    }

