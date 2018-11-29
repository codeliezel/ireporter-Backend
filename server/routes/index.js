import express from 'express';

import adminController from '../controllers/admin';

import userController from '../controllers/user';

const router = express.Router();


/*
* For the admin;
* should be able to get all users
* should be able to get all records for both [red-flag, intervention] records
* should be able to get a single [redflag, intervention] record
* should be able to change the status of any of the records[red-flag, intervention]
*/

router.get('/api/v1/users', adminController.getAllUsers);
router.get('/api/v1/redflag', adminController.getAllRedflags);
router.get('/api/v1/intervention', adminController.getAllInterventions);
router.get('/api/v1/redflag/:id', adminController.getRedflag);
router.get('/api/v1/intervention/:id', adminController.getIntervention);
router.patch('/api/v1/admin/redflag/:id', adminController.updateRedflag);
router.patch('/api/v1/admin/intervention/:id', adminController.updateIntervention);


/*
* For users
* can create an account
* create an intervention record
* create a red-flag record
* edit a red-flag record
* edit an intervention record
* delete a red-flag record
* delete an intervention record
*/

router.post('/api/v1/user', userController.createAccount);
router.post('/api/v1/redflag', userController.createRedflagRecord);
router.post('/api/v1/intervention', userController.createInterventionRecord);
router.patch('/api/v1/user/redflag/:id', userController.editRedflagRecord);
router.patch('/api/v1/user/intervention/:id', userController.editInterventionRecord);
router.delete('/api/v1/user/redflag/:id', userController.deleteRedflagRecord);
router.delete('/api/v1/user/intervention/:id', userController.deleteInterventionRecord);


export default router;
