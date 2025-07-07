import JWT from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY;

export const generateToken = (payload) => {
  return JWT.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token) => {
  return JWT.verify(token, JWT_SECRET);
};
