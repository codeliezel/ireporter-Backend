import redflagsTable from '../db/redflagsTable';

import interventionsTable from '../db/interventionsTable';

class Recordcontroller {
  static getAllRedflags(req, res) {
    res.status(200).send({
      status: '200',
      redflag: redflagsTable,

    });
  }


  static getAllInterventions(req, res) {
    res.status(200).send({
      status: '200',
      intervention: interventionsTable,
    });
  }


  static getRedflag(req, res) {
    const id = Number(req.params.id);
    redflagsTable.find((redflag) => {
      if (redflag.id === id) {
        res.status(200).send({
          status: '200',
          redflag,
        });
      }
    });
    return res.status(404).send({
      error: '404',
      message: 'Record not found',
    });
  }


  static getIntervention(req, res) {
    const id = Number(req.params.id);
    interventionsTable.find((intervention) => {
      if (intervention.id === id) {
        res.status(200).send({
          status: '200',
          intervention,
        });
      }
    });
    return res.status(404).send({
      error: '404',
      message: 'Record not found',
    });
  }


  static editRedflagRecord(req, res) {
    const id = Number(req.params.id);
    let recordFound;
    let itemIndex;
    redflagsTable.find((record, index) => {
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

    redflagsTable.splice(itemIndex, 1, editRedflagRecord);

    return res.status(200).send({
      status: '200',
      editRedflagRecord,
    });
  }


  static editInterventionRecord(req, res) {
    const id = Number(req.params.id);
    let recordFound;
    let itemIndex;
    interventionsTable.find((record, index) => {
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

    interventionsTable.splice(itemIndex, 1, editInterventionRecord);

    return res.status(200).send({
      status: '200',
      editInterventionRecord,
    });
  }


  static deleteRedflagRecord(req, res) {
    const id = Number(req.params.id);

    redflagsTable.find((record, index) => {
      if (record.id === id) {
        redflagsTable.splice(index, 1);
        return res.status(200).send({
          status: '200',
          message: 'record deleted successfuly',
        });
      }
    });
    return res.status(404).send({
      error: '404',
      message: 'record not found',
    });
  }


  static deleteInterventionRecord(req, res) {
    const id = Number(req.params.id);

    interventionsTable.find((record, index) => {
      if (record.id === id) {
        interventionsTable.splice(index, 1);
        return res.status(200).send({
          status: '200',
          message: 'record deleted successfuly',
        });
      }
    });
    return res.status(404).send({
      error: '404',
      message: 'record not found',
    });
  }


  static createRedflagRecord(req, res) {
    const redflagRecord = {
      id: redflagsTable.length + 1,
      createdOn: req.body.createdOn,
      createdBy: req.body.createdBy,
      email: req.body.email,
      type: req.body.type,
      location: req.body.location,
      comment: req.body.comment,
    };
    redflagsTable.push(redflagRecord);
    return res.status(201).send({
      status: '201',
      message: 'Redflag record created successfully',
      redflagRecord,
    });
  }

  // create an intervention record
  static createInterventionRecord(req, res) {
    const interventionRecord = {
      id: interventionsTable.length + 1,
      createdOn: req.body.createdOn,
      createdBy: req.body.createdBy,
      email: req.body.email,
      type: req.body.type,
      location: req.body.location,
      comment: req.body.comment,
    };
    interventionsTable.push(interventionRecord);
    return res.status(201).send({
      status: '201',
      message: 'Intervention record created successfully',
      interventionRecord,
    });
  }
}


export default Recordcontroller;
