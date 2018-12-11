import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import App from '../app';

const { expect } = chai;
chai.use(chaiHttp);


describe('GET /api/v1/red-flags', () => {
  it('should return funmi', (done) => {
    request(App)
      .get('/api/v1/red-flags')
      .end((err, res) => {
        console.log(res.body);
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

describe('GET /api/v1/red-flag/1', () => {
  it('should get one redflag record', (done) => {
    request(App)
      .get('/api/v1/red-flag/1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        done();
      });
  });
  it('should return an error if record is not found', (done) => {
    request(App)
      .get('/api/v1/red-flag/3')
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
      .get('/api/v1/intervention/1')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(200);
        expect(200);
        done();
      });
  });
  it('should return an error if record is not found', (done) => {
    request(App)
      .get('/api/v1/intervention/3')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.be.equal(404);
        done();
      });
  });
});

// describe('POST api/v1/redflag ', () => {
//   it('should be able to create a new redflag record', (done) => {
//     const redflag = {
//       createdOn: 'September 23, 2018',
//       createdBy: 'Funmi Olaiya',
//       email: 'funmi677@yahoo.com',
//       location: '6.77772272, 992999992',
//       images: ['image1', 'image2'],
//       videos: ['video1', 'video2'],
//       comment: 'A politician bribed me to keep quiet about his alleged embezzlement of three million dollars meant for building schools.',

//     };
//     request(App)
//       .post('/api/v1/redflags')
//       .send(redflag)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(201);
//         done();
//       });
//   });
// });


// describe('POST api/v1/intervention ', () => {
//   it('should be able to create a new intervention record', (done) => {
//     const intervention = {
//       id: 1,
//       createdOn: 'September 23, 2018',
//       createdBy: 'Funmi Olaiya',
//       email: 'funmi677@yahoo.com',
//       location: '6.77772272, 992999992',
//       images: ['image1', 'image2'],
//       videos: ['video1', 'video2'],
//       comment: 'A politician bribed me to keep quiet about his alleged embezzlement of three million dollars meant for building schools.',

//     };
//     request(App)
//       .post('/api/v1/interventions')
//       .send(intervention)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.body).to.have.property('status');
//         expect(res.body).to.have.property('message');
//         expect(res.body).to.have.property('data');
//         expect(201);
//         done();
//       });
//   });
// });

// describe('PATCH  /api/v1/red-flag/:id', () => {
//   it('should be able to edit a redflag record', (done) => {
//     const redflag = {
//       location: '788399, 3883882',
//       comment: 'A politician embezzled money',
//     };
//     request(App)
//       .post('/api/v1/red-flag/1')
//       .send(redflag)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(res.status).to.be.equal(200);
//         done();
//       });
//   });


//   describe('PATCH  /api/v1/intervention/:id', () => {
//     it('should be able to edit an intervention record', (done) => {
//       const intervention = {
//         location: '788399, 3883882',
//         comment: 'We need good roads',
//       };
//       request(App)
//         .post('/api/v1/intervention/1')
//         .send(intervention)
//         .end((err, res) => {
//           expect(res.body).to.be.an('object');
//           expect(200);
//           done();
//         });
//     });
//   });
// });


// describe('DELETE ', () => {
//   const redflag = {
//     id: 1,
//     createdOn: 'September 23, 2018',
//     createdBy: 'Funmi Olaiya',
//     email: 'funmi677@yahoo.com',
//     type: 'redflag',
//     location: '6.77772272, 992999992',
//     images: ['image1', 'image2'],
//     videos: ['video1', 'video2'],
//     comment: 'A politician bribed me to keep quiet about his alleged embezzlement of three million dollars meant for building schools.',
//   };


//   it('should delete a redflag record', (done) => {
//     request(App)
//       .delete('/api/v1/redflag/1')
//       .send(redflag)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(200);
//         done();
//       });
//   });

//   it('should return an error if it can not be deleted', (done) => {
//     chai.request(App)
//       .delete('/api/v1/redflag/1')
//       .send(redflag)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(404);
//         done();
//       });
//   });
// });

// describe('DELETE ', () => {
//   const intervention = {
//     id: 1,
//     createdOn: 'November 1 2015 ',
//     createdBY: 'Funmi Olaiya',
//     type: 'intervention',
//     location: '6.77772272,992999992',
//     images: ['image1', 'image2'],
//     videos: ['video1', 'video2'],
//     comment: 'We need good roads in Ibadan.',

//   };
//   it('should delete an intervention record', (done) => {
//     chai.request(App)
//       .delete('/api/v1/intervention/1')
//       .send(intervention)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(200);
//         done();
//       });
//   });

//   it('should return an error', (done) => {
//     chai.request(App)
//       .delete('/api/v1/intervention/1')
//       .send(intervention)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         expect(404);
//         done();
//       });
//   });
// });
