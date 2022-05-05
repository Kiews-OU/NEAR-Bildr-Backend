const route = require("express").Router();

const VideoController = require("../controllers/video.controller");
const Authenticate = require("../middlewares/authenticate.middleware");
const Authorize = require("../middlewares/authorize.middleware");

const Validation = require("../middlewares/validation.middleware");
const { VideoSchema } = require("../schema/video.schema");

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

module.exports = route;
