// main.jsx or index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";  // ✅ import tailwind css

import { appStore } from "./store/store";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={appStore}>   {/* ✅ Wrap your app here */}
      <App />
    </Provider>
  </React.StrictMode>
);
