import Helper from './helper';

class ValidateRecord {
  static async anincident(req, res, next) {
    if (!req.body.createdBy || !req.body.type || !req.body.location
             || !req.body.status || !req.body.title || !req.body.comment) {
      return res.status(400)
        .json({
          data:
              [{
                error: '400',
                message: 'Please, supply all the information required!',
              }],
        });
    }
    return next();
  }
}

export default ValidateRecord;
