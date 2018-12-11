import redflags from '../db/redflagsTable';

import interventions from '../db/interventionsTable';

class Recordcontroller {
  static getAllRedflags(req, res) {
    return res.status(200)
      .json({
        status: '200',
        data: redflags,
      });
  }


  static getAllInterventions(req, res) {
    return res.status(200)
      .json({
        status: '200',
        data: interventions,
      });
  }


  static getRedflag(req, res) {
    const id = parseInt(req.params.id, 10);
    const redflag = redflags.find(item => (item.id === id));

    if (redflag) {
      return res.status(200)
        .json({
          status: '200',
          data: redflag,
        });
    }

    return res.status(404)
      .json({
        error: '404',
        message: 'Record not found',
      });
  }


  static getIntervention(req, res) {
    const id = parseInt(req.params.id, 10);
    const intervention = interventions.find(item => (item.id === id));
    if (intervention) {
      return res.status(200)
        .json({
          status: '200',
          data: intervention,
        });
    }

    return res.status(404)
      .json({
        error: '404',
        message: 'Record not found',
      });
  }


  static editRedflagRecord(req, res) {
    const id = parseInt(req.params.id, 10);
    let recordFound;
    let itemIndex;
    redflags.find((record, index) => {
      if (record.id === id) {
        recordFound = record;
        itemIndex = index;
      }
    });


    const editRedflagRecord = {
      id: recordFound.id,
      location: req.body.location || recordFound.location,
      comment: req.body.comment || recordFound.comment,
    };

    redflags.splice(itemIndex, 1, editRedflagRecord);

    return res.status(200)
      .json({
        status: '200',
        data: editRedflagRecord,
      });
  }


  static editInterventionRecord(req, res) {
    const id = parseInt(req.params.id, 10);
    let recordFound;
    let itemIndex;
    interventions.find((record, index) => {
      if (record.id === id) {
        recordFound = record;
        itemIndex = index;
      }
    });


    const editInterventionRecord = {
      id: recordFound.id,
      location: req.body.location || recordFound.location,
      comment: req.body.comment || recordFound.comment,
    };

    interventions.splice(itemIndex, 1, editInterventionRecord);

    return res.status(200)
      .json({
        status: '200',
        data: editInterventionRecord,
      });
  }


  static deleteRedflagRecord(req, res) {
    const id = parseInt(req.params.id, 10);

    redflags.find((record, index) => {
      if (record.id === id) {
        redflags.splice(index, 1);
        return res.status(200)
          .json({
            status: '200',
            message: 'record deleted successfully',
          });
      }
    });
    return res.status(404)
      .json({
        error: '404',
        message: 'record not found',
      });
  }


  static deleteInterventionRecord(req, res) {
    const id = parseInt(req.params.id, 10);

    interventions.find((record, index) => {
      if (record.id === id) {
        interventions.splice(index, 1);
        return res.status(200)
          .json({
            status: '200',
            message: 'record deleted successfully',
          });
      }
    });
    return res.status(404)
      .json({
        error: '404',
        message: 'record not found',
      });
  }


  static createRedflagRecord(req, res) {
    const redflagRecord = {
      id: redflags.length + 1,
      createdOn: req.body.createdOn,
      createdBy: req.body.createdBy,
      email: req.body.email,
      location: req.body.location,
      comment: req.body.comment,
    };
    redflags.push(redflagRecord);
    return res.status(201)
      .json({
        status: '201',
        message: 'Redflag record created successfully',
        data: redflagRecord,
      });
  }

  // create an intervention record
  static createInterventionRecord(req, res) {
    const interventionRecord = {
      id: interventions.length + 1,
      createdOn: req.body.createdOn,
      createdBy: req.body.createdBy,
      email: req.body.email,
      location: req.body.location,
      comment: req.body.comment,
    };
    interventions.push(interventionRecord);
    return res.status(201)
      .json({
        status: '201',
        message: 'Intervention record created successfully',
        data: interventionRecord,
      });
  }
}


export default Recordcontroller;
