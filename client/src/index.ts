import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { App } from "src/app/App";

import './index.css';

const rootEl = document.getElementById("root");
const root = createRoot(rootEl);
root.render(createElement(App));
