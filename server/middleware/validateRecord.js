import moment from 'moment';
import Helper from './helper';
import db from '../db/index';

class ValidateRecord {
  static async createIncident(req, res, next) {
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

  static async getOneIncident(req, res, next) {
    const text = 'SELECT * FROM incidents WHERE id = $1';
    const { rows } = await db.query(text, [req.params.id]);
    if (!rows[0]) {
      return res.status(404)
        .json({
          data:
            [{
              error: '404',
              message: 'Incident not found',
            }],
        });
    }
    return next();
  }

  static async updateAnIncident(req, res, next) {
    const findOneQuery = 'SELECT * FROM incidents WHERE id=$1';
    const { rows } = await db.query(findOneQuery, [req.params.id]);
    if (!req.body.location || !req.body.title || !req.body.comment) {
      return res.status(400)
        .json({
          data:
         [{
           error: '400',
           message: 'Please, supply all the information required!',
         }],
        });
    }
    if (!rows[0]) {
      return res.status(404)
        .json({
          data:
            [{
              error: 404,
              message: 'Incident not found! ',
            }],
        });
    }
    return next();
  }

  static async deleteAnIncident(req, res, next) {
    const deleteQuery = 'DELETE FROM incidents WHERE id=$1 returning *';
    const { rows } = await db.query(deleteQuery, [req.params.id]);
    if (!rows[0]) {
      return res.status(404)
        .json({
          data:
            [{
              error: '404',
              message: 'Incident not found',
            }],
        });
    }
    return next();
  }
}

export default ValidateRecord;
