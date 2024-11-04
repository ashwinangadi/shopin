import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";

export async function POST(request: Request) {
  try {
    const { email, emailType, userId } = await request.json();

    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    const encodedHash = encodeURIComponent(hashedToken);

    if (emailType === "VERIFY") {
      const userVERIFY = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      const userRESET = await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.SMTP_SERVER_USERNAME,
        pass: process.env.SMTP_SERVER_PASSWORD,
      },
    });

    const resetPasswordUrl = `${process.env.DOMAIN}/reset-password/${encodedHash}`;
    const verifyEmailUrl = `${process.env.DOMAIN}/verify-email/?token=${hashedToken}`;

    const mailOptions = {
      from: "ashwin.angadi1@gmail.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      //   text: "Hello world?", // plain text body
      html: `<p>Click <a href="${emailType === "VERIFY" ? verifyEmailUrl : resetPasswordUrl}">here</a> to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"} or copy and paste the link below in your browser. <br> ${emailType === "VERIFY" ? verifyEmailUrl : resetPasswordUrl}</p>`,
    };

    await transport.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: "User does not exist!" }, { status: 500 });
  }
}
