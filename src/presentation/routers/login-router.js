import { badRequest, serverError } from '../helpers/http-reponse';

export default class LoginRouter{
    route(httpRequest){
        if (!httpRequest || !httpRequest.body) {
           return serverError();
              
        }
        const {email, password} = httpRequest.body;
        if(!email ){
           return badRequest('email');
        }
        if(!password){
            return badRequest('password');
         }
    }
}