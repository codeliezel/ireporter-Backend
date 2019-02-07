import Helper from "./helper";
import db from '../db/index';


class ValidateUser {
  static async createAccount(req, res, next) {
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        error: '400',
        message: 'Please, enter a valid email address!',
      });
    }
    if (!req.body.firstName || !req.body.lastName || !req.body.otherNames || !req.body.email
      || !req.body.phoneNumber || !req.body.userName || !req.body.isAdmin || !req.body.password) {
      return res.status(400)
        .json({
          error: '400',
          message: 'Please, supply all the information required!',
        });
    }
    return next();
  }

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
        return res.status(400)
          .json({
            message: 'Wrong email address!',
          });
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400)
          .json({
            message: 'Wrong password!',
          });
      }
    } catch (error) {
      return res.status(400)
        .json(error);
    }
    return next();
  }
}


export default ValidateUser;
