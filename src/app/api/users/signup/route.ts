// in next js every function needs a db connection becuase every function deploy
// as a servelrless function and theydo not know either it have dn connectio or not
import { connect } from "@/dBConnection/dbConfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server"; // for get data and send data
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/utils/mailHelper";
import { emailInterface } from "@/utils/interfaces";

// cooncet to the DB
connect();
// now we define the POST endpoint in next
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;

    // check user exist
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "user already registered." },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // jsut model a user
    const newUser = await User.create({
      userName,
      email,
      password: hashPassword,
    });
    //console.log(newUser);

    //send email for varification
    const emailObject: emailInterface = {
      toEmail: email,
      emailType: "VERIFY",
      userId: newUser?._id,
    };
    // console.log("email object: ", emailObject);
    await sendEmail(emailObject);

    return NextResponse.json({
      message: "User registered successfully",
      success: true,
      newUser,
    });
  } catch (error: any) {
    console.log("error: ", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
