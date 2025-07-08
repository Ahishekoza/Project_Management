import JWT from "jsonwebtoken";

const JWT_SECRET = String(process.env.JWT_SECRET_KEY);

export const generateToken =async (payload) => {
  return await JWT.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = async(token) => {
  return await JWT.verify(token, JWT_SECRET);
};
