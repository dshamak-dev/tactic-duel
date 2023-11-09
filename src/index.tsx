import React from "react";
import { createRoot } from "react-dom/client";
import { GamePage } from "src/game/game.page";

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);

root.render(<GamePage />);
