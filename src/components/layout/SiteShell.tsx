"use client";

import { AnnouncementBar } from "./AnnouncementBar";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { ToastNotifications } from "@/components/ui/ToastNotifications";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <AnnouncementBar />
      <Header />
      <main className="min-w-0 flex-1">{children}</main>
      <Footer />
      <ToastNotifications />
    </div>
  );
}
