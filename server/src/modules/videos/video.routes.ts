import express from "express";
import requireUser from "../../middlewares/requireUser";
import {
  findVideosHandler,
  updateVideoHandler,
  uploadVideoHandler,
  streamVideoHandler,
} from "./video.controller";

const router = express.Router();

router.post("/", requireUser, uploadVideoHandler);
router.patch("/:videoId", requireUser, updateVideoHandler);
router.get("/:videoId", streamVideoHandler);
router.get("/", findVideosHandler);

export default router;
