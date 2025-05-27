import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import Chat from "./Chat";
import { euToUsuario, User } from "./types";
import { useEffect, useState } from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  useEffect(() => {
    initMercadoPago("TEST-2ee88f3a-25ea-4a80-86db-a89899c6be44");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <div className="flex items-center">
          {/* Botão Hamburger */}
          <button
            className="menu-toggle mr-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="black"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <h2 className="text-xl font-semibold accent-text">ChatConvex</h2>
        </div>
        <SignOutButton />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <Content isSidebarOpen={isSidebarOpen} />
      </main>
      <Toaster />
    </div>
  );
}

function Content({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  const loggedInUser: User | null | undefined = useQuery(api.auth.loggedInUser);
  if (loggedInUser === undefined) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <>
      <Authenticated>
        <Chat eu={euToUsuario(loggedInUser)} isSidebarOpen={isSidebarOpen} />
      </Authenticated>

      <Unauthenticated>
        {/* Conteúdo para usuários não logados */}
        <div className="text-center">
          <h1 className="text-5xl font-bold accent-text mb-4">
            Bem-vindo ao ChatConvex
          </h1>
          <p className="text-xl text-slate-600 mb-8">Faça login para começar</p>
          <SignInForm />
        </div>
      </Unauthenticated>
    </>
  );
}