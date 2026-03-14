import Link from "next/link";
import { DemoBanner } from "@/components/layout/DemoBanner";
import {
  Users,
  BarChart2,
  Settings,
  BookOpen,
  ArrowRight,
} from "lucide-react";

const roles = [
  {
    title: "Asociado",
    icon: <Users className="w-8 h-8" />,
    desc: "Consulta el estado de tus créditos, saldos y aplica a nuevas solicitudes.",
    href: "/demo/solicitudes",
    color: "from-[#0A2540] to-[#1a3a5c]",
    badge: "Vista Asociado",
  },
  {
    title: "Comité de Crédito",
    icon: <BarChart2 className="w-8 h-8" />,
    desc: "Revisa solicitudes con el apoyo del score IA. Aprueba o rechaza con un clic.",
    href: "/demo/solicitudes",
    color: "from-[#00B894] to-[#00a884]",
    badge: "Vista Comité",
    highlight: true,
  },
  {
    title: "Administrador",
    icon: <Settings className="w-8 h-8" />,
    desc: "Dashboard completo: cartera, KPIs, alertas de mora y análisis de portafolio.",
    href: "/demo/dashboard",
    color: "from-[#6C63FF] to-[#5b52e8]",
    badge: "Vista Admin",
  },
  {
    title: "Contador / RRHH",
    icon: <BookOpen className="w-8 h-8" />,
    desc: "Gestión de planilla, exportación de nómina e integración con sistemas de RRHH.",
    href: "/demo/nomina",
    color: "from-[#0A2540] to-[#6C63FF]",
    badge: "Vista Contable",
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <DemoBanner />
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#0A2540] mb-3">
            Seleccione su rol
          </h1>
          <p className="text-gray-500 text-lg">
            Explore la plataforma desde la perspectiva de cada usuario
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {roles.map((role) => (
            <Link key={role.title} href={role.href}>
              <div
                className={`relative rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform duration-200 shadow-sm ${
                  role.highlight ? "ring-2 ring-[#00B894]" : ""
                } bg-gradient-to-br ${role.color} text-white`}
              >
                <span className="absolute top-4 right-4 text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
                  {role.badge}
                </span>
                <div className="mb-4 opacity-90">{role.icon}</div>
                <h2 className="text-xl font-bold mb-2">{role.title}</h2>
                <p className="text-white/75 text-sm leading-relaxed mb-4">
                  {role.desc}
                </p>
                <div className="flex items-center gap-1 text-white/80 text-sm font-medium">
                  Explorar
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/demo/ia"
            className="inline-flex items-center gap-2 bg-[#6C63FF] hover:bg-[#5b52e8] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-white pulse-verde" />
            Probar Asistente IA (Gemini real)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
