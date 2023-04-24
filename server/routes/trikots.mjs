import express from "express";
import trikotController from "../controller/trikotController.mjs";
import {trikotDataSanitizer} from "../middleware/inputSanitizer.mjs";
import {validateTrikotData} from "../middleware/validateTrikotData.mjs";

const router = express.Router();

router.get('/', trikotController.handleGetAllTrikots);
router.post('/', trikotDataSanitizer, validateTrikotData, trikotController.handleNewTrikot);
router.put('/:id', trikotDataSanitizer,validateTrikotData, trikotController.handleUpdateTrikot);
router.delete('/:id',trikotController.handleDeleteTrikot);

export default router;