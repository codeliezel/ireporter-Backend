import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import App from '../app';
 servertests

import app from '../app';

 develop
const { expect } = chai;


chai.use(chaiHttp);

servertests
let token = process.env.JWT_TOKEN;
//tests for a user to create an account with error handling

 describe("POST api/v1/users", () => {
//   it("should create a new user", (done) => {
//         request(App)
//            .post('/api/v1/users')
//            .set('Accept', 'application/json')
//            .send({ 
//           firstName: 'ade',
//            lastName: 'johnson',
//            otherNames: 'jane',
//            email: 'jane@gmail.com',
//            phoneNumber: '4447777733773',
//            userName: 'ade-jane',
//            isAdmin: 'false',
//            password: 'janeade'
//           })  
//            .end((err, res) => {
//             expect(res.status).to.be.equal(201);
//             // expect(body.data[0]).to.haveOwnProperty('token');
//             // expect(res.body).to.include.key('data');
//             // expect(body.data[0]).to.haveOwnProperty('token');
//             // expect(res.body.data[0].message).to.equal('Registration Successful!');
//              done();
//        });
//     });

  it("should send an error if the user does not fill in one or more details", (done) => {
   request(App)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        firstName: '',
        lastName: '',
        otherNames: '',
        email: '',
        phoneNumber: '',
        userName: '',
        isAdmin: '',
        password: ''
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        done();
      });
  });

  it("should return an error if the particular mail has already been registered", (done) => {
    request(App)
       .post('/api/v1/users')
       .set('Accept', 'application/json')
       .send({ 
        firstName: 'funmi',
       lastName: 'olaiya',
       otherNames: 'hhhhehe',
       email: 'funmiolayy@gmail.com',
       phoneNumber: '0994499994',
       userName: 'eegirl',
       isAdmin: 'false',
       password: 'funmi'
       })  
       .end((err, res) => {
        expect(res.status).to.be.equal(409);
        expect(res).to.have.status('409');
        expect(res.body).to.include.key('data');
        expect(res.body.data[0]).to.include.key('message');
        expect(res.body.data[0].message).to.be.equal('OOPS! This particular email has already been registered.');
         done();
   });
});
it("should return an error if the email address supplied isn't valid", (done) => {
  request(App)
     .post('/api/v1/users')
     .set('Accept', 'application/json')
     .send({
       email: 'funmi0987@gmail.com',
       password: ''
     })
     .end((err, res) => {
       expect(res.status).to.be.equal(400);
       expect(res).to.have.status('400');
       expect(res.body).to.include.key('error');
       expect(res.body).to.include.key('message');
       done();
     });
 });
  });

// tests for a user to log in and error handling

  describe("POST api/v1/users/login", () => {
    it("should login a user", (done) => {
     request(App)
        .post('/api/v1/users/login')
        .set('Accept', 'application/json')
        .send({
          email: 'funmiayo@gmail.com',
          password: 'drosa'
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          expect(res.body).to.include.key('data');
          expect(res.body.data[0]).to.include.key('message');
          expect(res.body.data[0]).to.include.key('token');
          expect(res.body.data[0].message).to.be.equal('You have logged in successfully');
          done();
        });
    });
    it("should return an error if all the information required to login isn't supplied", (done) => {
      request(App)
         .post('/api/v1/users/login')
         .set('Accept', 'application/json')
         .send({
           email: '',
           password: ''
         })
         .end((err, res) => {
           expect(res.status).to.be.equal(400);
           expect(res).to.have.status('400');
           expect(res.body).to.include.key('error');
           expect(res.body).to.include.key('message');
           expect(res.body.message).to.be.equal('Please, supply all the information required!');
           done();
         });
     });
     it("should return an error if the email address supplied by a user is not recognised", (done) => {
      request(App)
         .post('/api/v1/users/login')
         .set('Accept', 'application/json')
         .send({
           email: 'funmi0987@gmail.com',
           password: 'drosa'
         })
         .end((err, res) => {
           expect(res.status).to.be.equal(404);
           expect(res).to.have.status('404');
           expect(res.body).to.include.key('error');
           expect(res.body).to.include.key('message');
           expect(res.body.message).to.be.equal('Wrong email or password!');
           done();
         });
     });
     it("should return an error if the password supplied by a user is incorrect", (done) => {
      request(App)
         .post('/api/v1/users/login')
         .set('Accept', 'application/json')
         .send({
           email: 'funmiayo@gmail.com',
           password: 'drosp'
         })
         .end((err, res) => {
           expect(res.status).to.be.equal(404);
           expect(res).to.have.status('404');
           expect(res.body).to.include.key('error');
           expect(res.body).to.include.key('message');
           expect(res.body.message).to.be.equal('Wrong email or password!');
           done();
         });
     });
  });

  // tests for a user to reset password
  describe("POST api/v1/reset/:id", () => {
    it("should reset a password", (done) => {
     request(App)
        .put('/api/v1/reset/3')
        .set('Accept', 'application/json')
        .send({
          email: 'folujay@gmail.com',
          password: 'drosa'
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          expect(res.body).to.include.key('data');
          expect(res.body.data[0]).to.include.key('message');
          expect(res.body.data[0].message).to.be.equal('A new password has been set!');
          done();
        });
    });
  });

  describe("DELETE api/v1/users", () => {

    it("should send an error if the user is not found", (done) => {
     request(App)
        .delete('/api/v1/users/10001')
        .set('Accept', 'application/json')
        .set('authorization', token)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          expect(res.status).to.be.equal(404);
          expect(res.body).to.include.key('data');
          expect(res.body.data[0]).to.include.key('error');
          expect(res.body.data[0]).to.include.key('message');
          expect(res.body.data[0].message).to.be.equal('user not found');
          done();
        });
    });
    it('should return an error if token is not present', (done) => {
                          request(App)
                            .get('/api/v1/incidents')
                            .set('Accept', 'application/json')
                            .end((err, res) => {
                              expect(res.body).to.be.an('object');
                              expect(res.status).to.be.equal(400);
                              expect(res).to.have.status('400');
                              expect(res.body).to.include.keys('message');
                              expect(res.body.message).to.be.equal('Token is not provided');   
                              done();
                            });
                        });
  });

