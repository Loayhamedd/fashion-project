// src/components/Layout/MainLayout.jsx - النسخة الصحيحة
import { Outlet } from "react-router-dom"; // ← مهم جداً!
import Navbar from "../Navbar";
import Footer from "../Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />

          <Outlet />

      <Footer />
    </>
  );
};

export default MainLayout;