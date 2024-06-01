import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getTokenData = (request: NextRequest) => {
  try {
    const loginToken = request.cookies.get("loginToken")?.value;

    if (loginToken) {
      const loginTokenData = jwt.verify(
        loginToken,
        process.env.JWT_SECRET_KEY!
      ) as JwtPayload;

      // string ma aairako cha id
      return loginTokenData.email;
    }
    console.log("token not found");

    return null;
  } catch (error) {
    console.log(error);

    return "error";
  }
};
