import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import App from '../app';
import Users from '../controllers/user';

const {
  createAccount, login, deactivateAccount, reactivateAccount,
} = Users;

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);
chai.use(chaiHttp);

const signin = {
  email: 'janee@gmail.com',
  password: 'janeade',
};

let request;
describe('Test for the flag-property Endpoint', () => {
  before(async () => {
    request = chai.request(App).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  describe('POST api/v1/user', () => {
    it('should return a successful message on sign up', (done) => {
      chai
        .request(App)
        .post('/api/v1/user')
        .set('Accept', 'application/json')
        .send({
          firstName: 'jane',
          lastName: 'somori',
          otherNames: 'sheryl',
          email: faker.internet.email(),
          phoneNumber: faker.random.number(),
          userName: faker.name.findName(),
          password: 'janeade',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          expect(res).to.have.status('201');
          expect(res.body).to.include.key('data');
          expect(res.body).to.include.key('status');
          expect(res.body).to.include.key('message');
          done();
        });
    });
    it('should return a server error', async () => {
      const req = {};
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await createAccount(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('POST api/v1/user/login', () => {
    it('should login a user', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send({
          email: 'janee@gmail.com',
          password: 'janeade',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res).to.have.status('200');
          expect(res.body).to.include.key('data');
          done();
        });
    });
    it('should return a server error', async () => {
      const req = {
      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await login(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('POST api/v1/user/deactivate', () => {
    it('should de-activate a user', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN;
          chai.request(App)
            .patch('/api/v1/user/deactivate/2')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {

      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await deactivateAccount(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('POST api/v1/user/reactivate', () => {
    it('should re-activate a user', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN;
          chai.request(App)
            .patch('/api/v1/user/reactivate/2')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {

      };
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await reactivateAccount(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
