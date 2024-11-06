import { connectToMongoDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqBody = await request.json();
  const { userId } = reqBody;
  try {
    await connectToMongoDB();
    const user = await User.findById(userId).select("wishlist");
    if (!user) {
      return NextResponse.json({
        error: "User not found",
        status: 404,
      });
    }
    return NextResponse.json({ data: user.wishlist, status: 200 });
  } catch (error) {
    console.error("Error fetching user wishlist:", error);
    return NextResponse.json({
      error: "Error fetching user wishlist",
      status: 500,
    });
  }
}
