import { connectToMongoDB } from "@/lib/db";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

connectToMongoDB();

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;
  try {
    const userAccount = await User.findById(userId).select(
      "-wishlist -verifyToken -verifyTokenExpiry -forgotPasswordToken -forgotPasswordTokenExpiry"
    );
    if (!userAccount) {
      return NextResponse.json({
        error: "User not found",
        status: 404,
      });
    }
    return NextResponse.json({ data: userAccount, status: 200 });
  } catch (error) {
    console.error("Error fetching user account:", error);
    return NextResponse.json({
      error: `Error fetching user account: ${error}`,
      status: 500,
    });
  }
}
