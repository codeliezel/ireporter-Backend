// import moment from 'moment';
// import uuidv4 from 'uuidv4';
import db from '../db/index';
import Helper from '../middleware/helper';


class admin {
  // To log in
  static async login(req, res) {
    const loginQuery = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await db.query(loginQuery, [req.body.email]);
    const token = Helper.generateToken(rows[0].id);
    res.status(200).json({
      status: 200,
      data:
        [{
          message:
          'You have logged in successfully',
          token,
        }],
    });
  }

  // get all users
  static async getAllUsers(req, res) {
    const findAllQuery = 'SELECT * FROM users';
    const { rows, rowCount } = await db.query(findAllQuery);
    return res.status(200).send({ rows, rowCount });
  }

  // To update an incident
  static async updateAnIncident(req, res) {
    const findOneQuery = 'SELECT * FROM incidents WHERE id=$1';
    const updateOneQuery = `UPDATE incidents
      SET location=$1, title=$2, comment=$3
      WHERE id=$4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404)
          .json({ "message": "Incident not found! " });
      }
      const values = [
        req.body.location || rows[0].location,
        req.body.title || rows[0].title,
        req.body.comment || rows[0].comment,
        req.params.id,
      ];
      // const response = await db.query(updateOneQuery, values);
      // return res.status(200).send(response.rows[0]);
      return res.status(200)
        .json(
          {
            status: 200,
            message: 'Your incident has been updated successfully.',
          },
        );
    } catch (err) {
      return res.status(400).send(err);
    }
  }
}


export default admin;
