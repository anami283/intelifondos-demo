"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { planilla } from "@/data/demo-data";
import { formatCOP } from "@/lib/utils";
import { toast } from "sonner";
import { Download, Send, CheckCircle } from "lucide-react";

function exportCSV() {
  const headers = ["Cédula", "Nombre", "Cargo", "Salario", "Desc. Crédito", "Desc. Ahorro", "Total Desc."];
  const rows = planilla.filas.map((f) => [
    f.cedula,
    f.nombre,
    f.cargo,
    f.salario,
    f.descuento_credito,
    f.descuento_ahorro,
    f.total_descuento,
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
    <div className="min-h-screen bg-[#F8FAFB]">
      <DemoBanner />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1">
          <Header
            title="Planilla de Nómina"
            subtitle={`Período ${planilla.periodo} · ${planilla.filas.length} empleados`}
          />
          <div className="p-6 space-y-5">
            {/* Resumen */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total descuentos", val: totalDescuentos, color: "text-[#0A2540]" },
                { label: "Descuentos crédito", val: totalCreditos, color: "text-[#6C63FF]" },
                { label: "Descuentos ahorro", val: totalAhorros, color: "text-[#00B894]" },
              ].map((k) => (
                <div key={k.label} className="bg-white rounded-xl border border-gray-100 p-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{k.label}</p>
                  <p className={`text-xl font-bold ${k.color}`}>{formatCOP(k.val)}</p>
                </div>
              ))}
            </div>

            {/* Tabla + acciones */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Detalle planilla — {planilla.periodo}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={exportCSV}
                    className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    Exportar CSV
                  </button>
                  <button
                    onClick={() =>
                      toast.success("✓ Planilla enviada a RRHH correctamente", {
                        description: `Período ${planilla.periodo} · ${planilla.filas.length} empleados`,
                        duration: 4000,
                      })
                    }
                    className="flex items-center gap-1.5 text-xs bg-[#00B894] hover:bg-[#00a884] text-white font-medium px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Send className="w-3 h-3" />
                    Enviar a RRHH
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-left text-xs text-gray-500 font-medium uppercase tracking-wider">
                    <tr>
                      <th className="px-3 py-2.5">Cédula</th>
                      <th className="px-3 py-2.5">Nombre</th>
                      <th className="px-3 py-2.5">Cargo</th>
                      <th className="px-3 py-2.5">Salario</th>
                      <th className="px-3 py-2.5">Desc. Crédito</th>
                      <th className="px-3 py-2.5">Desc. Ahorro</th>
                      <th className="px-3 py-2.5">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {planilla.filas.map((f) => (
                      <tr key={f.cedula} className="hover:bg-gray-50">
                        <td className="px-3 py-3 font-mono text-xs text-gray-500">
                          {f.cedula}
                        </td>
                        <td className="px-3 py-3 font-medium text-gray-800">
                          {f.nombre}
                        </td>
                        <td className="px-3 py-3 text-gray-600 text-xs">{f.cargo}</td>
                        <td className="px-3 py-3 text-gray-700">
                          {formatCOP(f.salario)}
                        </td>
                        <td className="px-3 py-3 text-[#6C63FF] font-medium">
                          {f.descuento_credito > 0 ? formatCOP(f.descuento_credito) : "—"}
                        </td>
                        <td className="px-3 py-3 text-[#00B894] font-medium">
                          {formatCOP(f.descuento_ahorro)}
                        </td>
                        <td className="px-3 py-3 font-bold text-[#0A2540]">
                          {formatCOP(f.total_descuento)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50 border-t-2 border-gray-200">
                    <tr>
                      <td colSpan={3} className="px-3 py-3 text-xs font-bold text-gray-600 uppercase">
                        Total período
                      </td>
                      <td className="px-3 py-3 font-bold text-gray-800">
                        {formatCOP(planilla.filas.reduce((s, f) => s + f.salario, 0))}
                      </td>
                      <td className="px-3 py-3 font-bold text-[#6C63FF]">
                        {formatCOP(totalCreditos)}
                      </td>
                      <td className="px-3 py-3 font-bold text-[#00B894]">
                        {formatCOP(totalAhorros)}
                      </td>
                      <td className="px-3 py-3 font-bold text-[#0A2540]">
                        {formatCOP(totalDescuentos)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-lg p-3">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <p className="text-sm text-green-700">
                Planilla del período <strong>{planilla.periodo}</strong> lista para envío.{" "}
                {planilla.filas.length} empleados registrados.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
