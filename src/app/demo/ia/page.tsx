import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { ChatGemini } from "@/components/ia/ChatGemini";
import { Brain } from "lucide-react";

export default function IAPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <DemoBanner />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1">
          <Header
            title="Asistente Financiero IA"
            subtitle="Gemini 1.5 Flash · Datos COFEM en tiempo real"
          />
          <div className="p-6">
            <div className="flex items-center gap-2 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-lg px-4 py-2.5 mb-5 w-fit">
              <Brain className="w-4 h-4 text-[#6C63FF]" />
              <span className="text-sm font-medium text-[#6C63FF]">
                Este chat usa Gemini API real · Las respuestas son generadas por IA
              </span>
            </div>
            <ChatGemini />
          </div>
        </main>
      </div>
    </div>
  );
}
