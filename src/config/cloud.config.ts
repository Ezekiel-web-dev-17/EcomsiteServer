import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Configure the storage engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "my-app-uploads", // The folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "gif"], // Restrict file types
    // unique_filename: true, // (Optional) Default is true
  } as any, // "as any" is often needed here due to strict type definitions in the library
});

// 3. Initialize Multer with the storage engine
const upload = multer({ storage: storage });

export default upload;
/*
import { Router, Request, Response } from "express";
import upload from "../config/cloudinary";

const router = Router();

// "avatar" must match the 'name' attribute in your HTML form input
router.post(
  "/upload-avatar",
  upload.single("avatar"),
  (req: Request, res: Response) => {
    // TypeScript knows req.file exists because we installed @types/multer
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // With multer-storage-cloudinary, req.file.path IS the Cloudinary URL
    const cloudinaryUrl = req.file.path;

    return res.json({
      message: "File uploaded successfully!",
      url: cloudinaryUrl,
      details: req.file, // You can see all Cloudinary metadata here
    });
  }
);

export default router;

params: {
  folder: 'uploads',
} as any,
*/