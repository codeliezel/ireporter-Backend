import users_table from '../db/users_table';

import redflags_table from '../db/redflags_table';

import interventions_table from '../db/interventions_table';

class Admincontroller {
// admin should get all users
  getAllUsers(req, res) {
    res.status(200).send({
      status: '200',
      user: users_table,
    });
  }


  // admin should get all redflag records
  getAllRedflags(req, res) {
    res.status(200).send({
      status: '200',
      redflag: redflags_table,

    });
  }

  // admin should get all intervention records
  getAllInterventions(req, res) {
    res.status(200).send({
      status: '200',
      intervention: interventions_table,
    });
  }

  // admin should be able to get a single redflag record
  getRedflag(req, res) {
    const id = parseInt(req.params.id, 10);
    redflags_table.map((redflag) => {
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


  // admin should be able to get a single intervention record
  getIntervention(req, res) {
    const id = parseInt(req.params.id, 10);
    interventions_table.map((intervention) => {
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

  // admin should change the status of any redflag record
  updateRedflag(req, res) {
    const id = parseInt(req.params.id, 10);
    let recordFound;
    let itemIndex;
    redflags_table.map((record, index) => {
      if (record.id === id) {
        recordFound = record;
        itemIndex = index;
      }
    });
    if (!recordFound) {
      res.status(404).send({
        error: '404',
        message: 'record not found',
      });
    } if (!req.body.status) {
      res.status(404).send({
        error: '400',
        message: 'Bad request',
      });
    }
    const updateRedflagStatus = {
      id: recordFound.id,
      status: req.body.status || recordFound.status,
    };
    redflags_table.splice(itemIndex, 1, updateRedflagStatus);
    res.status(201).send({
      status: '201',
      updateRedflagStatus,
    });
  }


  // admin should change the status of any intervention record
  updateIntervention(req, res) {
    const id = parseInt(req.params.id, 10);
    let recordFound;
    let itemIndex;
    interventions_table.map((record, index) => {
      if (record.id === id) {
        recordFound = record;
        itemIndex = index;
      }
    });

    if (!recordFound) {
      return res.status(404).send({
        error: '404',
        message: 'record not found',
      });
    } if (!req.body.status) {
      return res.status(404).send({
        error: '400',
        message: 'Bad request',
      });
    }

    const updateIntervention = {
      id: recordFound.id,
      status: req.body.status || recordFound.status,
    };

    interventions_table.splice(itemIndex, 1, updateIntervention);

    return res.status(201).send({
      status: '201',
      updateIntervention,
    });
  }
}

const adminController = new Admincontroller();
export default adminController;
