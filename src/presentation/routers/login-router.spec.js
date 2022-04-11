import MissingParamError from '../helpers/missing-param-error.js';
import UnauthorizedError from '../helpers/unauthorizedError-param-error';

import LoginRouter from './login-router.js';


const makeSut = () => {
  class AuthUseCaseSpy {
    auth(email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy)
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


  })

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


  })


  it('should return 500 if no httpRequest is provided', async () => {

    const { sut } = makeSut();

    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toEqual(500);

  })


  it('should return 500 if  httpRequest  has no body', async () => {

    const { sut } = makeSut();
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toEqual(500);

  })
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
  })

  it('should return 401  when invalid credentials are provided', async () => {

    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_password'
      }
    }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toBe(401);
    expect(httpResponse.body).toEqual(new UnauthorizedError('UnauthorizedError'));

  })

})
