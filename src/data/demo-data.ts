// ============================================================
// INTELIFONDOS · COFEM · DATOS DEMO HARDCODED
// Fondo de Empleados de Pereira Colombia
// ============================================================

export const fondo = {
  nombre: "COFEM",
  nombreCompleto: "Cooperativa de Empleados COFEM",
  ciudad: "Pereira",
  departamento: "Risaralda",
  pais: "Colombia",
  asociados: 312,
  anosOperacion: 8,
  nit: "900.234.567-1",
};

export type NivelRiesgo = "BAJO" | "MEDIO" | "ALTO" | "MUY_ALTO";
export type EstadoSolicitud =
  | "pendiente"
  | "en_revision"
  | "aprobada"
  | "rechazada"
  | "desembolsada";

export interface Asociado {
  nombre: string;
  cedula: string;
  cargo: string;
  salario: number;
  descuentos: number;
  antiguedad: number; // años
  ahorros: number;
}

export interface Solicitud {
  id: string;
  numero: string;
  asociado: Asociado;
  tipo: "ordinario" | "emergencia" | "educacion" | "vivienda";
  monto: number;
  plazo: number; // meses
  estado: EstadoSolicitud;
  score_ia: number;
  nivel_riesgo: NivelRiesgo;
  recomendacion_ia: "APROBAR" | "REVISAR" | "RECHAZAR";
  justificacion_ia: string;
  cuota_mensual: number;
  fecha: string;
}

