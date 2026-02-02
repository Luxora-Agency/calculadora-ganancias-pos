// Tipos para la Calculadora de Ganancias POS

export type VendorType = 'lider' | 'senior' | 'junior' | 'base';

export type PlanType = 'basico' | 'profesional' | 'empresarial';

export interface TeamConfig {
  seniors: number;
  ventasSeniors: number;
  juniors: number;
  ventasJuniors: number;
  base: number;
  ventasBase: number;
}

export interface CalculatorConfig {
  tipoVendedor: VendorType | null;
  plan: PlanType;
  ventasPropias: number;
  meses: number;
  equipo: TeamConfig;
}

export interface MonthResult {
  mes: number;
  ventasNuevas: number;
  ingresoM1: number;
  ingresoM2: number;
  ingresoM3: number;
  totalMes: number;
  acumulado: number;
  clientesActivos: number;
}

export interface SimulationResults {
  resultados: MonthResult[];
  resumen: {
    totalGanado: number;
    promedioMensual: number;
    ingresoUltimoMes: number;
    ingresoRecurrenteUltimoMes: number;
    clientesActivos: number;
  };
}

export interface VendorInfo {
  id: VendorType;
  nombre: string;
  descripcion: string;
  puedeReclutar: string;
  maxEquipo: string;
}

export interface PlanInfo {
  id: PlanType;
  nombre: string;
  precio: number;
  precioFormateado: string;
}
