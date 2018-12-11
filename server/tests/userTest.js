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
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(' Account created successfully');
        expect(res.body.status).to.equal('201');

        done();
      });
  });
});
