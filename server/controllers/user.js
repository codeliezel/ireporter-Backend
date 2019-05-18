import moment from 'moment';
import db from '../db/index';
import Helper from '../middleware/helper';


class users {
  // To create an account
  static async createAccount(req, res) {
    const createQuery = `INSERT INTO
      users (firstName, lastName, otherNames, email, phoneNumber, userName, registered, isAdmin, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
    const {
      firstName, lastName, otherNames, email, phoneNumber, userName, isAdmin, password,
    } = req.body;

    const hashPassword = Helper.hashPassword(password);

    const values = [firstName, lastName, otherNames, email, phoneNumber, userName,
      moment(new Date()), isAdmin, hashPassword];

    try {
      const { rows } = await db.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id);
      return res.status(201)
        .json({
          status: '201',
          data:
         [{
           message:
            'Registration Successful!',
           token,
         }],
        });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409)
          .json({
            status: '409',
            data:
            [{
              message: 'OOPS! This particular email has already been registered.',
            }],
          });
      }
    }
  }

  // To log in
  static async login(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(text, [req.body.email]);
    const token = Helper.generateToken(rows[0].id);
    return res.status(200).json({
      status: 200,
      data:
        [{
          message:
          'You have logged in successfully',
          token,
        }],
    });
  }

  // To reset password
  static async resetPassword(req, res) {
    const findQuery = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery = `UPDATE users
      SET password=$1
      WHERE id=$2 returning *`;
    try {
      const { rows } = await db.query(findQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404)
          .json({ message: 'Email not found' });
      }

      const {
        password,
      } = req.body;

      const hashPassword = Helper.hashPassword(password);
      const values = [
        hashPassword || rows[0].password,
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      // return res.status(200).send(response.rows[0]);
      return res.status(200)
        .json(
          {
            data:
            [{
              status: 200,
              message: 'A new password has been set!',
            }],
          },
        );
    } catch (err) {
      return res.status(400).send(err);
    }
  }


  // a user to delete his or her account
  static async deleteAccount(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404)
          .json({
            data:
            [{
              error: '404',
              message: 'user not found',
            }],
          });
      } if (rows[0]) {
        return res.status(204)
          .json({
            data:
            [{
              error: 204,
              message: 'Your account has been deleted!',
            }],
          });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  // end of class
}

export default users;
