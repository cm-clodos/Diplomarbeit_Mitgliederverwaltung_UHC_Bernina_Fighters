import express from "express";
import memberController from "../controller/memberController.mjs";


const router = express.Router();



router.get('/',  memberController.handleGetAllMembers);
router.get('/roles', memberController.handleGetAllRoles);
router.get('/:id/info', memberController.handleGetAllMemberInfo);
router.get('/:id', memberController.handleGetMemberById);
router.post('/', memberController.handleNewMember);
router.put('/:id', memberController.handleUpdateMember);
router.delete('/:id', memberController.handleDeleteMember);
router.post('/export/download', memberController.handleMemberListExportFile);




export default router;