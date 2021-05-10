import express from 'express';
import mainController from "../controllers/mainController.js";

const router = express.Router();

router.post('/api/v1/getFiles', mainController.getFiles);
router.post('/api/v1/fileAction', mainController.fileAction);

export default router;