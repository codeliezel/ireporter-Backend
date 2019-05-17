// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import request from 'supertest';
// import App from '../app';

// const { expect } = chai;


// chai.use(chaiHttp);

// let token = process.env.JWT_TOKEN;

// describe("POST /api/v1/admin/login", () => {
//     it("should login a user", (done) => {
//      request(App)
//         .post('/api/v1/admin/login')
//         .set('Accept', 'application/json')
//         .set('authorization', token)
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
//          .post('/api/v1/admin/login')
//          .set('Accept', 'application/json')
//          .set('authorization', token)
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
//          .post('/api/v1/admin/login')
//          .set('Accept', 'application/json')
//          .set('authorization', token)
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
//          .post('/api/v1/admin/login')
//          .set('Accept', 'application/json')
//          .set('authorization', token)
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

//   describe('PUT /api/v1/status/:id', () => {
//   it('should update an incident', (done) => {
//     request(App)
//       .put('/api/v1/status/1')
//       .set('Accept', 'application/json')
//       .set('authorization', token)
//       .send ({
//                status: 'Approved',
//               })           
//       .end((err, res) => {
//       expect(res.body).to.be.an('object');
//       expect(res.status).to.be.equal(200);
//       expect(res).to.have.status('200');
//         done();
//       });
//   });
//   it('should return an error if status is not supplied', (done) => {
//     request(App)
//       .put('/api/v1/status/1')
//       .set('Accept', 'application/json')
//       .set('authorization', token)
//       .send ({
//                status: '',
//               })           
//       .end((err, res) => {
//       expect(res.body).to.be.an('object');
//       expect(res.status).to.be.equal(400);
//       expect(res).to.have.status('400');
//       expect(res.body).to.include.key('error')
//       expect(res.body).to.include.key('message')
//       expect(res.body.message).to.be.equal('Please, supply the status!')
//         done();
//       });
//   });
//   it('should return an error if token is not present', (done) => {
//         request(App)
//           .get('/api/v1/incidents')
//           .set('Accept', 'application/json')
//           .end((err, res) => {
//             expect(res.body).to.be.an('object');
//             expect(res.status).to.be.equal(400);
//             expect(res).to.have.status('400');
//             expect(res.body).to.include.keys('message');
//             expect(res.body.message).to.be.equal('Token is not provided');   
//             done();
//           });
//       });
// });

// describe('GET /api/v1/users', () => {
//   it('should get all users', (done) => {
//     request(App)
//       .get('/api/v1/users')
//       .set('Accept', 'application/json')
//       .set('authorization', token)
//       .end((err, res) => {
//       expect(res.body).to.be.an('object');
//       expect(res.status).to.be.equal(200);
//       expect(res).to.have.status('200');
//         done();
//       });
//   });
//   it('should return an error if token is not present', (done) => {
//     request(App)
//       .get('/api/v1/incidents')
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.be.equal(400);
//         expect(res).to.have.status('400');
//         expect(res.body).to.include.keys('message');
//         expect(res.body.message).to.be.equal('Token is not provided');
//         done();
//       });
//   });
// });


// describe('POST /api/v1/mail', () => {
//   it('should send a mail', (done) => {
//     request(App)
//       .post('/api/v1/mail')
//       .set('Accept', 'application/json')
//       .set('authorization', token)
//       .send ({
//           email : 'JohnMye@gmail.com',
//           msg: 'Your incident has been approved!',
//           name: 'Halimat Adeleke',
//           position: 'Head of Reports',
//           company: 'WACA Ireporter'
//       })
//       .end((err, res) => {
//       expect(res.body).to.be.an('object');
//       expect(res.status).to.be.equal(200);
//       expect(res).to.have.status('200');
//         done();
//       });
//   });
//   it('should return an error if details are not complete/provided', (done) => {
//     request(App)
//       .post('/api/v1/mail')
//       .set('Accept', 'application/json')
//       .set('authorization', token)
//       .send ({
//           email : '',
//           msg: '',
//           name: '',
//           position: '',
//           company: ''
//       })
//       .end((err, res) => {
//       expect(res.body).to.be.an('object');
//       expect(res.status).to.be.equal(400);
//       expect(res).to.have.status('400');
//       expect(res.body).to.include.key('error')
//       expect(res.body).to.include.key('message')
//       expect(res.body.message).to.be.equal('Please, supply all the required information')
//         done();
//       });
//   });
//   it('should return an error if token is not present', (done) => {
//     request(App)
//       .get('/api/v1/incidents')
//       .set('Accept', 'application/json')
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.be.equal(400);
//         expect(res).to.have.status('400');
//         expect(res.body).to.include.keys('message');
//         expect(res.body.message).to.be.equal('Token is not provided');
//         done();
//       });
//   });
// });


// describe('POST /api/v1/sms', () => {
//     it('should send a sms', (done) => {
//       request(App)
//         .post('/api/v1/sms')
//         .set('Accept', 'application/json')
//         .set('authorization', token)
//         .send ({
//             text: 'The message has been sent successfully',
//             number: '08038876545'
//         })
//         .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.be.equal(200);
//         expect(res).to.have.status('200');
//           done();
//         });
//     });
//     it('should return an error if details are not complete/provided', (done) => {
//       request(App)
//         .post('/api/v1/mail')
//         .set('Accept', 'application/json')
//         .set('authorization', token)
//         .send ({
//             text: '',
//             number: ''
//         })
//         .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.be.equal(400);
//         expect(res).to.have.status('400');
//         expect(res.body).to.include.key('error')
//         expect(res.body).to.include.key('message')
//         expect(res.body.message).to.be.equal('Please, supply all the required information')
//           done();
//         });
//     });
//     it('should return an error if token is not present', (done) => {
//       request(App)
//         .get('/api/v1/incidents')
//         .set('Accept', 'application/json')
//         .end((err, res) => {
//           expect(res.body).to.be.an('object');
//           expect(res.status).to.be.equal(400);
//           expect(res).to.have.status('400');
//           expect(res.body).to.include.keys('message');
//           expect(res.body.message).to.be.equal('Token is not provided');
//           done();
//         });
//     });
//   });