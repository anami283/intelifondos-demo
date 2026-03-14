import { notFound } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { ScoreIA } from "@/components/solicitudes/ScoreIA";
import { solicitudes } from "@/data/demo-data";
import { formatCOP } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return solicitudes.map((s) => ({ id: s.id }));
}

export default async function SolicitudDetailPage({ params }: Props) {
  const { id } = await params;
  const solicitud = solicitudes.find((s) => s.id === id);
  if (!solicitud) notFound();

  const { asociado } = solicitud;
  const totalDescuentos = asociado.descuentos + solicitud.cuota_mensual;
  const salarioNeto = asociado.salario - totalDescuentos;
  const porcentajeEndeudamiento = (totalDescuentos / asociado.salario) * 100;

  // Calcular amortización (simplificada)
  const tasa = 0.018; // 1.8% mensual
  const amortizacion = [];
  let saldo = solicitud.monto;
  const cuota = solicitud.cuota_mensual;
  for (let i = 1; i <= Math.min(6, solicitud.plazo); i++) {
    const interes = saldo * tasa;
    const capital = cuota - interes;
    saldo -= capital;
    amortizacion.push({ mes: i, cuota, interes: Math.round(interes), capital: Math.round(capital), saldo: Math.max(0, Math.round(saldo)) });
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      <DemoBanner />
      <div className="flex">
        <Sidebar />
        <main className="ml-64 flex-1">
          <Header
            title={`Solicitud ${solicitud.numero}`}
            subtitle={`${asociado.nombre} · Score IA`}
          />
          <div className="p-6">
            <Link
              href="/demo/solicitudes"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-5"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver a solicitudes
            </Link>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Columna izquierda */}
              <div className="space-y-5">
                {/* Datos del asociado */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">
                    Perfil del Asociado
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { label: "Nombre", val: asociado.nombre },
                      { label: "Cédula", val: asociado.cedula },
                      { label: "Cargo", val: asociado.cargo },
                      { label: "Antigüedad", val: `${asociado.antiguedad} años` },
                      { label: "Salario", val: formatCOP(asociado.salario) },
                      { label: "Descuentos actuales", val: formatCOP(asociado.descuentos) },
                      { label: "Ahorros en fondo", val: formatCOP(asociado.ahorros) },
                      { label: "Salario neto disponible", val: formatCOP(salarioNeto) },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="font-medium text-gray-800">{item.val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-500">Endeudamiento con nueva cuota</span>
                      <span
                        className="font-semibold"
                        style={{
                          color:
                            porcentajeEndeudamiento <= 30
                              ? "#00B894"
                              : porcentajeEndeudamiento <= 40
                              ? "#f59e0b"
                              : "#ef4444",
                        }}
                      >
                        {porcentajeEndeudamiento.toFixed(1)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${Math.min(100, porcentajeEndeudamiento)}%`,
                          backgroundColor:
                            porcentajeEndeudamiento <= 30
                              ? "#00B894"
                              : porcentajeEndeudamiento <= 40
                              ? "#f59e0b"
                              : "#ef4444",
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Límite regulatorio: 30%</p>
                  </div>
                </div>

                {/* Datos de la solicitud */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">
                    Detalle de la Solicitud
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {[
                      { label: "Tipo de crédito", val: solicitud.tipo.charAt(0).toUpperCase() + solicitud.tipo.slice(1) },
                      { label: "Monto solicitado", val: formatCOP(solicitud.monto) },
                      { label: "Plazo", val: `${solicitud.plazo} meses` },
                      { label: "Cuota mensual", val: formatCOP(solicitud.cuota_mensual) },
                      { label: "Fecha solicitud", val: solicitud.fecha },
                      { label: "Número", val: solicitud.numero },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs text-gray-400">{item.label}</p>
                        <p className="font-medium text-gray-800">{item.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabla amortización */}
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4">
                    Amortización (primeros 6 meses)
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="text-gray-400 text-left border-b border-gray-50">
                          <th className="pb-2 font-medium">Mes</th>
                          <th className="pb-2 font-medium">Cuota</th>
                          <th className="pb-2 font-medium">Interés</th>
                          <th className="pb-2 font-medium">Capital</th>
                          <th className="pb-2 font-medium">Saldo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {amortizacion.map((row) => (
                          <tr key={row.mes}>
                            <td className="py-2 text-gray-500">{row.mes}</td>
                            <td className="py-2 font-medium">{formatCOP(row.cuota)}</td>
                            <td className="py-2 text-red-500">{formatCOP(row.interes)}</td>
                            <td className="py-2 text-[#00B894]">{formatCOP(row.capital)}</td>
                            <td className="py-2 text-gray-700">{formatCOP(row.saldo)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Columna derecha — Score IA (WOW) */}
              <div>
                <ScoreIA solicitud={solicitud} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
