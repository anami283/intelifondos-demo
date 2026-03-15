import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { ScoreIA } from "@/components/solicitudes/ScoreIA";
import { solicitudes } from "@/data/demo-data";
import { ArrowLeft, User, DollarSign, Calendar } from "lucide-react";
import { formatCOP } from "@/lib/utils";

export default function SolicitudDetallePage({ params }: { params: { id: string } }) {
  const solicitud = solicitudes.find((s) => s.id === params.id);
  if (!solicitud) notFound();

  return (
    <>
      <Header
        title={"Solicitud " + solicitud.numero}
        subtitle={solicitud.asociado.nombre + " - " + solicitud.tipo}
        breadcrumb="Solicitudes"
      />
      <div className="p-5 lg:p-6 space-y-5">
        <Link
          href="/demo/solicitudes"
          className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
          style={{ color: "#00B894" }}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a solicitudes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-5" style={{ border: "1px solid rgba(226,232,240,0.8)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: "#0A2540" }}>Informacion del asociado</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(10,37,64,0.06)" }}>
                  <User className="w-4 h-4" style={{ color: "#0A2540" }} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Nombre</p>
                  <p className="text-sm font-semibold" style={{ color: "#0A2540" }}>{solicitud.asociado.nombre}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(10,37,64,0.06)" }}>
                  <DollarSign className="w-4 h-4" style={{ color: "#0A2540" }} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Salario mensual</p>
                  <p className="text-sm font-semibold" style={{ color: "#0A2540" }}>{formatCOP(solicitud.asociado.salario)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(10,37,64,0.06)" }}>
                  <Calendar className="w-4 h-4" style={{ color: "#0A2540" }} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Cargo</p>
                  <p className="text-sm font-semibold" style={{ color: "#0A2540" }}>{solicitud.asociado.cargo}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #f1f5f9" }}>
              <h4 className="text-xs font-semibold uppercase text-slate-500 mb-3">Detalle del credito</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl" style={{ background: "#f8fafc" }}>
                  <p className="text-xs text-slate-500 mb-1">Monto solicitado</p>
                  <p className="text-sm font-bold" style={{ color: "#0A2540" }}>{formatCOP(solicitud.monto)}</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: "#f8fafc" }}>
                  <p className="text-xs text-slate-500 mb-1">Plazo</p>
                  <p className="text-sm font-bold" style={{ color: "#0A2540" }}>{solicitud.plazo} meses</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: "#f8fafc" }}>
                  <p className="text-xs text-slate-500 mb-1">Tipo</p>
                  <p className="text-sm font-bold capitalize" style={{ color: "#0A2540" }}>{solicitud.tipo}</p>
                </div>
                <div className="p-3 rounded-xl" style={{ background: "#f8fafc" }}>
                  <p className="text-xs text-slate-500 mb-1">Estado</p>
                  <p className="text-sm font-bold" style={{ color: "#0A2540" }}>{solicitud.estado}</p>
                </div>
              </div>
            </div>
          </div>

          <ScoreIA solicitud={solicitud} />
        </div>
      </div>
    </>
  );
}
