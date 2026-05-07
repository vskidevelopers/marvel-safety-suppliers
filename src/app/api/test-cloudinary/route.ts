import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Test 1: Check config
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      return NextResponse.json(
        { error: "Missing CLOUDINARY_CLOUD_NAME" },
        { status: 500 }
      );
    }

    // Test 2: List resources (simplest API call)
    const result = await cloudinary.api.resources({ max_results: 50 });

    return NextResponse.json({
      success: true,
      total_resources: result.resources.length,
      sample: result.resources[0]?.public_id,
    });
  } catch (error: any) {
    console.error("Cloudinary error:", error);
    return NextResponse.json(
      { error: error.message || "Cloudinary connection failed" },
      { status: 500 }
    );
  }
}
