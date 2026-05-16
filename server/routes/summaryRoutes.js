import express from "express";
import multer from "multer";
import {
  analyzePDF,
  getSummaries,
  getSummaryById,
  deleteSummary,
} from "../controllers/summaryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/analyze", protect, upload.single("pdf"), analyzePDF);
router.get("/", protect, getSummaries);
router.get("/:id", protect, getSummaryById);
router.delete("/:id", protect, deleteSummary);

export default router;
