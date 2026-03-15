"use client";
import { useState } from "react";
import { Settings, User, Bell, Shield, Building2, CreditCard, ChevronRight, Check, Save, ToggleLeft, ToggleRight, Info } from "lucide-react";
import { fondo } from "@/data/demo-data";

type Tab = "general" | "notificaciones" | "creditos" | "seguridad" | "integraciones";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "general", label: "Fondo", icon: Building2 },
  { id: "creditos", label: "Creditos", icon: CreditCard },
  { id: "notificaciones", label: "Alertas", icon: Bell },
  { id: "seguridad", label: "Seguridad", icon: Shield },
  { id: "integraciones", label: "Integraciones", icon: Settings },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: "2.5rem",
        height: "1.375rem",
        borderRadius: "9999px",
        border: "none",
        background: enabled ? "#00B894" : "#e2e8f0",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.2s",
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute",
        top: "0.1875rem",
        left: enabled ? "1.25rem" : "0.1875rem",
        width: "1rem",
        height: "1rem",
        borderRadius: "50%",
        background: "#ffffff",
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

function SettingRow({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1rem 0",
      borderBottom: "1px solid #f1f5f9",
      gap: "1rem",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0A2540", marginBottom: "0.1rem" }}>{label}</div>
        {desc && <div style={{ fontSize: "0.7rem", color: "#94a3b8", lineHeight: "1.4" }}>{desc}</div>}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <h3 style={{ fontSize: "0.9375rem", fontWeight: 700, color: "#0A2540", marginBottom: "0.25rem" }}>{title}</h3>
      <p style={{ fontSize: "0.75rem", color: "#64748b" }}>{desc}</p>
    </div>
  );
}

