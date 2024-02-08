import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { LanguagePovider } from "./Contexts/App.context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguagePovider>
      <App />
    </LanguagePovider>
  </React.StrictMode>
);
