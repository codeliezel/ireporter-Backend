import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import App from '../app';

const { expect } = chai;
chai.use(chaiHttp);


const token = process.env.JWT_TOKEN;
// get all incidents
describe('GET /api/v1/incidents', () => {
  it('should get all incidents', (done) => {
    request(App)
      .get('/api/v1/incidents')
      .set('Accept', 'application/json')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
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


// get one incident
describe('GET /api/v1/incidents/:id', () => {
  it('should get an incident', (done) => {
    request(App)
      .get('/api/v1/incidents/1')
      .set('Accept', 'application/json')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        done();
      });
  });
  it('should return an error if incident is not found', (done) => {
    request(App)
      .get('/api/v1/incidents/976')
      .set('Accept', 'application/json')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.keys('error');
        expect(res.body).to.include.keys('message');
        expect(res.body.message).to.be.equal('Incident not found');
        done();
      });
  });
  it('should return an error if token is not present', (done) => {
    request(App)
      .get('/api/v1/incidents/1')
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

// create an incident

describe('POST /api/v1/incidents', () => {
  it('should create an incident', (done) => {
    request(App)
      .post('/api/v1/incidents')
      .set('Accept', 'application/json')
      .set('authorization', token)
      .send({
        createdOn: '',
        createdBy: ' Folu Ola',
        type: 'red-flag',
        location: '333333387,9999993993',
        status: 'under investigation',
        title: 'A log of wood over the bridge',
        comment: ' A log of wood fell over the bridge and killed millions of people',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body.data[0]).to.include.key('message');
        expect(res.body.data[0]).to.include.key('token');
        expect(res.body).to.include.key('data');
        expect(res.body.data[0].message).to.equal('Incident created successfully!');
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

describe('PATCH /api/v1/incidents/:id', () => {
  it('should update an incident', (done) => {
    request(App)
      .patch('/api/v1/incidents/1')
      .set('Accept', 'application/json')
      .set('authorization', token)
      .send({
        location: '99999,99999999',
        title: 'A log of wood over the bridge',
        comment: ' A log of wood fell over the bridge and killed millions of people',
      })
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
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

describe('DELETE api/v1/incidents/:id', () => {
  it('should send an error if the incident is not found', (done) => {
    request(App)
      .delete('/api/v1/incidents/1001')
      .set('Accept', 'application/json')
      .set('authorization', token)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(404);
        expect(res.body).to.include.key('error');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Incident not found');
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
