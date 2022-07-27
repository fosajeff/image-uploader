import { Request } from "express";
const { S3Client } = require("@aws-sdk/client-s3");
import multer, { FileFilterCallback } from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
  },
});

const fileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ): void => {
    callback(null, "./src/uploads");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void
  ): void => {
    callback(null, Date.now() + "_" + file.originalname);
  },
});

const multerS3Config = multerS3({
  s3: s3,
  acl: "public-read",
  bucket: String(process.env.AWS_BUCKET_NAME),
  metadata: (
    req: Request,
    file: Express.MulterS3.File,
    callback: (error: any, metadata?: any) => void
  ) => {
    callback(null, { fieldName: file.fieldname });
  },
  key: (
    req: Express.Request,
    file: Express.MulterS3.File,
    callback: (error: any, key?: string) => void
  ) => {
    callback(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.MulterS3.File,
  callback: FileFilterCallback
): void => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export default multer({
  storage: multerS3Config,
  // storage: fileStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, // we are allowing only 5 MB files
  },
});
