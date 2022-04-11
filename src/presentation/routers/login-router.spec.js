class LoginRouter{
    route(httpRequest){
        if(!httpRequest.body.email || !httpRequest.body.password){
            return {
                statusCode: 400,
            };
        }
    }
}

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

  })
  
})
