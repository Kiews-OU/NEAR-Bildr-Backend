const multer = require("multer");
const shortid = require("shortid");
const mime = require("mime-types");
const fs = require("fs-extra");

const multerStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const { type } = req.params;
    const path = `./uploads/${type}`;
    fs.mkdirsSync(path);
    callback(null, path);
  },
  filename: (req, file, cb) => {
    const id = shortid.generate();
    const ext = mime.extension(file.mimetype);
    cb(null, `${id}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  fileSize: Number(process.env.MAX_FILE_SIZE_IN_MB) * 1024 * 1024,
});

const setType = (type) => (req, res, next) => {
  req.params.type = type;
  next();
};

const setUploadFileToBody = (req, res, next) => {
  if (req.file === undefined) {
    req.body.files = req.files;
  } else {
    req.body.file = req.file.filename;
  }
  next();
};

module.exports.Upload = upload;
module.exports.SetUploadFileToBody = setUploadFileToBody;
module.exports.SetType = setType;
