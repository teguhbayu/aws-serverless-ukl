import { createRoot } from "react-dom/client";
import { LoadingBarContainer } from "react-top-loading-bar";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <LoadingBarContainer>
    <Toaster richColors position="bottom-center" />
    <main className="font-nunito bg-white w-full min-h-screen justify-center items-center flex px-20 py-5">
      <App />
    </main>
  </LoadingBarContainer>
);
