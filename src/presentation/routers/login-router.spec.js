import MissingParamError from '../helpers/missing-param-error.js';
import ServerError from '../helpers/server-error';
import UnauthorizedError from '../helpers/unauthorizedError-param-error';
import LoginRouter from './login-router.js';




const makeSut = () => {
  const authUseCaseSpy =  makeAuthUseCase();
  authUseCaseSpy.accessToken = 'valid_token'
  const sut = new LoginRouter(authUseCaseSpy);
  return {
    sut, authUseCaseSpy
  }

}

const makeAuthUseCase = () => {
  class AuthUseCaseSpy {
    auth(email, password) {
     this.email = email;
     this.password = password;
     return this.accessToken;

   }
 }
  return new AuthUseCaseSpy()
}

const makeAuthUseCaseWithError = () => {
  class AuthUseCaseSpy{
    auth(){
      throw new Error();
    }
  }
  return new AuthUseCaseSpy()
}

describe('Login Router', () => {
  it('should return 400 if no email is provided', async () => {

    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));


  });

  it('should return 400 if no password is provided', async () => {

    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));


  });


  it('should return 500 if no httpRequest is provided', async () => {

    const { sut } = makeSut();

    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toEqual(500);
    expect(httpResponse.body).toEqual(new ServerError());


  });

  it('should return 500 if  httpRequest  has no body', async () => {

    const { sut } = makeSut();
    const httpRequest = {};
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toEqual(500);
    expect(httpResponse.body).toEqual(new ServerError());


  });

  it('should call use case with correct params', async () => {

    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    };
    sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  it('should return 401  when invalid credentials are provided', async () => {

    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.accessToken = null
    const httpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_password'
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError('UnauthorizedError'));

  });

  
  it('should return 200  when valid credentials are provided', async () => {

    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: 'valid_email@email.com',
        password: 'valid_password'
      }
    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken);

  });

  it('should return 500 if  not AuthUseCase  is provided', async () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    };

    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());


  });

  it('should return 500 if   AuthUseCase has no method', async () => {
    const sut = new LoginRouter({});
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }

    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());

  });


  
  it('should return 500 if   AuthUseCase throws', async () => {
   const authUseCaseSpy = makeAuthUseCaseWithError();
   authUseCaseSpy.accessToken = 'valid_token'
   const sut = new LoginRouter(authUseCaseSpy);
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }

    };
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());

  });

})
