
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET_KEY || "your-fallback-secret"
);

// Generate JWT
export const generateToken = async (payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1d") // expires in 1 day
    .sign(JWT_SECRET);
};

// Verify JWT
export const verifyToken = async (token) => {
  const { payload } = await jwtVerify(token, JWT_SECRET, {
    algorithms: ["HS256"],
  });
  return payload;
};
