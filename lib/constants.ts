import { VendorInfo, PlanInfo, VendorType, PlanType } from './types';

// Comisiones por periodo
export const COMISION_MES_1 = 1.00; // 100%
export const COMISION_MES_2 = 0.30; // 30%
export const COMISION_MES_3_PLUS = 0.03; // 3%

// Distribución multinivel
export const DIST_VENDEDOR = 0.70; // 70%
export const DIST_UPLINE_1 = 0.15; // 15%
export const DIST_UPLINE_2 = 0.10; // 10%
export const DIST_LIDER = 0.05; // 5%

// Planes y precios
export const PLANES: Record<PlanType, PlanInfo> = {
  basico: {
    id: 'basico',
    nombre: 'Plan Básico',
    precio: 100000,
    precioFormateado: '$100.000 COP'
  },
  profesional: {
    id: 'profesional',
    nombre: 'Plan Profesional',
    precio: 150000,
    precioFormateado: '$150.000 COP'
  },
  empresarial: {
    id: 'empresarial',
    nombre: 'Plan Empresarial',
    precio: 200000,
    precioFormateado: '$200.000 COP'
  }
};

// Información de tipos de vendedor
export const VENDEDORES: Record<VendorType, VendorInfo> = {
  lider: {
    id: 'lider',
    nombre: 'Líder',
    descripcion: 'Máximo nivel. Puedes reclutar Seniors y gestionar todo el equipo multinivel.',
    puedeReclutar: 'Seniors',
    maxEquipo: 'Hasta 10 Seniors + 20 Juniors + 20 Base = 50 vendedores'
  },
  senior: {
    id: 'senior',
    nombre: 'Senior',
    descripcion: 'Puedes reclutar Juniors y recibir comisiones de tu equipo.',
    puedeReclutar: 'Juniors',
    maxEquipo: 'Hasta 2 Juniors + 2 Base = 4 vendedores'
  },
  junior: {
    id: 'junior',
    nombre: 'Junior',
    descripcion: 'Puedes reclutar vendedores Base y crecer tu equipo.',
    puedeReclutar: 'Base',
    maxEquipo: 'Hasta 1 vendedor Base'
  },
  base: {
    id: 'base',
    nombre: 'Base',
    descripcion: 'Nivel inicial. Ganas comisiones por tus ventas directas.',
    puedeReclutar: 'No recluta',
    maxEquipo: 'Sin equipo'
  }
};

// Límites de equipo por tipo de vendedor
export const LIMITES_EQUIPO: Record<VendorType, { seniors: number; juniors: number; base: number }> = {
  lider: { seniors: 10, juniors: 20, base: 20 },
  senior: { seniors: 0, juniors: 2, base: 2 },
  junior: { seniors: 0, juniors: 0, base: 1 },
  base: { seniors: 0, juniors: 0, base: 0 }
};

// Periodos de simulación disponibles
export const PERIODOS_SIMULACION = [6, 12, 18, 24] as const;

// Valores por defecto
export const DEFAULTS = {
  plan: 'profesional' as PlanType,
  ventasPropias: 4,
  meses: 6,
  ventasPorMiembro: 2
};

// Límites de campos
export const LIMITES = {
  ventasPropias: { min: 0, max: 50 },
  cantidadEquipo: { min: 0, max: 20 },
  ventasPorMiembro: { min: 0, max: 20 }
};
