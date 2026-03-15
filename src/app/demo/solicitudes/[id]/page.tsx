import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
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

  const tasa = 0.018;
    const amortizacion = [];
    let saldo = solicitud.monto;
    const cuota = solicitud.cuota_mensual;
    for (let i = 1; i <= Math.min(6, solicitud.plazo); i++) {
          const interes = saldo * tasa;
          const capital = cuota - interes;
          saldo -= capital;
          amortizacion.push({
                  mes: i,
                  cuota,
                  interes: Math.round(interes),
                  capital: Math.round(capital),
                  saldo: Math.max(0, Math.round(saldo)),
          });
    }

  const deudaColor = porcentajeEndeudamiento <= 30 ? "#059669" : porcentajeEndeudamiento <= 40 ? "#d97706" : "#dc2626";

  return (
        <>
              <Header
                        title={`Solicitud ${solicitud.numero}`}
                        subtitle={`${asociado.nombre} - Score IA`}
                        breadcrumb="Solicitudes"
                      />
              <div className="p-5 lg:p-6">
                      <Link
                                  href="/demo/solicitudes"
                                  className="inline-flex items-center gap-1.5 text-sm mb-5 transition-colors"
                                  style={{ color: "#64748b" }}
                                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#0A2540"; }}
                                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#64748b"; }}
                                >
                                <ArrowLeft className="w-4 h-4" />
                                Volver a solicitudes
                      </Link>Link>
              
                      <div className="grid lg:grid-cols-2 gap-6">
                        {/* Columna izquierda */}
                                <div className="space-y-5">
                                
                                  {/* Perfil asociado */}
                                            <div
                                                            className="bg-white rounded-2xl p-6"
                                                            style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                                                          >
                                                          <h3 className="text-sm font-bold mb-4" style={{ color: "#0A2540" }}>Perfil del Asociado</h3>h3>
                                                          <div className="grid grid-cols-2 gap-3 text-sm">
                                                            {[
                                                            { label: "Nombre", val: asociado.nombre },
                                                            { label: "Cedula", val: asociado.cedula },
                                                            { label: "Cargo", val: asociado.cargo },
                                                            { label: "Antiguedad", val: `${asociado.antiguedad} anos` },
                                                            { label: "Salario", val: formatCOP(asociado.salario) },
                                                            { label: "Descuentos actuales", val: formatCOP(asociado.descuentos) },
                                                            { label: "Ahorros en fondo", val: formatCOP(asociado.ahorros) },
                                                            { label: "Salario neto disponible", val: formatCOP(salarioNeto) },
                                                                            ].map((item) => (
                                                                                                <div key={item.label}>
                                                                                                                    <p className="text-xs mb-0.5" style={{ color: "#94a3b8" }}>{item.label}</p>p>
                                                                                                                    <p className="font-semibold" style={{ color: "#1e293b" }}>{item.val}</p>p>
                                                                                                  </div>div>
                                                                                              ))}
                                                          </div>div>
                                            
                                                          <div className="mt-4 pt-4" style={{ borderTop: "1px solid #f1f5f9" }}>
                                                                          <div className="flex justify-between text-xs mb-1.5">
                                                                                            <span style={{ color: "#64748b" }}>Endeudamiento con nueva cuota</span>span>
                                                                                            <span className="font-bold" style={{ color: deudaColor }}>
                                                                                              {porcentajeEndeudamiento.toFixed(1)}%
                                                                                              </span>span>
                                                                          </div>div>
                                                                          <div className="h-2 rounded-full overflow-hidden" style={{ background: "#f1f5f9" }}>
                                                                                            <div
                                                                                                                  className="h-full rounded-full transition-all duration-1000"
                                                                                                                  style={{
                                                                                                                                          width: `${Math.min(100, porcentajeEndeudamiento)}%`,
                                                                                                                                          background: deudaColor,
                                                                                                                    }}
                                                                                                                />
                                                                          </div>div>
                                                                          <p className="text-xs mt-1" style={{ color: "#94a3b8" }}>Limite regulatorio: 30%</p>p>
                                                          </div>div>
                                            </div>div>
                                
                                  {/* Detalle solicitud */}
                                            <div
                                                            className="bg-white rounded-2xl p-6"
                                                            style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                                                          >
                                                          <h3 className="text-sm font-bold mb-4" style={{ color: "#0A2540" }}>Detalle de la Solicitud</h3>h3>
                                                          <div className="grid grid-cols-2 gap-3 text-sm">
                                                            {[
                                                            { label: "Tipo de credito", val: solicitud.tipo.charAt(0).toUpperCase() + solicitud.tipo.slice(1) },
                                                            { label: "Monto solicitado", val: formatCOP(solicitud.monto) },
                                                            { label: "Plazo", val: `${solicitud.plazo} meses` },
                                                            { label: "Cuota mensual", val: formatCOP(solicitud.cuota_mensual) },
                                                            { label: "Fecha solicitud", val: solicitud.fecha },
                                                            { label: "Numero", val: solicitud.numero },
                                                                            ].map((item) => (
                                                                                                <div key={item.label}>
                                                                                                                    <p className="text-xs mb-0.5" style={{ color: "#94a3b8" }}>{item.label}</p>p>
                                                                                                                    <p className="font-semibold" style={{ color: "#1e293b" }}>{item.val}</p>p>
                                                                                                  </div>div>
                                                                                              ))}
                                                          </div>div>
                                            </div>div>
                                
                                  {/* Amortizacion */}
                                            <div
                                                            className="bg-white rounded-2xl p-6"
                                                            style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                                                          >
                                                          <h3 className="text-sm font-bold mb-4" style={{ color: "#0A2540" }}>Amortizacion (primeros 6 meses)</h3>h3>
                                                          <div className="overflow-x-auto">
                                                                          <table className="w-full text-xs">
                                                                                            <thead>
                                                                                                                <tr className="text-left pb-2" style={{ color: "#94a3b8" }}>
                                                                                                                                      <th className="pb-2 font-semibold">Mes</th>th>
                                                                                                                                      <th className="pb-2 font-semibold">Cuota</th>th>
                                                                                                                                      <th className="pb-2 font-semibold">Interes</th>th>
                                                                                                                                      <th className="pb-2 font-semibold">Capital</th>th>
                                                                                                                                      <th className="pb-2 font-semibold">Saldo</th>th>
                                                                                                                  </tr>tr>
                                                                                              </thead>thead>
                                                                                            <tbody className="divide-y divide-slate-50">
                                                                                              {amortizacion.map((row) => (
                                                                                  <tr key={row.mes}>
                                                                                                          <td className="py-2" style={{ color: "#64748b" }}>{row.mes}</td>td>
                                                                                                          <td className="py-2 font-medium" style={{ color: "#1e293b" }}>{formatCOP(row.cuota)}</td>td>
                                                                                                          <td className="py-2" style={{ color: "#dc2626" }}>{formatCOP(row.interes)}</td>td>
                                                                                                          <td className="py-2" style={{ color: "#059669" }}>{formatCOP(row.capital)}</td>td>
                                                                                                          <td className="py-2" style={{ color: "#475569" }}>{formatCOP(row.saldo)}</td>td>
                                                                                    </tr>tr>
                                                                                ))}
                                                                                              </tbody>tbody>
                                                                          </table>table>
                                                          </div>div>
                                            </div>div>
                                </div>div>
                      
                        {/* Score IA */}
                                <div>
                                            <ScoreIA solicitud={solicitud} />
                                </div>div>
                      </div>div>
              </div>div>
        </>>
      );
}</>
