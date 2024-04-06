import nodemailer from "nodemailer";
// we will use nodemailer for emails
import { emailInterface } from "./interfaces";
import User from "@/models/user.model";
import bcryptJs from "bcryptjs";

export const sendEmail = async ({
  toEmail,
  emailType,
  userId,
}: emailInterface) => {
  try {
    // generate token and stre into DB and send via email also
    // hash provide us specicial charcter, but uuidv4 do not provide us special char.
    const hashedToken = await bcryptJs.hash(userId.toString(), 10); // can use uuidv4 npm
    // select which type of email
    if (emailType === "VERIFY") {
      await User.findByIdAndDelete(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndDelete(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    // use mailtrap for nodemailer integration and paste the following code
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ceb3513dc34211",
        pass: "1b321e4ccee6c8",
      },
    });
    const mailOptions = {
      from: "malik@malik.com", // sender address
      to: toEmail,
      subject:
        emailType === "VERIFY" ? "VERIFY EMAIL ADDRESS" : "RESET YOUR PASSWORD",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
        or copy and paste the link below in your browser. <br> ${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}
        </p>`,
    };
    const emailResponse = await transporter.sendMail(mailOptions);
    return emailResponse;
  } catch (error: any) {
    console.log("error send email: ", error);
    throw new Error(error.messgae);
  }
};
