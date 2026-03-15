"use client";

import { Header } from "@/components/layout/Header";
import { planilla } from "@/data/demo-data";
import { formatCOP } from "@/lib/utils";
import { toast } from "sonner";
import { Download, Send, CheckCircle } from "lucide-react";

function exportCSV() {
    const headers = ["Cedula", "Nombre", "Cargo", "Salario", "Desc. Credito", "Desc. Ahorro", "Total Desc."];
    const rows = planilla.filas.map((f) => [
          f.cedula, f.nombre, f.cargo, f.salario,
          f.descuento_credito, f.descuento_ahorro, f.total_descuento,
        ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `planilla_COFEM_${planilla.periodo}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

export default function NominaPage() {
    const totalDescuentos = planilla.filas.reduce((s, f) => s + f.total_descuento, 0);
    const totalCreditos = planilla.filas.reduce((s, f) => s + f.descuento_credito, 0);
    const totalAhorros = planilla.filas.reduce((s, f) => s + f.descuento_ahorro, 0);

  return (
        <>
              <Header
                        title="Planilla de Nomina"
                        subtitle={`Periodo ${planilla.periodo} - ${planilla.filas.length} empleados`}
                        breadcrumb="Nomina"
                      />
              <div className="p-5 lg:p-6 space-y-5">
              
                {/* Resumen */}
                      <div className="grid grid-cols-3 gap-4">
                        {[
          { label: "Total descuentos", val: totalDescuentos, color: "#0A2540", bg: "rgba(10,37,64,0.06)" },
          { label: "Descuentos credito", val: totalCreditos, color: "#0284c7", bg: "rgba(2,132,199,0.08)" },
          { label: "Descuentos ahorro", val: totalAhorros, color: "#00B894", bg: "rgba(0,184,148,0.08)" },
                    ].map((k) => (
                                  <div
                                                  key={k.label}
                                                  className="bg-white rounded-2xl p-5 hover:shadow-md transition-all"
                                                  style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                                                >
                                                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "#94a3b8" }}>{k.label}</p>p>
                                                <p className="text-xl font-bold" style={{ color: k.color }}>{formatCOP(k.val)}</p>p>
                                                <div className="mt-2 h-1 rounded-full" style={{ background: k.bg }}>
                                                                <div className="h-full rounded-full" style={{ width: "100%", background: k.color, opacity: 0.3 }} />
                                                </div>div>
                                  </div>div>
                                ))}
                      </div>div>
              
                {/* Tabla planilla */}
                      <div
                                  className="bg-white rounded-2xl p-5"
                                  style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                                >
                                <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-sm font-bold" style={{ color: "#0A2540" }}>
                                                          Detalle planilla - {planilla.periodo}
                                            </h3>h3>
                                            <div className="flex gap-2">
                                                          <button
                                                                            onClick={exportCSV}
                                                                            className="flex items-center gap-1.5 text-xs border border-slate-200 px-3 py-1.5 rounded-lg hover:border-slate-300 transition-colors"
                                                                            style={{ color: "#475569" }}
                                                                          >
                                                                          <Download className="w-3 h-3" /> Exportar CSV
                                                          </button>button>
                                                          <button
                                                                            onClick={() => toast.success("Planilla enviada a RRHH correctamente", {
                                                                                                description: `Periodo ${planilla.periodo} - ${planilla.filas.length} empleados`,
                                                                                                duration: 4000,
                                                                            })}
                                                                            className="flex items-center gap-1.5 text-xs text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
                                                                            style={{ background: "#00B894" }}
                                                                          >
                                                                          <Send className="w-3 h-3" /> Enviar a RRHH
                                                          </button>button>
                                            </div>div>
                                </div>div>
                      
                                <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                          <thead style={{ background: "#f8fafc" }}>
                                                                          <tr className="text-left text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#94a3b8" }}>
                                                                                            <th className="px-3 py-2.5">Cedula</th>th>
                                                                                            <th className="px-3 py-2.5">Nombre</th>th>
                                                                                            <th className="px-3 py-2.5">Cargo</th>th>
                                                                                            <th className="px-3 py-2.5">Salario</th>th>
                                                                                            <th className="px-3 py-2.5">Desc. Credito</th>th>
                                                                                            <th className="px-3 py-2.5">Desc. Ahorro</th>th>
                                                                                            <th className="px-3 py-2.5">Total</th>th>
                                                                          </tr>tr>
                                                          </thead>thead>
                                                          <tbody className="divide-y divide-slate-50">
                                                            {planilla.filas.map((f) => (
                                                    <tr key={f.cedula} className="hover:bg-slate-50 transition-colors">
                                                                        <td className="px-3 py-3 font-mono text-xs" style={{ color: "#64748b" }}>{f.cedula}</td>td>
                                                                        <td className="px-3 py-3 font-semibold" style={{ color: "#0A2540" }}>{f.nombre}</td>td>
                                                                        <td className="px-3 py-3 text-xs" style={{ color: "#64748b" }}>{f.cargo}</td>
                                                                        <td className="px-3 py-3" style={{ color: "#475569" }}>{formatCOP(f.salario)}</td>td>
                                                                        <td className="px-3 py-3 font-medium" style={{ color: "#0284c7" }}>
                                                                          {f.descuento_credito > 0 ? formatCOP(f.descuento_credito) : "-"}
                                                                        </td>td>
                                                                        <td className="px-3 py-3 font-medium" style={{ color: "#00B894" }}>{formatCOP(f.descuento_ahorro)}</td>td>
                                                                        <td className="px-3 py-3 font-bold" style={{ color: "#0A2540" }}>{formatCOP(f.total_descuento)}</td>td>
                                                    </tr>tr>
                                                  ))}
                                                          </tbody>tbody>
                                                          <tfoot style={{ borderTop: "2px solid #e2e8f0", background: "#f8fafc" }}>
                                                                          <tr>
                                                                                            <td colSpan={3} className="px-3 py-3 text-xs font-bold uppercase" style={{ color: "#475569" }}>Total periodo</td>td>
                                                                                            <td className="px-3 py-3 font-bold" style={{ color: "#1e293b" }}>{formatCOP(planilla.filas.reduce((s, f) => s + f.salario, 0))}</td>td>
                                                                                            <td className="px-3 py-3 font-bold" style={{ color: "#0284c7" }}>{formatCOP(totalCreditos)}</td>td>
                                                                                            <td className="px-3 py-3 font-bold" style={{ color: "#00B894" }}>{formatCOP(totalAhorros)}</td>td>
                                                                                            <td className="px-3 py-3 font-bold" style={{ color: "#0A2540" }}>{formatCOP(totalDescuentos)}</td>td>
                                                                          </tr>tr>
                                                          </tfoot>tfoot>
                                            </table>table>
                                </div>div>
                      </div>div>
              
                      <div className="flex items-center gap-2 rounded-xl p-3" style={{ background: "rgba(5,150,105,0.06)", border: "1px solid rgba(5,150,105,0.15)" }}>
                                <CheckCircle className="w-4 h-4" style={{ color: "#059669" }} />
                                <p className="text-sm" style={{ color: "#047857" }}>
                                            Planilla del periodo <strong>{planilla.periodo}</strong>strong> lista para envio.{" "}
                                  {planilla.filas.length} empleados registrados.
                                </p>p>
                      </div>div>
              </div>div>
        </>>
      );
}</>