export const solicitudes: Solicitud[] = [
  {
    id: "sol-001",
    numero: "SOL-2025-0091",
    asociado: {
      nombre: "Carlos Andrés Ospina Mejía",
      cedula: "10.245.678",
      cargo: "Analista Contable",
      salario: 3200000,
      descuentos: 980000,
      antiguedad: 5,
      ahorros: 4800000,
    },
    tipo: "ordinario",
    monto: 8000000,
    plazo: 24,
    estado: "en_revision",
    score_ia: 87,
    nivel_riesgo: "BAJO",
    recomendacion_ia: "APROBAR",
    justificacion_ia:
      "Asociado con excelente historial de pagos, capacidad de endeudamiento dentro del límite del 30% y ahorros que respaldan el 60% del crédito solicitado.",
    cuota_mensual: 380000,
    fecha: "2025-03-10",
  },
  {
    id: "sol-002",
    numero: "SOL-2025-0092",
    asociado: {
      nombre: "María Fernanda Ríos Cardona",
      cedula: "42.567.890",
      cargo: "Coordinadora RRHH",
      salario: 4500000,
      descuentos: 1200000,
      antiguedad: 7,
      ahorros: 9200000,
    },
    tipo: "vivienda",
    monto: 25000000,
    plazo: 60,
    estado: "pendiente",
    score_ia: 91,
    nivel_riesgo: "BAJO",
    recomendacion_ia: "APROBAR",
    justificacion_ia:
      "Perfil financiero sólido. Salario neto disponible cubre ampliamente la cuota proyectada. Antigüedad alta y ahorros robustos reducen el riesgo considerablemente.",
    cuota_mensual: 520000,
    fecha: "2025-03-11",
  },
  {
    id: "sol-003",
    numero: "SOL-2025-0093",
    asociado: {
      nombre: "Juan David Gómez Arango",
      cedula: "15.678.901",
      cargo: "Auxiliar Operativo",
      salario: 1800000,
      descuentos: 720000,
      antiguedad: 2,
      ahorros: 1200000,
    },
    tipo: "emergencia",
    monto: 3000000,
    plazo: 12,
    estado: "aprobada",
    score_ia: 62,
    nivel_riesgo: "MEDIO",
    recomendacion_ia: "REVISAR",
    justificacion_ia:
      "Capacidad de pago ajustada. La cuota representaría el 29% del ingreso disponible. Se recomienda verificar compromisos externos antes de aprobar.",
    cuota_mensual: 275000,
    fecha: "2025-03-08",
  },
  {
    id: "sol-004",
    numero: "SOL-2025-0094",
    asociado: {
      nombre: "Luisa Valentina Torres Pérez",
      cedula: "52.890.123",
      cargo: "Ingeniera de Sistemas",
      salario: 5800000,
      descuentos: 1450000,
      antiguedad: 9,
      ahorros: 12500000,
    },
    tipo: "educacion",
    monto: 15000000,
    plazo: 36,
    estado: "desembolsada",
    score_ia: 95,
    nivel_riesgo: "BAJO",
    recomendacion_ia: "APROBAR",
    justificacion_ia:
      "Excelente perfil de riesgo. Mayor salario del grupo, ahorros que superan el monto solicitado y la antigüedad más alta del portafolio actual.",
    cuota_mensual: 485000,
    fecha: "2025-03-05",
  },
  {
    id: "sol-005",
    numero: "SOL-2025-0095",
    asociado: {
      nombre: "Andrés Felipe Muñoz Salazar",
      cedula: "75.123.456",
      cargo: "Técnico de Mantenimiento",
      salario: 2200000,
      descuentos: 850000,
      antiguedad: 3,
      ahorros: 2100000,
    },
    tipo: "ordinario",
    monto: 5000000,
    plazo: 18,
    estado: "rechazada",
    score_ia: 41,
    nivel_riesgo: "ALTO",
    recomendacion_ia: "RECHAZAR",
    justificacion_ia:
      "Descuentos actuales representan el 38% del salario. La cuota adicional elevaría el endeudamiento total al 55%, superando el límite regulatorio del fondo.",
    cuota_mensual: 315000,
    fecha: "2025-03-07",
  },
  {
    id: "sol-006",
    numero: "SOL-2025-0096",
    asociado: {
      nombre: "Sandra Milena Castaño López",
      cedula: "43.234.567",
      cargo: "Jefe de Ventas",
      salario: 6200000,
      descuentos: 1800000,
      antiguedad: 11,
      ahorros: 18000000,
    },
    tipo: "vivienda",
    monto: 40000000,
    plazo: 84,
    estado: "en_revision",
    score_ia: 89,
    nivel_riesgo: "BAJO",
    recomendacion_ia: "APROBAR",
    justificacion_ia:
      "Asociada con el mayor historial del fondo. Ahorros excepcionales. La cuota proyectada equivale al 18% de su ingreso disponible, holgadamente dentro del límite.",
    cuota_mensual: 620000,
    fecha: "2025-03-12",
  },
  {
    id: "sol-007",
    numero: "SOL-2025-0097",
    asociado: {
      nombre: "Hernando José Vargas Quintero",
      cedula: "17.345.678",
      cargo: "Conductor",
      salario: 1600000,
      descuentos: 680000,
      antiguedad: 1,
      ahorros: 450000,
    },
    tipo: "emergencia",
    monto: 2000000,
    plazo: 12,
    estado: "pendiente",
    score_ia: 38,
    nivel_riesgo: "MUY_ALTO",
    recomendacion_ia: "RECHAZAR",
    justificacion_ia:
      "Antigüedad mínima (1 año), ahorros insuficientes como respaldo y nivel de endeudamiento actual crítico. Se recomienda diferir hasta cumplir requisito de 2 años.",
    cuota_mensual: 185000,
    fecha: "2025-03-13",
  },
  {
    id: "sol-008",
    numero: "SOL-2025-0098",
    asociado: {
      nombre: "Paola Andrea Bedoya Restrepo",
      cedula: "43.456.789",
      cargo: "Directora Financiera",
      salario: 9500000,
      descuentos: 2200000,
      antiguedad: 14,
      ahorros: 32000000,
    },
    tipo: "ordinario",
    monto: 20000000,
    plazo: 48,
    estado: "aprobada",
    score_ia: 97,
    nivel_riesgo: "BAJO",
    recomendacion_ia: "APROBAR",
    justificacion_ia:
      "Perfil premium. Mayor score del sistema. Ahorros que triplican el monto solicitado, salario excepcional y la mayor antigüedad activa en el fondo.",
    cuota_mensual: 490000,
    fecha: "2025-03-09",
  },
];

