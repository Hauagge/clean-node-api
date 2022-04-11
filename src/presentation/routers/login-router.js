import { badRequest, serverError, unauthorizedError } from '../helpers/http-reponse';

export default class LoginRouter {
   constructor(authUseCase) {
      this.authUseCase = authUseCase;
   }
   route(httpRequest) {
      if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
         return serverError();

      }
      const { email, password } = httpRequest.body;
      if (!email) {
         return badRequest('email');
      }
      if (!password) {
         return badRequest('password');
      }
      this.authUseCase.auth(email, password)
      return unauthorizedError()
   }
}