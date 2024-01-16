import path from "path";
import fs from "fs";
import express from "express";
import compression from "compression";
import cors from "cors";

import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../.env.local") });

import { findOne } from "./database/database.controls";
import { createWebsocketServer } from "./websocket/websocket.controller";
import { userRouter } from "./user/user.router";
import { battleRouter } from "server/battle/battle.router";
import { getAuthToken, setAuthToken, validateAuthToken } from "server/support/auth.utils";
import { authRouter } from "server/user/auth.router";

const PORT = process.env.PORT || 3005;
const app = express();
const _jwtSecret = process.env.JWT_SECRET || "secret";

app.use(compression());

app.use(
  cors({
    origin: ["http://localhost:8008", "https://lethal.clash.vercel.app"],
    exposedHeaders: ["Authorization"],
  })
);

app.use(express.json());

const PUBLIC_FOLDER = "client";
const HTMLPath = path.resolve(__dirname, `../../${PUBLIC_FOLDER}/index.html`);

app.get("/api/highlight", async (req, res) => {
  const rec = await findOne("updates", {});

  res.status(200).json(rec);
});

app.use("/api", authRouter);

app.use("/api/*", async (req, res, next) => {
  const token = await validateAuthToken(getAuthToken(req));

  if (!token) {
    return res.status(401).end();
  }

  setAuthToken(res, token);
  
  next();
});

app.use("/api", userRouter);
app.use("/api", battleRouter);

app.get("*", (req, res) => {
  res.set("Cache-Control", `no-cache`);

  if (!fs.existsSync(HTMLPath)) {
    res.status(200).end("ok");
  }

  res.sendFile(HTMLPath);
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

createWebsocketServer(server);
