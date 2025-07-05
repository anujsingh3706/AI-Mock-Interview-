import { Container } from "@/components/container";
import { Footer } from "@/components/footer";

import Header from "@/components/header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <Header />
      <Container className="flex-grow relative z-10">
        <main className="flex-grow">
          <Outlet />
        </main>
      </Container>
      <Footer />
    </div>
  );
};
