import { Container } from "@/components/container";
import { Footer } from "@/components/footer";

import Header from "@/components/header";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-premiumDark via-[#181F2A] to-[#1a2236] overflow-hidden">
      {/* 3D Glowing Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-500 opacity-30 rounded-full blur-3xl animate-blob1 z-0" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-500 opacity-20 rounded-full blur-3xl animate-blob2 z-0" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-400 opacity-20 rounded-full blur-3xl animate-blob3 z-0" />
      <Header />
      <Container className="flex-grow relative z-10">
        <main className="flex-grow">
          <Outlet />
        </main>
      </Container>
      <Footer />
      {/* Animations and 3D blob keyframes */}
      <style>{`
        .animate-blob1 { animation: blobMove1 12s ease-in-out infinite alternate; }
        .animate-blob2 { animation: blobMove2 14s ease-in-out infinite alternate; }
        .animate-blob3 { animation: blobMove3 16s ease-in-out infinite alternate; }
        @keyframes blobMove1 { 0% { transform: scale(1) translateY(0); } 100% { transform: scale(1.1) translateY(40px); } }
        @keyframes blobMove2 { 0% { transform: scale(1) translateY(0); } 100% { transform: scale(1.2) translateY(-30px); } }
        @keyframes blobMove3 { 0% { transform: scale(1) translateY(0); } 100% { transform: scale(1.15) translateY(30px); } }
      `}</style>
    </div>
  );
};
