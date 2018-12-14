import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import App from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /api/v1/red-flags', () => {
  it('should return all red-flag records', (done) => {
    request(App)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});

describe("GET /api/v1/interventions", () => {
  it("should get all intervention records", (done) => {
    request(App)
      .get('/api/v1/interventions')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        done();
      });
  });
});


describe('GET /api/v1/red-flags/1', () => {
  it('should get one redflag record', (done) => {
    request(App)
      .get('/api/v1/red-flags/1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        done();
      });
  });
  it('should return an error if record is not found', (done) => {
    request(App)
      .get('/api/v1/red-flags/3')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(404);
        done();
      });
  });
});


describe('GET /api/v1/interventions/1', () => {
  it('should get one intervention record', (done) => {
    request(App)
      .get('/api/v1/interventions/1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        expect(200);
        done();
      });
  });
  it('should return an error if record is not found', (done) => {
    request(App)
      .get('/api/v1/interventions/3')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(404);
        done();
      });
  });
});


describe('POST api/v1/red-flags ', () => {
  it('should be able to create a new redflag record', (done) => {
    const redflag = {
      createdOn: 'September 23, 2018',
      createdBy: 'Funmi Olaiya',
      email: 'funmi677@yahoo.com',
      location: '6.77772272, 992999992',
      images: ['image1', 'image2'],
      videos: ['video1', 'video2'],
      comment: 'A politician bribed me to keep quiet about his alleged embezzlement of three million dollars meant for building schools.',

    };
    request(App)
      .post('/api/v1/red-flags')
      .send(redflag)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(201);
        done();
      });
  });
  it('should return an error if a user with email/phonenumber/username already exists', (done) => {
    const redflag = {
      createdOn: '',
      createdBy: '',
      email: '',
      location: '',
      images: ['', ''],
      videos: ['', ''],
      comment: '',

    };
    request(App)
      .post('/api/v1/red-flags')
      .send(redflag)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(400);
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Please, supply all the information required!');
        done();
      });
  });
});


describe('POST api/v1/interventions', () => {
  it('should be able to create a new intervention record', (done) => {
    const intervention = {
      createdOn: 'September 23, 2018',
      createdBy: 'Funmi Olaiya',
      email: 'funmi677@yahoo.com',
      location: '6.77772272, 992999992',
      images: ['image1', 'image2'],
      videos: ['video1', 'video2'],
      comment: 'A politician bribed me to keep quiet about his alleged embezzlement of three million dollars meant for building schools.',
    };
    request(App)
      .post('/api/v1/interventions')
      .send(intervention)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(201);
        done();
      });
  });
  it('should return an error if a user with email/phonenumber/username already exists', (done) => {
    const intervention = {
      createdOn: '',
      createdBy: '',
      email: '',
      location: '',
      images: ['', ''],
      videos: ['', ''],
      comment: '',

    };
    request(App)
      .post('/api/v1/interventions')
      .send(intervention)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(400);
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Please, supply all the information required!');
        done();
      });
  });
});

describe('PATCH  /api/v1/red-flags/1', () => {
  it('should be able to edit a redflag record', (done) => {
    const redflag = {
      location: '788399, 3883882',
      comment: 'A politician embezzled money',
    };
    request(App)
      .patch('/api/v1/red-flags/1')
      .send(redflag)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it('should return an error if record is not found', (done) => {
    request(App)
      .get('/api/v1/red-flags/3')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(404);
        done();
      });
  });
  it('should return an error if all information is not supplied', (done) => {
    const redflag = {
      location: '',
      comment: '',
    };
    request(App)
      .patch('/api/v1/red-flags/1')
      .send(redflag)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(400);
        done();
      });
  });
});


describe('PATCH  /api/v1/interventions/1', () => {
  it('should be able to edit an intervention record', (done) => {
    const intervention = {
      location: '788399, 3883882',
      comment: 'We need good roads',
    };
    request(App)
      .patch('/api/v1/interventions/1')
      .send(intervention)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        done();
      });
  });
  it('should return an error if record is not found', (done) => {
    request(App)
      .get('/api/v1/interventions/5')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(404);
        done();
      });
  });
  it('should return an error if all information is not supplied', (done) => {
    const intervention = {
      location: '',
      comment: '',
    };
    request(App)
      .patch('/api/v1/interventions/1')
      .send(intervention)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(400);
        done();
      });
  });
});


describe('DELETE ', () => {
  const redflag = {
    createdOn: 'September 23, 2018',
    createdBy: 'Funmi Olaiya',
    email: 'funmi677@yahoo.com',
    type: 'redflag',
    location: '6.77772272, 992999992',
    images: ['image1', 'image2'],
    videos: ['video1', 'video2'],
    comment: 'A politician bribed me to keep quiet about his alleged embezzlement of three million dollars meant for building schools.',
  };


  it('should delete a redflag record', (done) => {
    request(App)
      .delete('/api/v1/red-flags/1')
      .send(redflag)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it('should return an error if it can not be deleted', (done) => {
    chai.request(App)
      .delete('/api/v1/red-flags/1')
      .send(redflag)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(404);
        done();
      });
  });
});

describe('DELETE ', () => {
  const intervention = {
    createdOn: 'November 1 2015 ',
    createdBY: 'Funmi Olaiya',
    type: 'intervention',
    location: '6.77772272,992999992',
    images: ['image1', 'image2'],
    videos: ['video1', 'video2'],
    comment: 'We need good roads in Ibadan.',
  };
  it('should delete an intervention record', (done) => {
    chai.request(App)
      .delete('/api/v1/interventions/1')
      .send(intervention)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        done();
      });
  });

  it('should return an error', (done) => {
    chai.request(App)
      .delete('/api/v1/interventions/1')
      .send(intervention)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(404);
        done();
      });
  });
});
