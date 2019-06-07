import express from 'express';

import users from '../controllers/user';

import records from '../controllers/record';

// eslint-disable-next-line import/no-cycle
import admin from '../controllers/admin';

import Auth from '../middleware/authentication';

import ValidateUser from '../middleware/validateUser';

import ValidateAdmin from '../middleware/validateAdmin';
import ValidateRecord from '../middleware/validateRecord';

const router = express.Router();

// for welcome
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to iReporter' });
});
// user to create an account
router.post('/api/v1/user', ValidateUser.createAccount, users.createAccount);

// user login to an account
router.post('/api/v1/user/login', ValidateUser.login, users.login);

// user to delete his or her account
router.delete('/api/v1/auth/deleteaccount/:id', Auth.verifyToken, users.deleteAccount);

// user to reset password
router.put('/api/v1/auth/resetpassword/:id', Auth.verifyToken, ValidateUser.resetpassword, users.resetPassword);


// user to post/create incidents
router.post('/api/v1/auth/incident', Auth.verifyToken, ValidateRecord.anincident, records.createIncident);

// user to get an incident
router.get('/api/v1/auth/anincident/:id', Auth.verifyToken, records.getOneIncident);

// user to get all incidents
router.get('/api/v1/auth/allincidents', Auth.verifyToken, records.getAllIncidents);

// user to update an incident
router.patch('/api/v1/auth/updateincident/:id', Auth.verifyToken, records.updateAnIncident);

// user to delete an incident
router.delete('/api/v1/auth/deleteincident/:id', Auth.verifyToken, records.deleteAnIncident);


// admin to log in
router.post('/api/v1/admin/login', ValidateAdmin.login, admin.login);

// admin to get all users
router.get('/api/v1/auth/allusers', Auth.verifyToken, admin.getAllUsers);

// admin to act on a status
router.put('/api/v1/auth/changestatus/:id', Auth.verifyToken, ValidateAdmin.status, admin.status);


// admin to send a mail of any status act
router.post('/api/v1/auth/sendmail', Auth.verifyToken, ValidateAdmin.mail, admin.mail);

// admin to send a sms message of any status act
router.post('/api/v1/auth/sendsms', Auth.verifyToken, ValidateAdmin.sms, admin.sms);


export default router;
