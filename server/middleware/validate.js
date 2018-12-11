import redflagsTable from '../db/redflagsTable';
import interventionsTable from '../db/interventionsTable';
import usersTable from '../db/usersTable';

class Validate {
  static createAccount(req, res, next) {
    if (!req.body.firstName) {
      return res.status(400)
        .json({
          error: '400',
          message: 'First name is required',
        });
    } if (!req.body.lastName) {
      res.status(400)
        .json({
          error: '400',
          message: 'Last name is required',
        });
    } else if (!req.body.email) {
      res.status(400)
        .json({
          error: '400',
          message: 'Email is required',
        });
    } else if (!req.body.password) {
      res.status(400)
        .json({
          error: '400',
          message: 'Password is required',
        });
    }
    return next();
  }

  static createRedflagRecord(req, res, next) {
    if (!req.body.createdOn) {
      res.status(400)
        .json({
          error: '400',
          message: 'date is required',
        });
    } if (!req.body.createdBy) {
      res.status(400)
        .json({
          error: '400',
          message: 'Author is required',
        });
    } if (!req.body.email) {
      res.status(400)
        .json({
          error: '400',
          message: 'email is required',
        });
    } else if (!req.body.location) {
      res.status(400)
        .json({
          error: '400',
          message: 'location is required',
        });
    } else if (!req.body.comment) {
      res.status(400)
        .json({
          error: '400',
          message: 'comment is required',
        });
    }
    return next();
  }

  static createInterventionRecord(req, res, next) {
    if (!req.body.createdOn) {
      res.status(400)
        .json({
          error: '400',
          message: 'date is required',
        });
    } if (!req.body.createdBy) {
      res.status(400)
        .json({
          error: '400',
          message: 'Author is required',
        });
    } if (!req.body.email) {
      res.status(400)
        .json({
          error: '400',
          message: 'email is required',
        });
    } else if (!req.body.location) {
      res.status(400)
        .json({
          error: '400',
          message: 'location is required',
        });
    } else if (!req.body.comment) {
      res.status(400)
        .json({
          error: '400',
          message: 'comment is required',
        });
    }
    return next();
  }

  static editInterventionRecord(req, res, next) {
    const id = Number(req.params.id);
    let recordFound;
    let itemIndex;
    interventionsTable.find((record, index) => {
      if (record.id === id) {
        recordFound = record;
        itemIndex = index;
      }
    });

    if (!recordFound) {
      res.status(404)
        .json({
          error: '404',
          message: 'record not found',
        });
    }
    if (!req.body.location) {
      res.status(400)
        .json({
          error: '400',
          message: 'The location is required',
        });
    } if (!req.body.comment) {
      res.status(400)
        .json({
          error: '400',
          message: 'The comment is required',
        });
    }
    return next();
  }

  static editRedflagRecord(req, res, next) {
    const id = Number(req.params.id);
    let recordFound;
    let itemIndex;
    redflagsTable.find((record, index) => {
      if (record.id === id) {
        recordFound = record;
        itemIndex = index;
      }
    });

    if (!recordFound) {
      res.status(404)
        .json({
          error: '404',
          message: 'record not found',
        });
    }
    if (!req.body.location) {
      res.status(400)
        .json({
          error: '400',
          message: 'The location is required',
        });
    } if (!req.body.comment) {
      res.status(400)
        .json({
          error: '400',
          message: 'The comment is required',
        });
    }
    return next();
  }
}


export default Validate;
