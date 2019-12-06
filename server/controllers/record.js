import moment from 'moment';
import dotenv from 'dotenv';
import db from '../db/index';


dotenv.config();


class Records {
  static async createIncident(req, res) {
    try {
      const {
        type, location, status, title, comment,
      } = req.body;
      const { id } = req.user;
      const { username } = req.user;
      const createQuery = `INSERT INTO
      incidents (userId, createdBy, type, location, status, title, comment, createdOn, updatedOn)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
      returning *`;
      const values = [id, username, type, location, status, title,
        comment, moment(new Date()), moment(new Date())];
      const { rows } = await db.query(createQuery, values);
      return res.status(201).json({ status: '201', message: 'Incident created successfully!', data: rows });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }

  static async getOneIncident(req, res) {
    try {
      const text = 'SELECT * FROM incidents WHERE id = $1';
      const { rows } = await db.query(text, [req.params.id]);
      return res.status(200).json({ status: '200', message: 'Successful', data: rows[0] });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }


  static async getAllIncidents(req, res) {
    try {
      const { id: userid } = req.user;
      const findAllQuery = 'SELECT * FROM incidents WHERE userid = $1';
      const { rows, rowCount } = await db.query(findAllQuery, [userid]);
      return res.status(200).json({
        status: '200', message: 'Successful', data: rows, rowCount,
      });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }


  static async updateAnIncident(req, res) {
    try {
      const findOneQuery = 'SELECT * FROM incidents WHERE id=$1';
      const updateOneQuery = `UPDATE incidents
      SET type=$1, location=$2, title=$3, comment=$4
      WHERE id=$5 returning *`;
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      const values = [
        req.body.type || rows[0].type,
        req.body.location || rows[0].location,
        req.body.title || rows[0].title,
        req.body.comment || rows[0].comment,
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).json({ status: '200', message: 'Successful', data: response.rows[0] });
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }


  static async deleteAnIncident(req, res) {
    try {
      const deleteQuery = 'DELETE FROM incidents WHERE id=$1 returning *';
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (rows[0]) {
        return res.status(200).json({ status: '200', message: 'Your incident has been deleted' });
      }
    } catch (error) {
      return res.status(500).json({ status: '500', error: 'Oops, there\'s an error!' });
    }
  }
}

export default Records;
