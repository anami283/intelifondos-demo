import { Header } from "@/components/layout/Header";
import { ChatGemini } from "@/components/ia/ChatGemini";
import { Brain } from "lucide-react";

export default function IAPage() {
  return (
    <>
      <Header
        title="Asistente Financiero IA"
        subtitle="Gemini 1.5 Flash · Datos COFEM en tiempo real"
      />
      <div className="p-4 lg:p-6">
        <div className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 mb-6 w-fit">
          <Brain className="w-4 h-4 text-indigo-600" />
          <span className="text-sm font-medium text-indigo-700">
            Este chat usa Gemini API real · Las respuestas son generadas por IA
          </span>
        </div>
        <ChatGemini />
      </div>
    </>
  );
}
