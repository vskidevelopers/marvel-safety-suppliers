import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CHUNK_SIZE = 6000000;

export async function POST(req: NextRequest) {
  try {
    // Use  the FULL folder path as it appears in Cloudinary
    const folderPath = "partners"; // ← Must match folder structure

    // Fetch all assets in the asset folder
    const result = await new Promise((resolve, reject) => {
      cloudinary.api.resources_by_asset_folder(
        folderPath,
        { max_results: 50 },
        (error, response) => {
          if (error) reject(error);
          else resolve(response);
        },
      );
    });

    const partners = (result as any).resources.map((res: any) => ({
      public_id: res.public_id,
      secure_url: res.secure_url,
      format: res.format,
    }));

    return Response.json({ partners });
  } catch (error: any) {
    console.error("Cloudinary error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
