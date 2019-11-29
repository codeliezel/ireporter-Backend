import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import App from '../app';
import Records from '../controllers/record';

const {
  createIncident, updateAnIncident, getOneIncident, getAllIncidents, deleteAnIncident,
} = Records;

const { expect } = chai;
chai.use(chaiHttp);
chai.use(sinonChai);
chai.use(chaiHttp);

const signin = {
  email: 'janee@gmail.com',
  password: 'janeade',
};

const signin1 = {
  email: 'jan@gmail.com',
  password: 'janeade',
};

const signin2 = {
  email: 'janefox@gmail.com',
  password: 'janefox',
};
let request;
describe('Test for the property Endpoints', () => {
  before(async () => {
    request = chai.request(App).keepOpen();
  });

  afterEach(() => sinon.restore());

  after(() => request.close());

  describe('POST api/v1/incident', () => {
    it('should add a new incident', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN;
          chai.request(App)
            .post('/api/v1/incident')
            .set('Authorization', token)
            .send({
              type: 'intervention',
              location: 'ff55667,6667',
              status: 'in-review',
              title: 'They stole my book',
              comment: 'Political thugs visited me on a fateful sunday',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(201);
              expect(res).to.have.status('201');
              done();
            });
        });
    });
    it('should return an error is token is not provided', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN;
          chai.request(App)
            .post('/api/v1/incident')
            .send({
              type: 'intervention',
              location: 'ff55667,6667',
              status: 'in-review',
              title: 'They stole my book',
              comment: 'Political thugs visited me on a fateful sunday',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(400);
              expect(res).to.have.status('400');
              done();
            });
        });
    });
    it('should return an error if the account is deactivated', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin2)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN2;
          chai.request(App)
            .post('/api/v1/incident')
            .set('Authorization', token)
            .send({
              type: 'intervention',
              location: 'ff55667,6667',
              status: 'in-review',
              title: 'They stole my book',
              comment: 'Political thugs visited me on a fateful sunday',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(400);
              expect(res).to.have.status('400');
              done();
            });
        });
    });
    it('should return an error if one of the fields isnt supplied', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN;
          chai.request(App)
            .post('/api/v1/incident')
            .set('Authorization', token)
            .send({
              type: 'intervention',
              location: 'ff55667,6667',
              status: 'in-review',
              title: 'They stole my book',
              comment: '',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(400);
              expect(res).to.have.status('400');
              done();
            });
        });
    });
    it('should return an access denied error', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN;
          chai.request(App)
            .patch('/api/v1/user/deactivate/1')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(422);
              expect(res).to.have.status('422');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {};
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await createIncident(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('UPDATE api/v1/updateincident/:id', () => {
    it('should update an incident', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN;
          chai.request(App)
            .patch('/api/v1/updateincident/9')
            .set('Authorization', token)
            .send({
              type: 'intervention',
              location: 'ff55667,6667',
              status: 'in-review',
              title: 'They stole my book',
              comment: 'Political thugs visited me on a fateful saturday',
            })
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {};
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await updateAnIncident(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });


  describe('GET api/v1/anincident/:id', () => {
    it('should get an incident', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN;
          chai.request(App)
            .get('/api/v1/anincident/9')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });
    it('should return an error when getting an incident', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin1)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN1;
          chai.request(App)
            .get('/api/v1/anincident/10000')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(404);
              expect(res).to.have.status('404');
              done();
            });
        });
    });
    it('should return an error if access denied when getting incident', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN1;
          chai.request(App)
            .get('/api/v1/anincident/1')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(422);
              expect(res).to.have.status('422');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {};
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await getOneIncident(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });


  describe('GET api/v1/allincidents', () => {
    it('should get all incidents', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN;
          chai.request(App)
            .get('/api/v1/allincidents')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(200);
              expect(res).to.have.status('200');
              done();
            });
        });
    });
    it('should return an error if there are no incidents', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin1)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN1;
          chai.request(App)
            .get('/api/v1/allincidents')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(404);
              expect(res).to.have.status('404');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {};
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await getAllIncidents(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });

  describe('DELETE api/v1/deleteincident/:id', () => {
    it('should delete an incident', (done) => {
      chai.request(App)
        .post('/api/v1/user/login')
        .set('Accept', 'application/json')
        .send(signin)
        .end((logError, logResponse) => {
          const token = process.env.JWT_TOKEN;
          chai.request(App)
            .get('/api/v1/deleteincident/1000000000')
            .set('Authorization', token)
            .end((err, res) => {
              expect(res.status).to.be.equal(404);
              expect(res).to.have.status('404');
              done();
            });
        });
    });
    it('should return a server error', async () => {
      const req = {};
      const res = {
        status: () => {},
        json: () => {},
      };
      sinon.stub(res, 'status').returnsThis();

      await deleteAnIncident(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
