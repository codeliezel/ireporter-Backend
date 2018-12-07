import express from 'express';

import Recordcontroller from '../controllers/record';

import Usercontroller from '../controllers/user';

import Validate from '../middleware/validate';

const router = express.Router();


router.get('/api/v1/red-flags', Recordcontroller.getAllRedflags);
router.get('/api/v1/interventions', Recordcontroller.getAllInterventions);
router.get('/api/v1/red-flag/:id', Recordcontroller.getRedflag);
router.get('/api/v1/intervention/:id', Recordcontroller.getIntervention);

router.post('/api/v1/users', Validate.createAccount, Usercontroller.createAccount);
router.post('/api/v1/red-flags', Validate.createRedflagRecord, Recordcontroller.createRedflagRecord);
router.post('/api/v1/interventions', Validate.createInterventionRecord, Recordcontroller.createInterventionRecord);

router.patch('/api/v1/red-flag/:id', Validate.editRedflagRecord, Recordcontroller.editRedflagRecord);
router.patch('/api/v1/intervention/:id', Validate.editInterventionRecord, Recordcontroller.editInterventionRecord);

router.delete('/api/v1/red-flag/:id', Validate.deleteRedflagRecord, Recordcontroller.deleteRedflagRecord);
router.delete('/api/v1/intervention/:id', Validate.deleteInterventionRecord, Recordcontroller.deleteInterventionRecord);

export default router;
