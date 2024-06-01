import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/app/helpers/getTokenData";
import User from "@/app/model/UserModel";

export async function GET(request: NextRequest) {
  try {
    //get token data
    const userId = getTokenData(request);
    const loggedInUser = await User.findOne(
      { _id: userId },
      { username: 1, email: 1 }
    );
    if (loggedInUser) {
      return NextResponse.json({
        msg: "Logged in user found",
        loggedInUser,
        statusCode: 200,
      });
    }

    return NextResponse.json({
      msg: "Logged in user not found",
      statusCode: 404,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "failed getuser request",
      statusCode: 404,
    });
  }
}