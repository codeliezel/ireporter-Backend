import moment from 'moment';
import db from '../db/index';
import Helper from '../middleware/helper';


class Users {
  static async createAccount(req, res) {
    try {
      const {
        firstName, lastName, otherNames, email, phoneNumber, userName, password,
      } = req.body;

      const createQuery = `INSERT INTO
      users (firstName, lastName, otherNames, email, phoneNumber, userName, password, createdOn)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      returning *`;
      const hashPassword = Helper.hashPassword(password);

      const values = [firstName, lastName, otherNames, email, phoneNumber, userName,
        hashPassword, moment(new Date())];
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id, rows[0].username);
      return res.status(201).json({
        status: '201', message: 'Registration successful', email, data: rows, token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  static async login(req, res) {
    try {
      const text = 'SELECT * FROM users WHERE email = $1';
      const { rows } = await db.query(text, [req.body.email]);
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).json({
        status: '200', message: 'You have logged in successfully', data: rows, token,
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  static async deactivateAccount(req, res) {
    try {
      const text = 'SELECT * FROM users WHERE id = $1 AND isactive = \'true\'';
      await db.query(text, [req.params.id]);
      await db.query('UPDATE users SET isActive=$1, updatedOn=$2 WHERE id=$3 returning *', [req.body.isActive = 'false',
        moment(new Date()), req.params.id]);
      return res.status(200).json({ status: '200', message: 'Your account has been de-activated' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  static async reactivateAccount(req, res) {
    try {
      const text = 'SELECT * FROM users WHERE id = $1 AND isactive = \'false\'';
      await db.query(text, [req.params.id]);
      await db.query('UPDATE users SET isActive=$1, updatedOn=$2 WHERE id=$3 returning *', [req.body.isActive = 'true',
        moment(new Date()), req.params.id]);
      return res.status(200).json({ status: '200', message: 'Your account has been re-activated' });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }
}

export default Users;
