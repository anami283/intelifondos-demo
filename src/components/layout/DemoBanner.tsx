"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X, Zap } from "lucide-react";

export function DemoBanner() {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ nombre: "", fondo: "", email: "", telefono: "" });

  const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowModal(false);
        setForm({ nombre: "", fondo: "", email: "", telefono: "" });
        toast.success("Gracias! Un asesor le contactara en menos de 24 horas.", { duration: 5000 });
  };

  return (
        <>
              <div
                        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
                        style={{
                                    height: "2.5rem",
                                    background: "#071c30",
                                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                      <div className="flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5" style={{ color: "#00B894" }} />
                                <span className="font-bold text-xs tracking-wide" style={{ color: "#00B894" }}>
                                            MODO DEMO
                                </span>span>
                                <span className="hidden sm:inline text-xs" style={{ color: "rgba(255,255,255,0.3)" }}> - </span>span>
                                <span className="hidden sm:inline text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                                            COFEM - Fondo de Empleados - Pereira, Colombia
                                </span>span>
                      </div>div>
                      <button
                                  onClick={() => setShowModal(true)}
                                  className="text-xs font-bold px-3 py-1 rounded-full transition-colors"
                                  style={{ background: "#00B894", color: "#ffffff" }}
                                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#00a884"; }}
                                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#00B894"; }}
                                >
                                Solicitar licencia
                      </button>button>
              </div>div>
        
          {showModal && (
                  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4" style={{ backdropFilter: "blur(8px)" }}>
                            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
                                        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                                      <X className="w-5 h-5" />
                                        </button>button>
                                        <div className="mb-5">
                                                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: "rgba(0,184,148,0.1)" }}>
                                                                      <Zap className="w-5 h-5" style={{ color: "#00B894" }} />
                                                      </div>div>
                                                      <h2 className="text-xl font-bold mb-1" style={{ color: "#0A2540" }}>Solicitar licencia</h2>h2>
                                                      <p className="text-sm text-gray-500">Un asesor le contactara en menos de 24 horas con una propuesta personalizada.</p>p>
                                        </div>div>
                                        <form onSubmit={handleSubmit} className="space-y-3">
                                          {[
                    { key: "nombre", label: "Nombre completo", placeholder: "Ej: Carlos Andres Ospina", type: "text" },
                    { key: "fondo", label: "Nombre del fondo", placeholder: "Ej: Fondo de Empleados XYZ", type: "text" },
                    { key: "email", label: "Correo electronico", placeholder: "gerente@fondoxyz.com", type: "email" },
                    { key: "telefono", label: "Telefono / WhatsApp", placeholder: "+57 300 123 4567", type: "tel" },
                                  ].map((f) => (
                                                    <div key={f.key}>
                                                                      <label className="text-sm font-semibold text-gray-700 block mb-1">{f.label}</label>label>
                                                                      <input
                                                                                            type={f.type}
                                                                                            required
                                                                                            value={form[f.key as keyof typeof form]}
                                                                                            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                                                                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"
                                                                                            style={{ focusRingColor: "#00B894" }}
                                                                                            placeholder={f.placeholder}
                                                                                          />
                                                    </div>div>
                                                  ))}
                                                      <button
                                                                        type="submit"
                                                                        className="w-full text-white font-bold py-2.5 rounded-lg transition-colors mt-2"
                                                                        style={{ background: "#0A2540" }}
                                                                      >
                                                                      Solicitar propuesta
                                                      </button>button>
                                        </form>form>
                            </div>div>
                  </div>div>
              )}
        </>>
      );
}</>
