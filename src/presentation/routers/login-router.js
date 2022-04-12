import { badRequest, ok, serverError, unauthorizedError } from '../helpers/http-reponse';
import InvalidParamError from '../helpers/invalid-param-erro';
import MissingParamError from '../helpers/missing-param-error';
export default class LoginRouter {
   constructor(authUseCase, emailValidator) {
      this.authUseCase = authUseCase;
      this.emailValidator = emailValidator;
   }
  async route(httpRequest) {
      try{ 
         const { email, password } = httpRequest.body;
         if (!email) {
         return badRequest(new MissingParamError('email'));
            }

         if(!this.emailValidator.isValid(email)){
         return badRequest(new InvalidParamError('email'));

         }
         if (!password) {
            return badRequest(new MissingParamError('password'));
         }
         const accessToken = await this.authUseCase.auth(email, password)
         if (!accessToken) {
            return unauthorizedError()
         }
         return ok({accessToken})
      }catch(error){
            return serverError();
         }
     
   }
}