import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const battleRouter = express.Router();

const _jwtSecret = process.env.JWT_SECRET || "secret";

battleRouter.post(`/battle/search`, async (req, res) => {
  const { characterId } = req.body;
  const authToken = req.headers.authorization;

  console.log(authToken);

  if (!authToken) {
    return res.status(401).end();
  }

  const token = authToken.replace('Bearer', '').trim();

  let decoded;

  try {
    decoded = jwt.verify(token, _jwtSecret);

    console.log({ decoded });
  } catch(err) {
    console.error(err);

    return res.status(401).end();
  }

  // try {
  //   const player = await findOne("players", { email });

  //   const passwordMatch = await bcrypt.compare(password, player.password);
  //   if (!passwordMatch) {
  //     return res.status(401).json({ error: "Authentication failed" });
  //   }

  //   const token = jwt.sign({ id: player._id }, _jwtSecret, {
  //     expiresIn: "1h",
  //   });

  //   res.status(200).setHeader("Authorization", token).json(player).end();
  // } catch (error) {
  //   res.status(400).json({ error }).end();
  // }

  setTimeout(() => {
    res.status(200).json(null);
  }, 2000);
});
