import users_table from '../db/users_table';

import redflags_table from '../db/redflags_table';

import interventions_table from '../db/interventions_table';


class Usercontroller {
  // create an account
  createAccount(req, res) {
    if (!req.body.firstName) {
      res.status(400).send({
        error: '404',
        message: 'First name is required',
      });
    } if (!req.body.lastName) {
      res.status(400).send({
        error: '404',
        message: 'Last name is required',
      });
    } else if (!req.body.otherName) {
      res.status(400).send({
        error: '404',
        message: 'Other name is required',
      });
    } else if (!req.body.email) {
      res.status(400).send({
        error: '404',
        message: 'Email is required',
      });
    } else if (!req.body.phoneNumber) {
      res.status(400).send({
        error: '404',
        message: 'Phone number is required',
      });
    } else if (!req.body.userName) {
      res.status(400).send({
        error: '404',
        message: 'User name is required',
      });
    } else if (!req.body.profession) {
      return res.status(400).send({
        error: '504',
        message: 'Profession is required',
      });
    } else if (!req.body.password) {
      res.status(400).send({
        error: '404',
        message: 'Password is required',
      });
    }
    const account = {
      id: users_table.length + 1,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      otherName: req.body.otherName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      userName: req.body.userName,
      profession: req.body.profession,
      password: req.body.password,
    };
    users_table.push(account);
    return res.status(201).send({
      success: 'true',
      message: ' Account created successfully',
      account,
    });
  }

  // create a red-flag record
  createRedflagRecord(req, res) {
    if (!req.body.createdOn) {
      res.status(400).send({
        error: '400',
        message: 'date is required',
      });
    } if (!req.body.createdBy) {
      res.status(400).send({
        error: '400',
        message: 'Author is required',
      });
    } if (!req.body.email) {
      res.status(400).send({
        error: '400',
        message: 'email is required',
      });
    } if (!req.body.type) {
      res.status(400).send({
        error: '400',
        message: 'type is required',
      });
    } else if (!req.body.location) {
      res.status(400).send({
        error: '400',
        message: 'location is required',
      });
    } else if (!req.body.comment) {
      res.status(400).send({
        error: '400',
        message: 'comment is required',
      });
    }
    const redflagRecord = {
      id: redflags_table.length + 1,
      createdOn: req.body.createdOn,
      createdBy: req.body.createdBy,
      email: req.body.email,
      type: req.body.type,
      location: req.body.location,
      comment: req.body.comment,
    };
    redflags_table.push(redflagRecord);
    return res.status(201).send({
      status: '201',
      message: 'Redflag record created successfully',
      redflagRecord,
    });
  }

  // create an intervention record
  createInterventionRecord(req, res) {
    if (!req.body.createdOn) {
      res.status(400).send({
        error: '400',
        message: 'date is required',
      });
    } if (!req.body.createdBy) {
      res.status(400).send({
        error: '400',
        message: 'Author is required',
      });
    } if (!req.body.email) {
      res.status(400).send({
        error: '400',
        message: 'email is required',
      });
    } if (!req.body.type) {
      res.status(400).send({
        error: '400',
        message: 'type is required',
      });
    } else if (!req.body.location) {
      res.status(400).send({
        error: '400',
        message: 'location is required',
      });
    } else if (!req.body.comment) {
      res.status(400).send({
        error: '400',
        message: 'comment is required',
      });
    }
    const interventionRecord = {
      id: interventions_table.length + 1,
      createdOn: req.body.createdOn,
      createdBy: req.body.createdBy,
      email: req.body.email,
      type: req.body.type,
      location: req.body.location,
      comment: req.body.comment,
    };
    interventions_table.push(interventionRecord);
    return res.status(201).send({
      status: '201',
      message: 'Intervention record created successfully',
      interventionRecord,
    });
  }


  // edit redflag record
  editRedflagRecord(req, res) {
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
    } if (!req.body.location) {
      res.status(404).send({
        error: '400',
        message: 'Bad request',
      });
    } if (!req.body.comment) {
      res.status(404).send({
        error: '400',
        message: 'Bad request',
      });
    }

    const editRedflagRecord = {
      id: recordFound.id,
      location: req.body.location || recordFound.location,
      comment: req.body.comment || recordFound.comment,
    };

    redflags_table.splice(itemIndex, 1, editRedflagRecord);

    return res.status(201).send({
      status: '201',
      editRedflagRecord,
    });
  }


  // edit intervention record
  editInterventionRecord(req, res) {
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
      res.status(404).send({
        error: '404',
        message: 'record not found',
      });
    } if (!req.body.location) {
      res.status(404).send({
        error: '400',
        message: 'Bad request',
      });
    } if (!req.body.comment) {
      res.status(404).send({
        error: '400',
        message: 'Bad request',
      });
    }

    const editInterventionRecord = {
      id: recordFound.id,
      location: req.body.location || recordFound.location,
      comment: req.body.comment || recordFound.comment,
    };

    interventions_table.splice(itemIndex, 1, editInterventionRecord);

    return res.status(201).send({
      status: '201',
      editInterventionRecord,
    });
  }


  // delete a red-flag record
  deleteRedflagRecord(req, res) {
    const id = parseInt(req.params.id, 10);

    redflags_table.map((record, index) => {
      if (record.id === id) {
        redflags_table.splice(index, 1);
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

  // delete an intervention record

  deleteInterventionRecord(req, res) {
    const id = parseInt(req.params.id, 10);

    interventions_table.map((record, index) => {
      if (record.id === id) {
        interventions_table.splice(index, 1);
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
}


const userController = new Usercontroller();
export default userController;