//tests for a user to create an account with error handling

//  describe("POST api/v1/users", () => {
  // it("should create a new user", () => {
  //       request(App)
  //          .post('/api/v1/users')
  //          .set('Accept', 'application/json')
  //          .send({ 
  //         firstName: 'dorothy',
  //          lastName: 'perkins',
  //          otherNames: 'rosa',
  //          email: 'funmiayo@gmail.com',
  //          phoneNumber: '4447777733773',
  //          userName: 'd-girl',
  //          isAdmin: 'false',
  //          password: 'drosa'
  //         })  
  //          .end((err, res) => {
  //           expect(res.status).to.be.equal(201);
  //           // expect(body.data[0]).to.haveOwnProperty('token');
  //           // expect(res.body).to.include.key('data');
  //           // expect(body.data[0]).to.haveOwnProperty('token');
  //           // expect(res.body.data[0].message).to.equal('Registration Successful!');
  //            done();
  //      });
  //   });

//   it("should send an error if the user does not fill in one or more details", (done) => {
//    request(App)
//       .post('/api/v1/users')
//       .set('Accept', 'application/json')
//       .send({
//         firstName: '',
//         lastName: '',
//         otherNames: '',
//         email: '',
//         phoneNumber: '',
//         userName: '',
//         isAdmin: '',
//         password: ''
//       })
//       .end((err, res) => {
//         expect(res.status).to.be.equal(400);
//         expect(res).to.have.status('400');
//         done();
//       });
//   });

//   it("should return an error if the particular mail has already been registered", (done) => {
//     request(App)
//        .post('/api/v1/users')
//        .set('Accept', 'application/json')
//        .send({ 
//         firstName: 'funmi',
//        lastName: 'olaiya',
//        otherNames: 'hhhhehe',
//        email: 'funmiolayy@gmail.com',
//        phoneNumber: '0994499994',
//        userName: 'eegirl',
//        isAdmin: 'false',
//        password: 'funmi'
//        })  
//        .end((err, res) => {
//         expect(res.status).to.be.equal(409);
//         expect(res).to.have.status('409');
//         expect(res.body).to.include.key('data');
//         expect(res.body.data[0]).to.include.key('message');
//         expect(res.body.data[0].message).to.be.equal('OOPS! This particular email has already been registered.');
//          done();
//    });
// });
// it("should return an error if the email address supplied isn't valid", (done) => {
//   request(App)
//      .post('/api/v1/users')
//      .set('Accept', 'application/json')
//      .send({
//        email: 'funmi0987@gmail.com',
//        password: ''
//      })
//      .end((err, res) => {
//        expect(res.status).to.be.equal(400);
//        expect(res).to.have.status('400');
//        expect(res.body).to.include.key('error');
//        expect(res.body).to.include.key('message');
//        done();
//      });
//  });
//   });

