import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/db";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectToMongoDB();

export async function POST(request: NextRequest) {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");
  if (!user) {
    return NextResponse.json(
      { error: "User does not exists" },
      { status: 400 }
    );
  }
  return NextResponse.json({ message: "User found", data: user });
}
