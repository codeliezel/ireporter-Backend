import redflagsTable from '../models/redflagsTable';
import interventionsTable from '../models/interventionsTable';

class Validate {
  static createAccount(req, res, next) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400)
        .json({
          error: '400',
          message: 'Please, supply all the information required!',
        });
    }
    return next();
  }

  static createRedflagRecord(req, res, next) {
    if (!req.body.createdOn || !req.body.createdBy || !req.body.email
      || !req.body.location || !req.body.comment) {
      return res.status(400)
        .json({
          error: '400',
          message: 'Please, supply all the information required!',
        });
    }
    return next();
  }

  static createInterventionRecord(req, res, next) {
    if (!req.body.createdOn || !req.body.createdBy || !req.body.email
      || !req.body.location || !req.body.comment) {
      res.status(400)
        .json({
          error: '400',
          message: 'Please, supply all the information required!',
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
    if (!req.body.location || !req.body.comment) {
      res.status(400)
        .json({
          error: '400',
          message: 'Please, supply the information required!',
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
    if (!req.body.location || !req.body.comment) {
      res.status(400)
        .json({
          error: '400',
          message: 'Please, supply the information required!',
        });
    }
    return next();
  }
}


export default Validate;
