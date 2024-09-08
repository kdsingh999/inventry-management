import jwt, { Secret, JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  expiresIn: string | number;
}

const DEFAULT_SIGN_OPTION: CustomJwtPayload = {
  expiresIn: process.env.JWT_EXPIRES_IN || "1d",
};

export const generateJWT = (
  payload: JwtPayload,
  options: CustomJwtPayload = DEFAULT_SIGN_OPTION
) => {
  const secret = process.env.JWT_SECRET as Secret;
  return jwt.sign(payload, secret!, options);
};

export const verifyJWT = (token: string) => {
  const secret = process.env.JWT_SECRET as Secret;
  return jwt.verify(token, secret);
};