export const cartera = {
  total: 847500000,
  activos: 127,
  icv: 3.2, // índice de calidad de cartera (%)
  mora_30: 15255000,
  mora_mas30: 11865000,
  recaudo: 64320000,
  creditos: [
    {
      id: "CR-2024-0041",
      asociado: "Álvaro Luis Henao Zuluaga",
      monto: 12000000,
      saldo: 9800000,
      dias_mora: 15,
      cuota: 480000,
      estado: "al_dia",
    },
    {
      id: "CR-2024-0063",
      asociado: "Gloria Patricia Serna Montoya",
      monto: 8500000,
      saldo: 7200000,
      dias_mora: 35,
      cuota: 320000,
      estado: "mora",
    },
    {
      id: "CR-2024-0078",
      asociado: "Roberto Carlos Palacio Vélez",
      monto: 5000000,
      saldo: 4100000,
      dias_mora: 62,
      cuota: 215000,
      estado: "mora_critica",
    },
    {
      id: "CR-2025-0012",
      asociado: "Claudia Elena Mora García",
      monto: 18000000,
      saldo: 17500000,
      dias_mora: 0,
      cuota: 580000,
      estado: "al_dia",
    },
    {
      id: "CR-2025-0031",
      asociado: "Jairo Alberto Cano Betancur",
      monto: 3500000,
      saldo: 2900000,
      dias_mora: 48,
      cuota: 175000,
      estado: "mora",
    },
  ],
};

export const planilla = {
  periodo: "2025-03",
  total: 64320000,
  filas: [
    {
      cedula: "10.245.678",
      nombre: "Carlos Andrés Ospina Mejía",
      cargo: "Analista Contable",
      salario: 3200000,
      descuento_credito: 380000,
      descuento_ahorro: 160000,
      total_descuento: 540000,
    },
    {
      cedula: "42.567.890",
      nombre: "María Fernanda Ríos Cardona",
      cargo: "Coordinadora RRHH",
      salario: 4500000,
      descuento_credito: 520000,
      descuento_ahorro: 225000,
      total_descuento: 745000,
    },
    {
      cedula: "52.890.123",
      nombre: "Luisa Valentina Torres Pérez",
      cargo: "Ingeniera de Sistemas",
      salario: 5800000,
      descuento_credito: 485000,
      descuento_ahorro: 290000,
      total_descuento: 775000,
    },
    {
      cedula: "43.234.567",
      nombre: "Sandra Milena Castaño López",
      cargo: "Jefe de Ventas",
      salario: 6200000,
      descuento_credito: 620000,
      descuento_ahorro: 310000,
      total_descuento: 930000,
    },
    {
      cedula: "43.456.789",
      nombre: "Paola Andrea Bedoya Restrepo",
      cargo: "Directora Financiera",
      salario: 9500000,
      descuento_credito: 490000,
      descuento_ahorro: 475000,
      total_descuento: 965000,
    },
    {
      cedula: "75.123.456",
      nombre: "Andrés Felipe Muñoz Salazar",
      cargo: "Técnico de Mantenimiento",
      salario: 2200000,
      descuento_credito: 0,
      descuento_ahorro: 110000,
      total_descuento: 110000,
    },
    {
      cedula: "15.678.901",
      nombre: "Juan David Gómez Arango",
      cargo: "Auxiliar Operativo",
      salario: 1800000,
      descuento_credito: 275000,
      descuento_ahorro: 90000,
      total_descuento: 365000,
    },
    {
      cedula: "17.345.678",
      nombre: "Hernando José Vargas Quintero",
      cargo: "Conductor",
      salario: 1600000,
      descuento_credito: 0,
      descuento_ahorro: 80000,
      total_descuento: 80000,
    },
    {
      cedula: "32.123.456",
      nombre: "Beatriz Elena Cárdenas Hoyos",
      cargo: "Secretaria Ejecutiva",
      salario: 2500000,
      descuento_credito: 180000,
      descuento_ahorro: 125000,
      total_descuento: 305000,
    },
    {
      cedula: "71.456.789",
      nombre: "Jorge Iván Londoño Giraldo",
      cargo: "Supervisor Logística",
      salario: 3800000,
      descuento_credito: 420000,
      descuento_ahorro: 190000,
      total_descuento: 610000,
    },
  ],
};

export const kpis_mensuales = [
  { mes: "Oct", desembolsos: 52000000, recaudo: 58000000 },
  { mes: "Nov", desembolsos: 61000000, recaudo: 62000000 },
  { mes: "Dic", desembolsos: 45000000, recaudo: 55000000 },
  { mes: "Ene", desembolsos: 68000000, recaudo: 63000000 },
  { mes: "Feb", desembolsos: 74000000, recaudo: 67000000 },
  { mes: "Mar", desembolsos: 81000000, recaudo: 64320000 },
];

