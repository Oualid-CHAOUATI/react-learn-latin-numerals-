import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { LanguagePovider } from "./Contexts/App.context";
import { GameProvider } from "./Contexts/gameContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguagePovider>
      <GameProvider>
        <App />
      </GameProvider>
    </LanguagePovider>
  </React.StrictMode>
);
