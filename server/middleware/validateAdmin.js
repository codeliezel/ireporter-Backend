import Helper from './helper';
import db from '../db/index';

class ValidateAdmin {
  static async login(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        error: '400',
        message: 'Please, supply all the information required!',
      });
    }
    try {
      const loginQuery = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(loginQuery, [req.body.email]);
      if (!rows[0]) {
        return res.status(404)
          .json({
            error: '404',
            message: 'Wrong email or password!',
          });
      } if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(404)
          .json({
            error: '404',
            message: 'Wrong email or password!',
          });
      }
    } catch (error) {
      // return res.status(400)
      //   .json(error);
    }
    return next();
  }


  static async status(req, res, next) {
    if (!req.body.status) {
      return res.status(400).json({
        error: '400',
        message: 'Please, supply the status!',
      });
    }
    return next();
  }


  static async mail(req, res, next) {
    if (!req.body.email || !req.body.msg || !req.body.name
    || !req.body.position || !req.body.company) {
      res.status(400).json({
        error: '400',
        message: 'Please, supply all the required information',
      });
    }
    return next();
  }

  static async sms(req, res, next) {
    if (!req.body.text || !req.body.number) {
      res.status(400).json({
        error: '400',
        message: 'Please, supply all the required information',
      });
    }
    return next();
  }
  // end of class
}

export default ValidateAdmin;
