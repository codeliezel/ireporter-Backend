import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import App from '../app';

const { expect } = chai;


chai.use(chaiHttp);

describe("POST /api/v1/users ", () => {
  // Test to get all users record
  it("should create a new user", (done) => {
    const account = {
      id: 98,
      firstName: 'funmi',
      lastName: 'olaiya',
      email: 'funmiolaiya@gmail.com',
      password: 'funmi',
    };
    request(App)
      .post('/api/v1/users')
      .send(account)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(201);
        done();
      });
  });
  it('should return an error if a user with email/phonenumber/username already exists', (done) => {
    const account = {
      id: 98,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    request(App)
      .post('/api/v1/users')
      .send(account)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(400);
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Please, supply all the information required!');
        done();
      });
  });
});
