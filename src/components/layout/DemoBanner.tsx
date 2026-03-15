"use client";
import Link from "next/link";

export function DemoBanner() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4"
      style={{
        height: "2.5rem",
        background: "#0A2540",
        fontSize: "0.72rem",
      }}
    >
      <span className="font-semibold text-white">
        Intelifondos Demo
      </span>
      <span style={{ color: "rgba(255,255,255,0.5)" }}>
        Vista previa - datos simulados
      </span>
      <Link
        href="/"
        className="font-semibold transition-colors"
        style={{ color: "#00B894" }}
      >
        Salir del demo
      </Link>
    </div>
  );
}
