const route = require("express").Router();

const VideoController = require("../controllers/video.controller");
const Authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

const Validation = require("../middlewares/validation.middleware");
const { VideoSchema, UploadVideoSchema } = require("../schema/video.schema");

const { UserRole } = require("../helpers/user.helper");

const {
  Upload,
  SetType,
  SetUploadFileToBody,
} = require("../helpers/multer.helper");

route.post(
  "/create-video",
  Authenticate,
  Authorize([UserRole.teacher]),
  SetType("thumbnails"),
  Upload.single("thumbnail"),
  SetUploadFileToBody,
  Validation(VideoSchema),
  VideoController.CreateVideo
);

route.get(
  "/get-videos/:course",
  Authenticate,
  Authorize([UserRole.teacher, UserRole.student]),
  VideoController.GetVideosCourse
);

route.get(
  "/get-video/:video",
  Authenticate,
  Authorize([UserRole.teacher, UserRole.student]),
  VideoController.GetVideo
);

route.post(
  "/upload-video/:video",
  Authenticate,
  Authorize([UserRole.teacher]),
  SetType("videos"),
  Upload.single("video"),
  SetUploadFileToBody,
  Validation(UploadVideoSchema),
  VideoController.UploadVideo
);

route.put(
  "/update-video/:video",
  Authenticate,
  Authorize([UserRole.teacher]),
  SetType("thumbnails"),
  Upload.single("thumbnail"),
  SetUploadFileToBody,
  Validation(VideoSchema),
  VideoController.UpdateVideo
);

route.delete(
  "/delete-video/:video",
  Authenticate,
  Authorize([UserRole.teacher]),
  VideoController.DeleteVideo
);

module.exports = route;
