import express from "express";
import bcrypt from "bcrypt";

import { Player } from "core/player/player.model";
import { findOne, insertOne } from "server/database/database.controls";
import { createAuthToken, setAuthToken } from "server/support/auth.utils";

export const authRouter = express.Router();

authRouter.post(`/auth`, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findOne("users", { email });

    if (!user) {
      return res.status(400).json({ error: "invalid email" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.error("password not match");
      return res.status(400).json({ error: "invalid password" });
    }

    const token = await createAuthToken(user);

    setAuthToken(res, token);

    res.status(200).json(user).end();
  } catch (error) {
    res.status(400).json({ error }).end();
  }
});

authRouter.post(`/users`, async (req, res) => {
  const { email, password, confirm } = req.body;

  if (!email || !password || !confirm) {
    return res.status(400).json({ error: "Invalid data" }).end();
  }

  if (password !== confirm) {
    return res
      .status(400)
      .json({ error: "incorrect password and confirmation password" })
      .end();
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const record = new Player({ email, password: hashedPassword });

  try {
    const user = await insertOne("users", record);

    const token = await createAuthToken(user);

    setAuthToken(res, token);

    res.status(200).json(user).end();
  } catch (error) {
    res.status(400).json({ error }).end();
  }
});
