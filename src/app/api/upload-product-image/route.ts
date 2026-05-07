import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Get form data from request
    const formData = await request.formData();
    const file = formData.get("file") as File;
    console.log("formData from routes POST >>", formData);

    if (!file || !(file instanceof File)) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "products", // ← Upload to "products" folder
            resource_type: "image",
            tags: ["marvel-safety", "product"],
            transformation: [
              { width: 800, height: 800, crop: "limit" },
              { quality: "auto:good" },
            ],
          },
          (error, uploadResult) => {
            if (error) {
              reject(error);
            } else {
              resolve(uploadResult);
            }
          },
        )
        .end(buffer);
    });

    // Return success response
    return Response.json({
      url: (result as any).secure_url,
      public_id: (result as any).public_id,
      format: (result as any).format,
    });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return Response.json(
      { error: error.message || "Upload failed" },
      { status: 500 },
    );
  }
}
