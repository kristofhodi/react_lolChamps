import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllChamps from "./pages/AllChamps";
import { ToastContainer } from "react-toastify";
import OneChamp from "./pages/OneChamp";
import LoginPage from "./pages/LoginPage";
import AddChamp from "./pages/AddChamp";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllChamps />} />
        <Route path="/champions/:id" element={<OneChamp />} />
        <Route path="/add-champ" element={<AddChamp />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>,
);
