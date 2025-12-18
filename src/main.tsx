import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMockData } from "./services/support.service.ts";

// Initialize mock data in localStorage
initMockData();

createRoot(document.getElementById("root")!).render(<App />);
