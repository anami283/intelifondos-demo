import { DemoBanner } from "@/components/layout/DemoBanner";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <DemoBanner />
      <Sidebar />
      <main
        className="pt-10 lg:pl-64 min-h-screen"
        style={{ background: "#f8fafc" }}
      >
        {children}
      </main>
    </div>
  );
}
