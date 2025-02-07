const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.config");

const allowedExtensions = ["jpg", "jpeg", "png"];

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const fileExtension = file.originalname.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      throw new multer.MulterError("LIMIT_UNEXPECTED_FILE", file);
    }

    return {
      folder: "profile_images",
      format: fileExtension,
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    };
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileExtension = file.originalname.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      return cb(new Error("Format Image tidak sesuai"));
    }

    cb(null, true);
  },
});

const uploadHandler = (req, res, next) => {
  upload.single("profile_image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        status: 102,
        message:
          err.code === "LIMIT_FILE_SIZE"
            ? "Ukuran file terlalu besar, maksimal 2MB"
            : "Format Image tidak sesuai",
        data: null,
      });
    } else if (err) {
      return res.status(400).json({
        status: 102,
        message: err.message,
        data: null,
      });
    }
    next();
  });
};

module.exports = uploadHandler;
