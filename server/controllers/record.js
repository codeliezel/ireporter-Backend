import moment from 'moment';
import db from '../db/index';
import Helper from '../middleware/helper';


class records {
  // To create an incident
  static async createIncident(req, res) {
    const createQuery = `INSERT INTO
      incidents (createdOn, createdBy, type, location, status, title, comment)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;

    const {
      createdBy,
      type,
      location,
      status,
      title,
      comment,
    } = req.body;


    const values = [
      moment(new Date()),
      createdBy,
      type,
      location,
      status,
      title,
      comment,
    ];
    const { rows } = await db.query(createQuery, values);
    const token = Helper.generateToken(rows[0].id);
    return res.status(201)
      .json({
        data:
          [{
            status: '201',
            message:
            'Incident created successfully!',
            token,
          }],
      });
  }

  // To get an incident
  static async getOneIncident(req, res) {
    const text = 'SELECT * FROM incidents WHERE id = $1';
    const { rows } = await db.query(text, [req.params.id]);
    return res.status(200).json(rows[0]);
  }


  // To get all incidents
  static async getAllIncidents(req, res) {
    const findAllQuery = 'SELECT * FROM incidents';
    const { rows, rowCount } = await db.query(findAllQuery);
    return res.status(200).json({ rows, rowCount });
  }


  // To update an incident
  static async updateAnIncident(req, res) {
    const findOneQuery = 'SELECT * FROM incidents WHERE id=$1';
    const updateOneQuery = `UPDATE incidents
      SET location=$1, title=$2, comment=$3
      WHERE id=$4 returning *`;
    const { rows } = await db.query(findOneQuery, [req.params.id]);
    const values = [
      req.body.location || rows[0].location,
      req.body.title || rows[0].title,
      req.body.comment || rows[0].comment,
      req.params.id,
    ];
    const response = await db.query(updateOneQuery, values);
    return res.status(200).json(response.rows[0]);
  }

  // To delete an incident
  static async deleteAnIncident(req, res) {
    const deleteQuery = 'DELETE FROM incidents WHERE id=$1 returning *';
    const { rows } = await db.query(deleteQuery, [req.params.id]);
    if (rows[0]) {
      return res.status(200).json({
        data:
          [{
            status: 200,
            message: 'Your incident has been deleted',
          }],
      });
    }
  }
}

export default records;
