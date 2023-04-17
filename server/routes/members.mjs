import express from "express";
import memberController from "../controller/memberController.mjs";
import {memberDataSanitzer} from "../middleware/inputSanitizer.mjs";


const router = express.Router();



router.get('/',  memberController.handleGetAllMembers);
router.get('/roles', memberController.handleGetAllRoles);
router.get('/payments', memberController.handleGetAllPayments);
router.get ('/payments/:id', memberController.handleGetPaymentById);
router.get('/:id/info', memberController.handleGetAllMemberInfo);
router.get('/:id', memberController.handleGetMemberById);
router.post('/', memberDataSanitzer, memberController.handleNewMember);
router.put('/payments/:id', memberController.handleUpdatePayment);
router.post('/payments/period', memberController.handleCreateNewPaymentPeriod);
router.put('/:id', memberDataSanitzer,memberController.handleUpdateMember);
router.delete('/:id', memberController.handleDeleteMember);
router.post('/export/download', memberController.handleMemberListExportFile);




export default router;