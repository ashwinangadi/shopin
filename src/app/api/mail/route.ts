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
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: process.env.SMTP_SERVER_USERNAME,
        pass: process.env.SMTP_SERVER_PASSWORD,
      },
    });

    const resetPasswordUrl = `${process.env.DOMAIN}/reset-password/${encodedHash}`;
    const verifyEmailUrl = `${process.env.DOMAIN}/verify-email/?token=${hashedToken}`;

    const mailOptions = {
      from: "no-reply@ashwinangadi.com", // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      //   text: "Hello world?", // plain text body
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
          <h2 style="color: #333;">${emailType === "VERIFY" ? "Welcome to Shopin!" : "Password Reset Request"}</h2>
          
          ${emailType === "VERIFY" 
            ? `<p>Thank you for signing up! We're excited to have you join our community. To start shopping with us, please verify your email address by clicking the button below:</p>`
            : `<p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email. Otherwise, click the button below to create a new password:</p>`
          }

          <a href="${emailType === "VERIFY" ? verifyEmailUrl : resetPasswordUrl}" 
             target="_blank"
             rel="noopener noreferrer"
             style="display: block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px auto; width: fit-content;">
            ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
          </a>

          <p style="color: #666; font-size: 14px;">If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="color: #666; font-size: 14px; word-break: break-all;">
            ${emailType === "VERIFY" ? verifyEmailUrl : resetPasswordUrl}
          </p>

          <p style="color: #666; font-size: 14px; margin-top: 24px;">
            ${emailType === "VERIFY" 
              ? "This verification link will expire in 1 hour for security reasons." 
              : "This password reset link will expire in 1 hour for security reasons."
            }
          </p>
          <div style="border-top: 1px solid #eee; margin-top: 24px; padding-top: 24px;">
            <p style="color: #666; font-size: 20px; font-weight: bold;">
              Thank you for trying ShopIN!
            </p>
            <p style="color: #666; font-size: 14px;">
              If you have any questions or need assistance, please don't hesitate to contact me on ashwinangadi.com.
            </p>
            <p style="color: #666; font-size: 14px;">
              Happy Shopping!
            </p>
          </div>
        </div>
      `,
    };

    await transport.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: `User does not exist!` },
      { status: 500 }
    );
  }
}
