import React from "react";
import { Outlet } from "react-router-dom";

import { ThemeProvider } from "../ui/theme-provider";
import { Navbar } from "./Navbar";

export const Layout: React.FC = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <div className="bg-gray-50 flex w-full min-h-screen">
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};
