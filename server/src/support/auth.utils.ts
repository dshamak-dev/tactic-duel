import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const _jwtSecret = process.env.JWT_SECRET || "secret";

export const createAuthToken = async (data: any) => {
  if (!data || !data._id) {
    console.error('invalid user token', data);
    return data;
  }

  const token = jwt.sign({ _id: data._id }, _jwtSecret, {
    expiresIn: "1d",
  });

  return token;
};

export const getAuthToken = (request: Request) => {
  let token = request.headers.authorization;

  if (!token) {
    return null;
  }

  return token.replace("Bearer", "").trim();
};

export const setAuthToken = (res: Response, token: string) => {
  res.setHeader("Authorization", token);
};

export const decodeAuthToken = async (token: string | null) => {
  if (!token) {
    console.log("no token");
    return null;
  }

  try {
    let decoded = jwt.verify(token, _jwtSecret);

    switch (typeof decoded) {
      case "object": {
        break;
      }
      case "string": {
        decoded = decoded ? JSON.parse(decoded) : decoded;
        break;
      }
    }
    return decoded;
  } catch (err) {
    console.error(err);

    return null;
  }
};

export const validateAuthToken = async (token: string | null) => {
  if (!token) {
    console.error("no token");
    return null;
  }

  const decoded = await decodeAuthToken(token);

  if (!decoded) {
    console.error("empty token");
    return null;
  }

  return createAuthToken(decoded);
};
