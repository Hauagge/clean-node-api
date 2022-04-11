import MissingParamError from '../helpers/missing-param-error.js';
import LoginRouter from './login-router.js';




describe('Login Router',()=>{
  it('should return 400 if no email is provided',async()=>{

    const sut = new LoginRouter();
    const httpRequest = {
        body:{
            password: 'any_password'
        }
    }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));


  })

  it('should return 400 if no password is provided',async()=>{

    const sut = new LoginRouter();
    const httpRequest = {
        body:{
            email: 'any_email@email.com'
        }
    }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toEqual(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));


  })

  
  it('should return 500 if no httpRequest is provided',async()=>{

    const sut = new LoginRouter();
   
    const httpResponse = sut.route();
    expect(httpResponse.statusCode).toEqual(500);

  })

    
  it('should return 500 if  httpRequest  has no body',async()=>{

    const sut = new LoginRouter();
    const httpRequest = { }
    const httpResponse = sut.route(httpRequest);
    expect(httpResponse.statusCode).toEqual(500);

  })
  
})
