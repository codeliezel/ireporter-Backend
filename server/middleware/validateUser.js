import Helper from './helper';
import db from '../db/index';

class ValidateUser {
  static async createAccount(req, res, next) {
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({ error: '400', message: 'Please, enter a valid email address!' });
    }
    if (!req.body.firstName || !req.body.lastName || !req.body.otherNames || !req.body.email
      || !req.body.phoneNumber || !req.body.userName || !req.body.password) {
      return res.status(400).json({ error: '400', message: 'Please, supply all the information required!' });
    }
    next();
  }


  static async login(req, res, next) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: '400', message: 'Please, supply all the information required!' });
    }
    const loginQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(loginQuery, [req.body.email]);
    if (!rows[0]) {
      return res.status(401).json({ error: '401', message: 'Wrong email or password!' });
    } if (!Helper.comparePassword(rows[0].password, req.body.password)) {
      return res.status(401).json({ error: '401', message: 'Wrong email or password!' });
    }
    next();
  }

  static async conflictEmail(req, res, next) {
    const text = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(text, [req.body.email]);
    if (rows[0]) {
      return res.status(409).json({ status: '409', message: 'This email is not available, please use another' });
    }
    next();
  }

  static async conflictUsername(req, res, next) {
    const text = 'SELECT * FROM users WHERE userName = $1';
    const { rows } = await db.query(text, [req.body.userName]);
    if (rows[0]) {
      return res.status(409).json({ status: '409', message: 'This username is not available, please use another' });
    }
    next();
  }

  static async conflictPhoneNumber(req, res, next) {
    const text = 'SELECT * FROM users WHERE phoneNumber = $1';
    const { rows } = await db.query(text, [req.body.phoneNumber]);
    if (rows[0]) {
      return res.status(409).json({ status: '409', message: 'This phone number is not available, please use another' });
    }
    next();
  }


  static async accessDenied(req, res, next) {
    const { id } = req.user;
    const text = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(text, [req.params.id]);
    if (rows[0].id !== id) {
      return res.status(422).json({ status: '422', error: 'Access Denied' });
    }
    next();
  }
}


export default ValidateUser;
