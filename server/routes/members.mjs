import express from "express";
import memberController from "../controller/memberController.mjs";


const router = express.Router();



router.get('/',  memberController.handleGetAllMembers);

router.post('/', memberController.handleNewMember);



export default router;