export default function ConfiguracionPage() {
  const [tab, setTab] = useState<Tab>("general");
  const [saved, setSaved] = useState(false);

  const [notifs, setNotifs] = useState({
    mora: true,
    nuevaSolicitud: true,
    desembolso: true,
    recaudo: false,
    scoreIA: true,
    reporteMensual: true,
    email: true,
    whatsapp: false,
  });

  const [credConfig, setCredConfig] = useState({
    scoreMinimo: 60,
    limiteEndeudamiento: 30,
    plazoMaximo: 84,
    montoMaximo: 50000000,
    antiguedadMinima: 2,
    scoreAutoAprobacion: 85,
  });

  const [seg, setSeg] = useState({
    dobleFA: false,
    sesionTiempo: 30,
    logActividad: true,
    ipWhitelist: false,
  });

  const [integ, setInteg] = useState({
    geminiActivo: true,
    whatsappActivo: false,
    nominaActivo: false,
    exportCSV: true,
    exportPDF: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleNotif = (key: keyof typeof notifs) => setNotifs((p) => ({ ...p, [key]: !p[key] }));
  const toggleSeg = (key: keyof typeof seg) => setSeg((p) => ({ ...p, [key]: !p[key] }));
  const toggleInteg = (key: keyof typeof integ) => setInteg((p) => ({ ...p, [key]: !p[key] }));

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
          <div style={{ width: "2.25rem", height: "2.25rem", borderRadius: "0.5rem", background: "#0A254015", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Settings style={{ width: "1.125rem", height: "1.125rem", color: "#0A2540" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "1rem", fontWeight: 700, color: "#0A2540", marginBottom: "0.1rem" }}>Configuracion</h1>
            <p style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{"Ajustes del sistema — " + fondo.nombreCompleto}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "none",
            background: saved ? "#d1fae5" : "#0A2540",
            color: saved ? "#059669" : "#ffffff",
            fontSize: "0.8125rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {saved ? <Check style={{ width: "0.875rem", height: "0.875rem" }} /> : <Save style={{ width: "0.875rem", height: "0.875rem" }} />}
          {saved ? "Guardado" : "Guardar cambios"}
        </button>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 7rem)" }}>

        {/* Sidebar nav */}
        <nav style={{
          width: "220px",
          background: "#ffffff",
          borderRight: "1px solid #e2e8f0",
          padding: "1.25rem 0.75rem",
          flexShrink: 0,
        }}>
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "0.625rem 0.75rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  background: active ? "#0A2540" : "transparent",
                  color: active ? "#ffffff" : "#64748b",
                  fontSize: "0.8125rem",
                  fontWeight: active ? 700 : 500,
                  cursor: "pointer",
                  marginBottom: "0.25rem",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}
              >
                <Icon style={{ width: "1rem", height: "1rem", flexShrink: 0 }} />
                {t.label}
                {active && <ChevronRight style={{ width: "0.75rem", height: "0.75rem", marginLeft: "auto" }} />}
              </button>
            );
          })}

          {/* Demo info box */}
          <div style={{ marginTop: "auto", padding: "0.75rem", borderRadius: "0.5rem", background: "rgba(0,184,148,0.06)", border: "1px solid rgba(0,184,148,0.2)", marginTop: "1.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.375rem" }}>
              <Info style={{ width: "0.75rem", height: "0.75rem", color: "#00B894" }} />
              <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#047857" }}>Modo demo</span>
            </div>
            <p style={{ fontSize: "0.625rem", color: "#64748b", lineHeight: "1.4" }}>
              Los cambios son visuales y no persisten entre sesiones.
            </p>
          </div>
        </nav>

        {/* Content */}
        <div style={{ flex: 1, padding: "1.5rem", background: "#f8fafc", overflowY: "auto" }}>

          {/* GENERAL */}
          {tab === "general" && (
            <div style={{ maxWidth: "640px" }}>
              <SectionTitle title="Datos del Fondo" desc="Informacion institucional de COFEM" />
              <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "1.25rem", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[
                    { label: "Nombre del fondo", value: fondo.nombre },
                    { label: "Razon social", value: fondo.nombreCompleto },
                    { label: "Ciudad", value: fondo.ciudad },
                    { label: "Departamento", value: fondo.departamento },
                    { label: "NIT", value: fondo.nit },
                    { label: "Anos de operacion", value: fondo.anosOperacion + " anos" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label style={{ fontSize: "0.7rem", fontWeight: 600, color: "#64748b", display: "block", marginBottom: "0.375rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{f.label}</label>
                      <input
                        defaultValue={f.value}
                        style={{
                          width: "100%",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "0.5rem",
                          border: "1px solid #e2e8f0",
                          fontSize: "0.8125rem",
                          color: "#0A2540",
                          background: "#f8fafc",
                          boxSizing: "border-box",
                        }}
                        readOnly
                      />
                    </div>
                  ))}
                </div>
              </div>

              <SectionTitle title="Asociados" desc="Estadisticas actuales del fondo" />
              <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "1.25rem", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                  {[
                    { label: "Total asociados", value: fondo.asociados.toString(), color: "#0A2540" },
                    { label: "Tasa interes mensual", value: "1.8%", color: "#00B894" },
                    { label: "Limite endeudamiento", value: "30%", color: "#d97706" },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center", padding: "1rem", background: "#f8fafc", borderRadius: "0.625rem" }}>
                      <div style={{ fontSize: "1.75rem", fontWeight: 800, color: s.color }}>{s.value}</div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CREDITOS */}
          {tab === "creditos" && (
            <div style={{ maxWidth: "640px" }}>
              <SectionTitle title="Politica de Credito" desc="Parametros para evaluacion y aprobacion automatica" />
              <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "1.25rem", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
                {[
                  { label: "Score minimo para revisar", key: "scoreMinimo", min: 0, max: 100, suffix: "pts" },
                  { label: "Limite de endeudamiento (%)", key: "limiteEndeudamiento", min: 10, max: 50, suffix: "%" },
                  { label: "Plazo maximo (meses)", key: "plazoMaximo", min: 12, max: 120, suffix: "meses" },
                  { label: "Score para auto-aprobacion", key: "scoreAutoAprobacion", min: 70, max: 100, suffix: "pts" },
                ].map((item) => (
                  <div key={item.key} style={{ padding: "1rem 0", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <label style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0A2540" }}>{item.label}</label>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#00B894" }}>
                        {credConfig[item.key as keyof typeof credConfig]} {item.suffix}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={item.min}
                      max={item.max}
                      value={credConfig[item.key as keyof typeof credConfig]}
                      onChange={(e) => setCredConfig((p) => ({ ...p, [item.key]: Number(e.target.value) }))}
                      style={{ width: "100%", accentColor: "#00B894" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem" }}>
                      <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>{item.min}</span>
                      <span style={{ fontSize: "0.65rem", color: "#94a3b8" }}>{item.max}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "rgba(0,184,148,0.06)", border: "1px solid rgba(0,184,148,0.25)", borderRadius: "0.625rem", padding: "0.875rem", display: "flex", gap: "0.625rem" }}>
                <Info style={{ width: "0.875rem", height: "0.875rem", color: "#00B894", flexShrink: 0, marginTop: "0.1rem" }} />
                <p style={{ fontSize: "0.7rem", color: "#047857", lineHeight: "1.5" }}>
                  Solicitudes con score igual o mayor a <strong>{credConfig.scoreAutoAprobacion}</strong> seran pre-aprobadas automaticamente por el sistema IA. El comite puede revocar la decision.
                </p>
              </div>
            </div>
          )}

          {/* NOTIFICACIONES */}
          {tab === "notificaciones" && (
            <div style={{ maxWidth: "640px" }}>
              <SectionTitle title="Alertas del Sistema" desc="Controla que eventos generan notificaciones" />
              <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "0 1.25rem", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
                {[
                  { key: "mora", label: "Alertas de mora", desc: "Notificar cuando un credito entre en mora" },
                  { key: "nuevaSolicitud", label: "Nueva solicitud", desc: "Avisar cuando ingresa una nueva solicitud al sistema" },
                  { key: "desembolso", label: "Desembolsos", desc: "Confirmar cada desembolso procesado" },
                  { key: "recaudo", label: "Recaudo nomina", desc: "Notificar recepcion del archivo de nomina" },
                  { key: "scoreIA", label: "Score IA calculado", desc: "Avisar cuando la IA completa una evaluacion" },
                  { key: "reporteMensual", label: "Reporte mensual", desc: "Enviar informe automatico el primer dia del mes" },
                ].map((item) => (
                  <SettingRow key={item.key} label={item.label} desc={item.desc}>
                    <Toggle enabled={notifs[item.key as keyof typeof notifs]} onChange={() => toggleNotif(item.key as keyof typeof notifs)} />
                  </SettingRow>
                ))}
              </div>

              <SectionTitle title="Canales de Notificacion" desc="Medios para recibir alertas" />
              <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "0 1.25rem", border: "1px solid #e2e8f0" }}>
                {[
                  { key: "email", label: "Correo electronico", desc: "anamilenaa@gmail.com · Activo" },
                  { key: "whatsapp", label: "WhatsApp Business", desc: "Requiere numero registrado" },
                ].map((item) => (
                  <SettingRow key={item.key} label={item.label} desc={item.desc}>
                    <Toggle enabled={notifs[item.key as keyof typeof notifs]} onChange={() => toggleNotif(item.key as keyof typeof notifs)} />
                  </SettingRow>
                ))}
              </div>
            </div>
          )}

          {/* SEGURIDAD */}
          {tab === "seguridad" && (
            <div style={{ maxWidth: "640px" }}>
              <SectionTitle title="Control de Acceso" desc="Configuracion de autenticacion y sesiones" />
              <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "0 1.25rem", border: "1px solid #e2e8f0", marginBottom: "1.5rem" }}>
                {[
                  { key: "dobleFA", label: "Autenticacion de dos factores", desc: "Requiere OTP al iniciar sesion" },
                  { key: "logActividad", label: "Registro de actividad", desc: "Guardar historial de acciones en el sistema" },
                  { key: "ipWhitelist", label: "Lista blanca de IPs", desc: "Solo permitir acceso desde IPs autorizadas" },
                ].map((item) => (
                  <SettingRow key={item.key} label={item.label} desc={item.desc}>
                    <Toggle enabled={seg[item.key as keyof typeof seg] as boolean} onChange={() => toggleSeg(item.key as keyof typeof seg)} />
                  </SettingRow>
                ))}
                <SettingRow label="Tiempo de sesion inactiva" desc="Cerrar sesion automaticamente despues de:">
                  <select
                    value={seg.sesionTiempo}
                    onChange={(e) => setSeg((p) => ({ ...p, sesionTiempo: Number(e.target.value) }))}
                    style={{ padding: "0.375rem 0.625rem", borderRadius: "0.375rem", border: "1px solid #e2e8f0", fontSize: "0.8125rem", color: "#0A2540" }}
                  >
                    <option value={15}>15 minutos</option>
                    <option value={30}>30 minutos</option>
                    <option value={60}>1 hora</option>
                    <option value={120}>2 horas</option>
                  </select>
                </SettingRow>
              </div>

              <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "0.625rem", padding: "0.875rem", display: "flex", gap: "0.625rem" }}>
                <Shield style={{ width: "0.875rem", height: "0.875rem", color: "#d97706", flexShrink: 0, marginTop: "0.1rem" }} />
                <p style={{ fontSize: "0.7rem", color: "#92400e", lineHeight: "1.5" }}>
                  En modo demo, la autenticacion de dos factores no esta disponible. En produccion, esta funcion protege el acceso con SMS o app autenticador.
                </p>
              </div>
            </div>
          )}

          {/* INTEGRACIONES */}
          {tab === "integraciones" && (
            <div style={{ maxWidth: "640px" }}>
              <SectionTitle title="Integraciones Activas" desc="Conexiones con servicios externos" />
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {[
                  { key: "geminiActivo", label: "Google Gemini AI", desc: "Motor de inteligencia artificial para scores y analisis", color: "#059669", status: "Conectado" },
                  { key: "whatsappActivo", label: "WhatsApp Business API", desc: "Notificaciones y comunicacion con asociados", color: "#64748b", status: "No configurado" },
                  { key: "nominaActivo", label: "Integracion Nomina RRHH", desc: "Sincronizacion automatica con sistema de nomina", color: "#64748b", status: "No configurado" },
                ].map((item) => (
                  <div key={item.key} style={{
                    background: "#ffffff",
                    borderRadius: "0.875rem",
                    padding: "1rem 1.25rem",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}>
                    <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.625rem", background: item.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Settings style={{ width: "1.125rem", height: "1.125rem", color: item.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#0A2540", marginBottom: "0.2rem" }}>{item.label}</div>
                      <div style={{ fontSize: "0.7rem", color: "#64748b" }}>{item.desc}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: item.color }}>{item.status}</span>
                      <Toggle enabled={integ[item.key as keyof typeof integ] as boolean} onChange={() => toggleInteg(item.key as keyof typeof integ)} />
                    </div>
                  </div>
                ))}
              </div>

              <SectionTitle title="Exportacion de Datos" desc="Formatos de descarga disponibles" />
              <div style={{ background: "#ffffff", borderRadius: "0.875rem", padding: "0 1.25rem", border: "1px solid #e2e8f0" }}>
                {[
                  { key: "exportCSV", label: "Exportar a CSV", desc: "Compatible con Excel y Google Sheets" },
                  { key: "exportPDF", label: "Exportar a PDF", desc: "Reportes formateados para impresion" },
                ].map((item) => (
                  <SettingRow key={item.key} label={item.label} desc={item.desc}>
                    <Toggle enabled={integ[item.key as keyof typeof integ] as boolean} onChange={() => toggleInteg(item.key as keyof typeof integ)} />
                  </SettingRow>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

