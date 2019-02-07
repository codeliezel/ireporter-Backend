import express from 'express';

import users from '../controllers/user';

import records from '../controllers/record';

import admin from '../controllers/admin';

import Auth from '../middleware/authentication';

import ValidateUser from '../middleware/validateUser';

import ValidateAdmin from '../middleware/validateAdmin';

const router = express.Router();


// user to create an account
router.post('/api/v1/users', ValidateUser.createAccount, users.createAccount);

// user login to an account
router.post('/api/v1/users/login', ValidateUser.login, users.login);

// user to post/create incidents
router.post('/api/v1/incidents', records.createIncident);

// user to reset password
router.put('/api/v1/reset/:id', users.resetPassword);


// user to get an incident
router.get('/api/v1/incidents/:id', records.getOneIncident);

// user to get all incidents
router.get('/api/v1/incidents', records.getAllIncidents);

// user to update an incident
router.patch('/api/v1/incidents/:id', records.updateAnIncident);

// user to delete an incident
router.delete('/api/v1/incidents/:id', records.deleteAnIncident);


// admin to log in
router.post('/api/v1/admin/login', ValidateAdmin.login, admin.login);

// admin to get all users
router.get('/api/v1/users', admin.getAllUsers);

// admin to act on a status
router.put('/api/v1/status/:id', ValidateAdmin.status, admin.status);

export default router;
