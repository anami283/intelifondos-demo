import { DemoBanner } from "@/components/layout/DemoBanner";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#f8fafc" }}>
      <DemoBanner />
      <Sidebar />
      <main
        style={{
          paddingTop: "2.5rem",
          paddingLeft: "16rem",
          minHeight: "100vh",
          background: "#f8fafc",
        }}
      >
        {children}
      </main>
    </div>
  );
}
