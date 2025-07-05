import { Footer } from "@/components/footer";
import Header from "@/components/header";
import AuthHanlder from "@/handlers/auth-handler";
import { Outlet } from "react-router-dom";

export const PublicLayout = () => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* handler to store the user data */}
      <AuthHanlder />
      <Header />
      <div className="relative z-10">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