export const actividad = [
  {
    id: 1,
    tipo: "credito_aprobado",
    descripcion: "Crédito SOL-2025-0098 aprobado por comité",
    fecha: "2025-03-13 16:45",
    usuario: "P. Bedoya",
  },
  {
    id: 2,
    tipo: "pago_recibido",
    descripcion: "Recaudo nómina marzo registrado: $64.320.000",
    fecha: "2025-03-13 09:00",
    usuario: "Sistema",
  },
  {
    id: 3,
    tipo: "alerta_mora",
    descripcion: "CR-2024-0078: Roberto Palacio supera 60 días mora",
    fecha: "2025-03-12 14:30",
    usuario: "IA Sistema",
  },
  {
    id: 4,
    tipo: "solicitud_nueva",
    descripcion: "Nueva solicitud SOL-2025-0097 recibida",
    fecha: "2025-03-13 11:20",
    usuario: "H. Vargas",
  },
  {
    id: 5,
    tipo: "score_calculado",
    descripcion: "Score IA calculado para SOL-2025-0096: 89/100",
    fecha: "2025-03-12 10:15",
    usuario: "Gemini AI",
  },
  {
    id: 6,
    tipo: "desembolso",
    descripcion: "Desembolso SOL-2025-0094 procesado: $15.000.000",
    fecha: "2025-03-12 08:00",
    usuario: "C. García",
  },
  {
    id: 7,
    tipo: "credito_rechazado",
    descripcion: "SOL-2025-0095 rechazado por capacidad de pago insuficiente",
    fecha: "2025-03-11 17:00",
    usuario: "Comité",
  },
  {
    id: 8,
    tipo: "solicitud_nueva",
    descripcion: "Nueva solicitud SOL-2025-0096 recibida — vivienda $40M",
    fecha: "2025-03-12 13:45",
    usuario: "S. Castaño",
  },
  {
    id: 9,
    tipo: "pago_recibido",
    descripcion: "Pago voluntario recibido: $1.200.000 de L. Torres",
    fecha: "2025-03-11 15:30",
    usuario: "Sistema",
  },
  {
    id: 10,
    tipo: "alerta_mora",
    descripcion: "CR-2024-0063: Gloria Serna supera 30 días mora",
    fecha: "2025-03-10 09:00",
    usuario: "IA Sistema",
  },
  {
    id: 11,
    tipo: "score_calculado",
    descripcion: "Score IA calculado para SOL-2025-0092: 91/100",
    fecha: "2025-03-11 10:00",
    usuario: "Gemini AI",
  },
  {
    id: 12,
    tipo: "credito_aprobado",
    descripcion: "SOL-2025-0093 aprobado — crédito emergencia $3M",
    fecha: "2025-03-10 14:00",
    usuario: "Comité",
  },
  {
    id: 13,
    tipo: "desembolso",
    descripcion: "Desembolso SOL-2025-0091 en proceso: $8.000.000",
    fecha: "2025-03-10 11:00",
    usuario: "Tesorería",
  },
  {
    id: 14,
    tipo: "solicitud_nueva",
    descripcion: "Nueva solicitud SOL-2025-0091 ingresada al sistema",
    fecha: "2025-03-10 09:30",
    usuario: "C. Ospina",
  },
  {
    id: 15,
    tipo: "pago_recibido",
    descripcion: "Abono a capital: $800.000 de A. Henao",
    fecha: "2025-03-09 16:00",
    usuario: "Sistema",
  },
];

export const cartera_contexto_ia = {
  fondo: {
    nombre: "COFEM",
    ciudad: "Pereira",
    asociados: 312,
    anos_operacion: 8,
  },
  cartera: {
    total_cop: 847500000,
    creditos_activos: 127,
    indice_calidad: "3.2%",
    mora_30_dias_cop: 15255000,
    mora_mas30_dias_cop: 11865000,
    recaudo_mensual_cop: 64320000,
  },
  desembolsos: {
    mes_actual_cop: 81000000,
    mes_anterior_cop: 74000000,
    variacion: "+9.5%",
  },
  solicitudes_pendientes: 3,
  solicitudes_en_revision: 2,
  score_promedio_aprobadas: 91,
  tasa_aprobacion_mensual: "68%",
  modalidades_credito: ["ordinario", "emergencia", "educacion", "vivienda"],
  tasa_interes_mensual: "1.8%",
  plazo_maximo_meses: 84,
  monto_maximo_cop: 50000000,
  requisito_antiguedad_minima_anos: 2,
  limite_endeudamiento: "30% del salario neto",
};

export const formatCOP = (value: number): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};
