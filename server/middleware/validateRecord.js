import moment from 'moment';
import Helper from './helper';
import db from '../db/index';

class ValidateRecord {
  static async createIncident(req, res, next) {
    if (!req.body.type || !req.body.location || !req.body.status || !req.body.title || !req.body.comment) {
      return res.status(400).json({ error: '400', message: 'Please, supply all the information required!' });
    }
    return next();
  }

  static async getOneIncident(req, res, next) {
    const text = 'SELECT * FROM incidents WHERE id = $1';
    const { rows } = await db.query(text, [req.params.id]);
    if (!rows[0]) {
      return res.status(404).json({ error: '404', message: 'Incident not found' });
    }
    return next();
  }

  static async getAllIncident(req, res, next) {
    const { id: userid } = req.user;
    const text = 'SELECT * FROM incidents WHERE userid = $1';
    const { rows } = await db.query(text, [userid]);
    if (rows.length <= 0) {
      return res.status(404).json({ status: 'error', error: 'No properties found!' });
    }
    next();
  }


  static async checkDeactivateAccount(req, res, next) {
    const { id } = req.user;
    const text = 'SELECT * FROM users WHERE id = $1 AND isActive = \'false\'';
    const { rows } = await db.query(text, [id]);
    if (rows[0]) {
      return res.status(400).json({ status: '400', message: 'Your account is deactivated' });
    }
    next();
  }

  static async accessDenied(req, res, next) {
    const { id } = req.user;
    const text = 'SELECT * FROM incidents WHERE id = $1';
    const { rows } = await db.query(text, [req.params.id]);
    if (rows[0].userid !== id) {
      return res.status(422).json({ status: '422', error: 'Access Denied' });
    }
    next();
  }
}

export default ValidateRecord;
