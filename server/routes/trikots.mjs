import express from "express";
import trikotController from "../controller/trikotController.mjs";
import {trikotDataSanitizer} from "../middleware/inputSanitizer.mjs";

const router = express.Router();

router.get('/', trikotController.handleGetAllTrikots);
router.post('/', trikotDataSanitizer, trikotController.handleNewTrikot);
router.put('/:id', trikotDataSanitizer,trikotController.handleUpdateTrikot);
router.delete('/:id',trikotController.handleDeleteTrikot);

export default router;