import MissingParamError from '../helpers/missing-param-error.js';
import UnauthorizedError from '../helpers/unauthorizedError-param-error';

import LoginRouter from './login-router.js';


const makeSut = () => {
  class AuthUseCaseSpy {
    auth(email, password) {
      this.email = email
      this.password = password
      return this.acessToken

    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
  authUseCaseSpy.acessToken = 'valid_token'
  return {
    sut, authUseCaseSpy
  }

}

describe('Login Router', () => {
  it('should return 400 if no email is provided', async () => {

    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
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
    }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));


  });


  it('should return 500 if no httpRequest is provided', async () => {

    const { sut } = makeSut();

    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toEqual(500);

  });


  it('should return 500 if  httpRequest  has no body', async () => {

    const { sut } = makeSut();
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toEqual(500);

  });

  it('should call use case with correct params', async () => {

    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }
    }
    sut.route(httpRequest);
    expect(authUseCaseSpy.email).toBe(httpRequest.body.email);
    expect(authUseCaseSpy.password).toBe(httpRequest.body.password);
  });

  it('should return 401  when invalid credentials are provided', async () => {

    const { sut, authUseCaseSpy } = makeSut();
    authUseCaseSpy.acessToken = null
    const httpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError('UnauthorizedError'));

  });

  it('should return 500 if  not AuthUseCase  is provided', async () => {
    const sut = new LoginRouter();
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }

    }

    const hrrpResposne = sut.route(httpRequest);
    expect(hrrpResposne.statusCode).toBe(500);

  });

  it('should return 500 if   AuthUseCase has no method', async () => {
    const sut = new LoginRouter({});
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password'
      }

    }
    const hrrpResposne = sut.route(httpRequest);
    expect(hrrpResposne.statusCode).toBe(500);
  });

  it('should return 200  when valid credentials are provided', async () => {

    const { sut, authUseCaseSpy } = makeSut();
    const httpRequest = {
      body: {
        email: 'valid_email@email.com',
        password: 'valid_password'
      }
    }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(200);

  });

})
