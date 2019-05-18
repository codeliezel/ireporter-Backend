import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import App from '../app';

const { expect } = chai;


chai.use(chaiHttp);

const token = process.env.JWT_TOKEN;

// tests for a user to create an account with error handling

describe('POST api/v1/users', () => {
  it('should return an error if the particular mail has already been registered', (done) => {
    request(App)
      .post('/api/v1/users')
      .set('Accept', 'application/json')
      .send({
        firstName: 'ade',
        lastName: 'johnson',
        otherNames: 'jane',
        email: 'jane@gmail.com',
        phoneNumber: '4447777733773',
        userName: 'ade-jane',
        isAdmin: 'false',
        password: 'janeade',
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
        password: '',
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

describe('POST api/v1/users/login', () => {
  it('should login a user', (done) => {
    request(App)
      .post('/api/v1/users/login')
      .set('Accept', 'application/json')
      .send({
        email: 'funmiayo@gmail.com',
        password: 'drosa',
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
        password: '',
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
  it('should return an error if the email address supplied by a user is not recognised', (done) => {
    request(App)
      .post('/api/v1/users/login')
      .set('Accept', 'application/json')
      .send({
        email: 'funmi0987@gmail.com',
        password: 'drosa',
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
  it('should return an error if the password supplied by a user is incorrect', (done) => {
    request(App)
      .post('/api/v1/users/login')
      .set('Accept', 'application/json')
      .send({
        email: 'funmiayo@gmail.com',
        password: 'drosp',
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
describe('POST api/v1/reset/:id', () => {
  it('should reset a password', (done) => {
    request(App)
      .put('/api/v1/reset/22')
      .set('Accept', 'application/json')
      .send({
        email: 'funmiayo@gmail.com',

        password: 'drosa',
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


describe('DELETE api/v1/users', () => {
  it('should send an error if the user is not found', (done) => {
    request(App)
      .delete('/api/v1/users/1001')
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
      .delete('/api/v1/users/3')
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
