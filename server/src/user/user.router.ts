import { Character } from "core/character/character.model";
import express from "express";

import { findOne, findAll, insertOne } from "server/database/database.controls";
import {
  createAuthToken,
  decodeAuthToken,
  getAuthToken,
  setAuthToken,
} from "server/support/auth.utils";

export const userRouter = express.Router();
// Account
userRouter.get(`/account`, async (req, res) => {
  const authToken = getAuthToken(req);
  const tokenData: any = await decodeAuthToken(authToken);

  try {
    if (!tokenData || !tokenData._id) {
      throw new Error("invalid token");
    }

    const user = await findOne("users", { _id: tokenData._id });

    const nextToken = await createAuthToken(authToken);
    setAuthToken(res, nextToken);

    res.status(200).json(user);
  } catch (err) {
    return res.status(401).end();
  }
});

// Account Characters
userRouter.get(`/account/characters`, async (req, res) => {
  const authToken = getAuthToken(req);
  const tokenData: any = await decodeAuthToken(authToken);

  try {
    if (!tokenData || !tokenData._id) {
      return res.status(401).json(null);
    }

    const characters = await findAll("characters", { userId: tokenData._id });

    res.status(200).json(characters || []);
  } catch (err) {
    console.error(err);
    return res.status(400).json(null);
  }
});
userRouter.post(`/account/characters`, async (req, res) => {
  const characterDTO = req.body;
  const authToken = getAuthToken(req);
  const tokenData: any = await decodeAuthToken(authToken);

  try {
    if (!tokenData || !tokenData._id) {
      return res.status(401).json(null);
    }

    const character = new Character(
      Object.assign({ userId: tokenData._id }, characterDTO)
    );

    const record = await insertOne("characters", character);

    res.status(200).json(record);
  } catch (err) {
    console.error(err);
    return res.status(400).json(null);
  }
});
