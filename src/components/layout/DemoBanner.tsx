"use client";

import { useState } from "react";
import { toast } from "sonner";
import { X, Target } from "lucide-react";

export function DemoBanner() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    fondo: "",
    email: "",
    telefono: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    setForm({ nombre: "", fondo: "", email: "", telefono: "" });
    toast.success(
      "¡Gracias! Un asesor de Intelifondos le contactará en menos de 24 horas.",
      { duration: 5000 }
    );
  };

  return (
    <>
      {/* Banner */}
      <div className="bg-[#0A2540] text-white py-2 px-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#00B894]" />
          <span className="font-medium text-[#00B894]">MODO DEMO</span>
          <span className="text-white/60 hidden sm:inline">·</span>
          <span className="text-white/60 hidden sm:inline">
            COFEM — Pereira, Colombia
          </span>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#00B894] hover:bg-[#00a884] text-white text-xs font-semibold px-3 py-1 rounded-full transition-colors"
        >
          Solicitar licencia
        </button>
      </div>

      {/* Modal Lead */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-[#0A2540] mb-1">
                Solicitar licencia
              </h2>
              <p className="text-sm text-gray-500">
                Un asesor le contactará en menos de 24 horas para presentar una
                propuesta personalizada.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={form.nombre}
                  onChange={(e) =>
                    setForm({ ...form, nombre: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B894]/30"
                  placeholder="Ej: Carlos Andrés Ospina"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Nombre del fondo
                </label>
                <input
                  type="text"
                  required
                  value={form.fondo}
                  onChange={(e) => setForm({ ...form, fondo: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B894]/30"
                  placeholder="Ej: Fondo de Empleados XYZ"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B894]/30"
                  placeholder="gerente@fondoxyz.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                  Teléfono / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  value={form.telefono}
                  onChange={(e) =>
                    setForm({ ...form, telefono: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00B894]/30"
                  placeholder="+57 300 123 4567"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#00B894] hover:bg-[#00a884] text-white font-semibold py-2.5 rounded-lg transition-colors mt-2"
              >
                Solicitar propuesta
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