// // tests for a user to log in and error handling

//   describe("POST api/v1/users/login", () => {
//     it("should login a user", (done) => {
//      request(App)
//         .post('/api/v1/users/login')
//         .set('Accept', 'application/json')
//         .send({
//           email: 'funmiayo@gmail.com',
//           password: 'drosa'
//         })
//         .end((err, res) => {
//           expect(res.status).to.be.equal(200);
//           expect(res).to.have.status('200');
//           expect(res.body).to.include.key('data');
//           expect(res.body.data[0]).to.include.key('message');
//           expect(res.body.data[0]).to.include.key('token');
//           expect(res.body.data[0].message).to.be.equal('You have logged in successfully');
//           done();
//         });
//     });
//     it("should return an error if all the information required to login isn't supplied", (done) => {
//       request(App)
//          .post('/api/v1/users/login')
//          .set('Accept', 'application/json')
//          .send({
//            email: '',
//            password: ''
//          })
//          .end((err, res) => {
//            expect(res.status).to.be.equal(400);
//            expect(res).to.have.status('400');
//            expect(res.body).to.include.key('error');
//            expect(res.body).to.include.key('message');
//            expect(res.body.message).to.be.equal('Please, supply all the information required!');
//            done();
//          });
//      });
//      it("should return an error if the email address supplied by a user is not recognised", (done) => {
//       request(App)
//          .post('/api/v1/users/login')
//          .set('Accept', 'application/json')
//          .send({
//            email: 'funmi0987@gmail.com',
//            password: 'drosa'
//          })
//          .end((err, res) => {
//            expect(res.status).to.be.equal(404);
//            expect(res).to.have.status('404');
//            expect(res.body).to.include.key('error');
//            expect(res.body).to.include.key('message');
//            expect(res.body.message).to.be.equal('Wrong email or password!');
//            done();
//          });
//      });
//      it("should return an error if the password supplied by a user is incorrect", (done) => {
//       request(App)
//          .post('/api/v1/users/login')
//          .set('Accept', 'application/json')
//          .send({
//            email: 'funmiayo@gmail.com',
//            password: 'drosp'
//          })
//          .end((err, res) => {
//            expect(res.status).to.be.equal(404);
//            expect(res).to.have.status('404');
//            expect(res.body).to.include.key('error');
//            expect(res.body).to.include.key('message');
//            expect(res.body.message).to.be.equal('Wrong email or password!');
//            done();
//          });
//      });
//   });

//   // tests for a user to reset password
//   describe("POST api/v1/reset/:id", () => {
//     it("should reset a password", (done) => {
//      request(App)
//         .put('/api/v1/reset/69')
//         .set('Accept', 'application/json')
//         .send({
//           email: 'kemell@gmail.com',
//           password: 'drosa'
//         })
//         .end((err, res) => {
//           expect(res.status).to.be.equal(200);
//           expect(res).to.have.status('200');
//           expect(res.body).to.include.key('data');
//           expect(res.body.data[0]).to.include.key('message');
//           expect(res.body.data[0].message).to.be.equal('A new password has been set!');
//           done();
//         });
//     });
//   });

//   describe("DELETE api/v1/users", () => {
//     it("should delete an account", (done) => {
//       let user =({
//         firstName: '',
//         lastName: '',
//         otherNames: '',
//         email: '',
//         phoneNumber: '',
//         userName: '',
//         isAdmin: '',
//         password: ''
//       });
//       request(App)
//          .delete('/users/' + user.id)
//          .set('Accept', 'application/json')        
//           .end((err, res) => {
//            expect(res.body).to.be.an('object');
//            expect(res.status).to.be.equal(204);
//           // expect(res.body).to.include.key('data');
//           // expect(body.data[0]).to.haveOwnProperty('token');
//           // expect(res.body.data[0].message).to.equal('Registration Successful!');
//            done();
//          });
//      });
    

//     it("should send an error if the user is not found", (done) => {
//      request(App)
//         .delete('/api/v1/users/1')
//         .set('Accept', 'application/json')
//         .end((err, res) => {
//           expect(res.body).to.be.an('object');
//           expect(res.status).to.be.equal(404);
//           expect(res.body).to.include.key('data');
//           expect(res.body.data[0]).to.include.key('error');
//           expect(res.body.data[0]).to.include.key('message');
//           expect(res.body.data[0].message).to.be.equal('user not found');
//           done();
//         });
//     });
//   });

 develop
