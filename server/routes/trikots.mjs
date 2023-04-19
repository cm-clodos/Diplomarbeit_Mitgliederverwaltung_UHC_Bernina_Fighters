import express from "express";
import trikotController from "../controller/trikotController.mjs";

const router = express.Router();

router.get('/', trikotController.handleGetAllTrikots);
router.post('/', trikotController.handleNewTrikot);
router.put('/:id', trikotController.handleUpdateTrikot);
router.delete('/:id',trikotController.handleDeleteTrikot);

export default router;