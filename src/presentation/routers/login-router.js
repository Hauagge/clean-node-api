import { badRequest, serverError, unauthorizedError, ok } from '../helpers/http-reponse';

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
      const acessToken = this.authUseCase.auth(email, password)
      if (!acessToken) {
         return unauthorizedError()

      }

      return ok()
   }
}