import express from 'express';

import Users from '../controllers/user';

import Records from '../controllers/record';

import Auth from '../middleware/authentication';

import ValidateUser from '../middleware/validateUser';

import ValidateRecord from '../middleware/validateRecord';

const router = express.Router();

// Welcome Page
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to iReporter' });
});

router.post('/api/v1/user',
  ValidateUser.createAccount,
  ValidateUser.conflictEmail,
  ValidateUser.conflictUsername,
  Users.createAccount);

router.post('/api/v1/user/login',
  ValidateUser.login,
  Users.login);

router.patch('/api/v1/user/deactivate/:id',
  Auth.verifyToken,
  ValidateUser.accessDenied,
  Users.deactivateAccount);

router.patch('/api/v1/user/reactivate/:id',
  Auth.verifyToken,
  ValidateUser.accessDenied,
  Users.reactivateAccount);

router.post('/api/v1/incident',
  Auth.verifyToken,
  ValidateRecord.createIncident,
  ValidateRecord.checkDeactivateAccount,
  Records.createIncident);

router.get('/api/v1/anincident/:id',
  Auth.verifyToken,
  ValidateRecord.getOneIncident,
  ValidateRecord.accessDenied,
  ValidateRecord.checkDeactivateAccount,
  Records.getOneIncident);

router.get('/api/v1/allincidents',
  Auth.verifyToken,
  ValidateRecord.checkDeactivateAccount,
  ValidateRecord.getAllIncident,
  ValidateRecord.checkDeactivateAccount,
  Records.getAllIncidents);

router.patch('/api/v1/updateincident/:id',
  Auth.verifyToken,
  ValidateRecord.getOneIncident,
  ValidateRecord.accessDenied,
  ValidateRecord.checkDeactivateAccount,
  Records.updateAnIncident);

router.delete('/api/v1/deleteincident/:id',
  Auth.verifyToken,
  ValidateRecord.getOneIncident,
  ValidateRecord.accessDenied,
  ValidateRecord.checkDeactivateAccount,
  Records.deleteAnIncident);


export default router;
