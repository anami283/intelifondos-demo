"use client";
import { useState } from "react";
import { BarChart3, TrendingUp, TrendingDown, Download, FileText, Calendar, ChevronDown, DollarSign, Users, CreditCard, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { kpis_mensuales, cartera, solicitudes, planilla, fondo, formatCOP } from "@/data/demo-data";

const MESES = kpis_mensuales.map((k) => k.mes);
const MAX_DESEMBOLSO = Math.max(...kpis_mensuales.map((k) => k.desembolsos));
const MAX_RECAUDO = Math.max(...kpis_mensuales.map((k) => k.recaudo));
const MAXIMO = Math.max(MAX_DESEMBOLSO, MAX_RECAUDO);

const pct = (v: number) => Math.round((v / MAXIMO) * 100);

const aprobadas = solicitudes.filter((s) => s.estado === "aprobada" || s.estado === "desembolsada").length;
const rechazadas = solicitudes.filter((s) => s.estado === "rechazada").length;
const pendientes = solicitudes.filter((s) => s.estado === "pendiente" || s.estado === "en_revision").length;
const totalSol = solicitudes.length;

const porTipo = ["ordinario", "emergencia", "educacion", "vivienda"].map((tipo) => ({
  tipo,
  count: solicitudes.filter((s) => s.tipo === tipo).length,
  monto: solicitudes.filter((s) => s.tipo === tipo).reduce((a, b) => a + b.monto, 0),
}));

const TIPO_LABELS: Record<string, string> = {
  ordinario: "Ordinario",
  emergencia: "Emergencia",
  educacion: "Educacion",
  vivienda: "Vivienda",
};

const TIPO_COLORS: Record<string, string> = {
  ordinario: "#0284c7",
  emergencia: "#dc2626",
  educacion: "#d97706",
  vivienda: "#00B894",
};

const REPORTES_LIST = [
  { id: "cartera", label: "Informe de Cartera", desc: "Estado creditos, mora, recaudo", icon: CreditCard, size: "24 KB" },
  { id: "nomina", label: "Planilla Nomina Marzo", desc: "Descuentos y aportes asociados", icon: Users, size: "18 KB" },
  { id: "solicitudes", label: "Solicitudes Pendientes", desc: "Reporte comite credito", icon: FileText, size: "12 KB" },
  { id: "ejecutivo", label: "Informe Ejecutivo", desc: "Resumen gerencia marzo 2025", icon: BarChart3, size: "31 KB" },
];

function StatCard({ label, value, sub, color, icon: Icon, trend }: { label: string; value: string; sub: string; color: string; icon: React.ElementType; trend?: number }) {
  const up = trend !== undefined && trend >= 0;
  return (
    <div style={{
      background: "#ffffff",
      borderRadius: "0.875rem",
      padding: "1.25rem",
      border: "1px solid #e2e8f0",
      boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon style={{ width: "1.125rem", height: "1.125rem", color: color }} />
        </div>
        {trend !== undefined && (
          <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.7rem", fontWeight: 700, color: up ? "#059669" : "#dc2626", background: up ? "#d1fae5" : "#fee2e2", padding: "0.2rem 0.5rem", borderRadius: "9999px" }}>
            {up ? <TrendingUp style={{ width: "0.75rem", height: "0.75rem" }} /> : <TrendingDown style={{ width: "0.75rem", height: "0.75rem" }} />}
            {up ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0A2540", letterSpacing: "-0.02em", marginBottom: "0.2rem" }}>{value}</div>
      <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#64748b", marginBottom: "0.1rem" }}>{label}</div>
      <div style={{ fontSize: "0.6875rem", color: "#94a3b8" }}>{sub}</div>
    </div>
  );
}

export default function ReportesPage() {
  const [periodo, setPeriodo] = useState("Marzo 2025");
  const [downloaded, setDownloaded] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloaded(id);
    setTimeout(() => setDownloaded(null), 2000);
  };

  const ultMes = kpis_mensuales[kpis_mensuales.length - 1];
  const penMes = kpis_mensuales[kpis_mensuales.length - 2];
  const varDesembolso = Math.round(((ultMes.desembolsos - penMes.desembolsos) / penMes.desembolsos) * 100);
  const varRecaudo = Math.round(((ultMes.recaudo - penMes.recaudo) / penMes.recaudo) * 100);

  return (
    <>
      {/* Header */}
      <div style={{
        background: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: "2.5rem",
        zIndex: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#7c3aed15", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BarChart3 style={{ width: "1.125rem", height: "1.125rem", color: "#7c3aed" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "1rem", fontWeight: 700, color: "#0A2540", marginBottom: "0.1rem" }}>Reportes y Analitica</h1>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{"Fondo " + fondo.nombre + " — " + fondo.ciudad}</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.5rem 0.875rem",
            borderRadius: "0.5rem",
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#475569",
            cursor: "pointer",
          }}>
            <Calendar style={{ width: "0.875rem", height: "0.875rem" }} />
            {periodo}
            <ChevronDown style={{ width: "0.75rem", height: "0.75rem" }} />
          </button>
          <button style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.5rem 0.875rem",
            borderRadius: "0.5rem",
            border: "none",
            background: "#0A2540",
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "#ffffff",
            cursor: "pointer",
          }}>
            <Download style={{ width: "0.875rem", height: "0.875rem" }} />
            Exportar todo
          </button>
        </div>
      </div>

      <div style={{ padding: "1.5rem" }}>

        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          <StatCard
            label="Cartera Total"
            value={formatCOP(cartera.total)}
            sub={"127 creditos activos · ICV " + cartera.icv + "%"}
            color="#0A2540"
            icon={DollarSign}
            trend={9}
          />
          <StatCard
            label="Desembolsos Marzo"
            value={formatCOP(ultMes.desembolsos)}
            sub="vs febrero: $74.000.000"
            color="#00B894"
            icon={TrendingUp}
            trend={varDesembolso}
          />
          <StatCard
            label="Recaudo Marzo"
            value={formatCOP(ultMes.recaudo)}
            sub={"Planilla " + planilla.periodo + " procesada"}
            color="#0284c7"
            icon={CheckCircle2}
            trend={varRecaudo}
          />
          <StatCard
            label="Tasa de Aprobacion"
            value={Math.round((aprobadas / totalSol) * 100) + "%"}
            sub={aprobadas + " aprobadas de " + totalSol + " solicitudes"}
            color="#d97706"
            icon={FileText}
            trend={5}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>

          {/* Desembolsos vs Recaudo Chart */}
          <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "1.25rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div>
                <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0A2540", marginBottom: "0.2rem" }}>Desembolsos vs Recaudo</h2>
                <p style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Ultimos 6 meses — millones COP</p>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.65rem", color: "#64748b" }}>
                  <span style={{ width: "0.625rem", height: "0.625rem", borderRadius: "2px", background: "#0A2540", display: "inline-block" }} />Desembolsos
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.65rem", color: "#64748b" }}>
                  <span style={{ width: "0.625rem", height: "0.625rem", borderRadius: "2px", background: "#00B894", display: "inline-block" }} />Recaudo
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.625rem", height: "160px" }}>
              {kpis_mensuales.map((k) => (
                <div key={k.mes} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem", height: "100%" }}>
                  <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "2px" }}>
                    <div style={{ width: "45%", height: pct(k.desembolsos) + "%", background: "#0A2540", borderRadius: "3px 3px 0 0", marginLeft: "2px", transition: "height 0.3s", minHeight: "4px" }} />
                  </div>
                  <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "2px", position: "absolute" }} />
                </div>
              ))}
            </div>
            {/* Simplified grouped bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: "140px", marginTop: "-140px" }}>
              {kpis_mensuales.map((k) => (
                <div key={k.mes} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "2px", height: "120px" }}>
                    <div style={{ width: "42%", height: pct(k.desembolsos) + "%", background: "#0A2540", borderRadius: "3px 3px 0 0", minHeight: "4px", transition: "height 0.4s ease" }} title={"Des: " + formatCOP(k.desembolsos)} />
                    <div style={{ width: "42%", height: pct(k.recaudo) + "%", background: "#00B894", borderRadius: "3px 3px 0 0", minHeight: "4px", transition: "height 0.4s ease" }} title={"Rec: " + formatCOP(k.recaudo)} />
                  </div>
                  <div style={{ fontSize: "0.6rem", color: "#94a3b8", marginTop: "0.3rem" }}>{k.mes}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Solicitudes por Tipo */}
          <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "1.25rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ marginBottom: "1rem" }}>
              <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0A2540", marginBottom: "0.2rem" }}>Solicitudes por Modalidad</h2>
              <p style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Distribucion por tipo de credito</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              {porTipo.map((t) => (
                <div key={t.tipo}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ width: "0.625rem", height: "0.625rem", borderRadius: "2px", background: TIPO_COLORS[t.tipo], display: "inline-block" }} />
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#0A2540" }}>{TIPO_LABELS[t.tipo]}</span>
                    </div>
                    <div style={{ display: "flex", gap: "1rem" }}>
                      <span style={{ fontSize: "0.7rem", color: "#64748b" }}>{t.count} sols.</span>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#0A2540" }}>{formatCOP(t.monto)}</span>
                    </div>
                  </div>
                  <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "3px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: Math.round((t.count / totalSol) * 100) + "%", background: TIPO_COLORS[t.tipo], borderRadius: "3px", transition: "width 0.4s ease" }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Status summary */}
            <div style={{ display: "flex", gap: "0.625rem", marginTop: "1.25rem", padding: "0.875rem", background: "#f8fafc", borderRadius: "0.625rem" }}>
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "#059669" }}>{aprobadas}</div>
                <div style={{ fontSize: "0.65rem", color: "#64748b" }}>Aprobadas</div>
              </div>
              <div style={{ width: "1px", background: "#e2e8f0" }} />
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "#d97706" }}>{pendientes}</div>
                <div style={{ fontSize: "0.65rem", color: "#64748b" }}>En Revision</div>
              </div>
              <div style={{ width: "1px", background: "#e2e8f0" }} />
              <div style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "#dc2626" }}>{rechazadas}</div>
                <div style={{ fontSize: "0.65rem", color: "#64748b" }}>Rechazadas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mora Analysis */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
          <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "1.25rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0A2540", marginBottom: "0.2rem" }}>Analisis de Mora</h2>
            <p style={{ fontSize: "0.7rem", color: "#94a3b8", marginBottom: "1rem" }}>Creditos con dias de atraso</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ padding: "0.875rem", borderRadius: "0.5rem", background: "#fef3c7", border: "1px solid #fde68a" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#92400e" }}>Mora 1-30 dias</span>
                  <AlertTriangle style={{ width: "1rem", height: "1rem", color: "#d97706" }} />
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#92400e" }}>{formatCOP(cartera.mora_30)}</div>
                <div style={{ fontSize: "0.65rem", color: "#a16207" }}>1 credito afectado</div>
              </div>
              <div style={{ padding: "0.875rem", borderRadius: "0.5rem", background: "#fee2e2", border: "1px solid #fecaca" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#991b1b" }}>Mora mayor 30 dias</span>
                  <AlertTriangle style={{ width: "1rem", height: "1rem", color: "#dc2626" }} />
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#991b1b" }}>{formatCOP(cartera.mora_mas30)}</div>
                <div style={{ fontSize: "0.65rem", color: "#b91c1c" }}>2 creditos criticos</div>
              </div>
              <div style={{ padding: "0.875rem", borderRadius: "0.5rem", background: "#d1fae5", border: "1px solid #a7f3d0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#065f46" }}>Al dia</span>
                  <CheckCircle2 style={{ width: "1rem", height: "1rem", color: "#059669" }} />
                </div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#065f46" }}>{formatCOP(cartera.total - cartera.mora_30 - cartera.mora_mas30)}</div>
                <div style={{ fontSize: "0.65rem", color: "#047857" }}>ICV: {cartera.icv}% — Saludable</div>
              </div>
            </div>
          </div>

          {/* Reportes disponibles */}
          <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "1.25rem", border: "1px solid #e2e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <div>
                <h2 style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0A2540", marginBottom: "0.2rem" }}>Reportes Disponibles</h2>
                <p style={{ fontSize: "0.7rem", color: "#94a3b8" }}>Generados automaticamente · Periodo actual</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {REPORTES_LIST.map((r) => {
                const Icon = r.icon;
                const done = downloaded === r.id;
                return (
                  <div key={r.id} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "0.875rem",
                    borderRadius: "0.625rem",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                  }}>
                    <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#0A254012", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon style={{ width: "1rem", height: "1rem", color: "#0A2540" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0A2540" }}>{r.label}</div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b" }}>{r.desc}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>{r.size}</span>
                      <button
                        onClick={() => handleDownload(r.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.25rem",
                          padding: "0.35rem 0.75rem",
                          borderRadius: "0.375rem",
                          border: "none",
                          background: done ? "#d1fae5" : "#0A2540",
                          color: done ? "#059669" : "#ffffff",
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {done ? <CheckCircle2 style={{ width: "0.75rem", height: "0.75rem" }} /> : <Download style={{ width: "0.75rem", height: "0.75rem" }} />}
                        {done ? "Descargado" : "Descargar"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "1rem", padding: "0.75rem", borderRadius: "0.5rem", background: "rgba(0,184,148,0.06)", border: "1px solid rgba(0,184,148,0.2)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock style={{ width: "0.875rem", height: "0.875rem", color: "#00B894", flexShrink: 0 }} />
              <span style={{ fontSize: "0.7rem", color: "#047857" }}>Reportes generados automaticamente el 13 de marzo de 2025 a las 17:00</span>
            </div>
          </div>
        </div>

        {/* Score IA promedio */}
        <div style={{ background: "linear-gradient(135deg, #0A2540 0%, #0d3260 100%)", borderRadius: "0.875rem", padding: "1.5rem", color: "#ffffff" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.375rem" }}>Resumen IA Score del Mes</h2>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>Evaluacion automatica de riesgo crediticio · Gemini AI</p>
            </div>
            <div style={{ display: "flex", gap: "2rem" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#00B894" }}>{Math.round(solicitudes.reduce((a, b) => a + b.score_ia, 0) / solicitudes.length)}</div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>Score promedio</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#38bdf8" }}>{solicitudes.filter((s) => s.recomendacion_ia === "APROBAR").length}</div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>IA recomienda aprobar</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f59e0b" }}>{solicitudes.filter((s) => s.recomendacion_ia === "REVISAR").length}</div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>IA recomienda revisar</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: 800, color: "#f87171" }}>{solicitudes.filter((s) => s.recomendacion_ia === "RECHAZAR").length}</div>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>IA recomienda rechazar</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

