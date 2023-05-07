import express from "express";
import memberController from "../controller/memberController.mjs";
import {memberDataSanitzer} from "../middleware/inputSanitizer.mjs";
import {validateMemberData} from "../middleware/validateMemberData.mjs";


const router = express.Router();



router.get('/',  memberController.handleGetAllMembers);
router.get('/roles', memberController.handleGetAllRoles);
router.get('/payments', memberController.handleGetAllPayments);
router.get('/payments/period', memberController.handleGetAllPaymentPeriods);
router.get ('/payments/:id', memberController.handleGetPaymentById);
router.get('/:id/info', memberController.handleGetAllMemberInfo);
router.get('/:id', memberController.handleGetMemberById);
router.post('/', memberDataSanitzer,validateMemberData, memberController.handleNewMember);
router.put('/payments/:id', memberController.handleUpdatePayment);
router.post('/payments/period', memberController.handleCreateNewPaymentPeriod);
router.put('/:id', memberDataSanitzer,validateMemberData, memberController.handleUpdateMember);
router.delete('/:id', memberController.handleDeleteMember);
router.post('/mail/export/download', memberController.handleMailListExportFile);
router.post('/export/download', memberController.handleMemberListExportFile);





export default router;