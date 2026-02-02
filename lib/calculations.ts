import {
  CalculatorConfig,
  MonthResult,
  SimulationResults
} from './types';
import {
  COMISION_MES_1,
  COMISION_MES_2,
  COMISION_MES_3_PLUS,
  DIST_VENDEDOR,
  DIST_UPLINE_1,
  DIST_UPLINE_2,
  DIST_LIDER,
  PLANES
} from './constants';

/**
 * Calcula las ventas totales del equipo según el tipo de vendedor
 */
function calcularVentasEquipo(config: CalculatorConfig): number {
  if (!config.tipoVendedor || config.tipoVendedor === 'base') {
    return 0;
  }

  const { equipo } = config;
  let totalVentasEquipo = 0;

  // Solo el líder tiene seniors
  if (config.tipoVendedor === 'lider') {
    totalVentasEquipo += equipo.seniors * equipo.ventasSeniors;
  }

  // Líder y Senior tienen juniors
  if (config.tipoVendedor === 'lider' || config.tipoVendedor === 'senior') {
    totalVentasEquipo += equipo.juniors * equipo.ventasJuniors;
  }

  // Líder, Senior y Junior tienen base (ya sabemos que no es 'base' por la condición inicial)
  totalVentasEquipo += equipo.base * equipo.ventasBase;

  return totalVentasEquipo;
}

/**
 * Calcula el ingreso del Mes 1 (100%) por ventas nuevas
 */
function calcularIngresoM1(ventasNuevas: number, config: CalculatorConfig): number {
  if (!config.tipoVendedor) return 0;

  const precioBase = PLANES[config.plan].precio;
  let ingresoTotal = 0;

  // Ventas propias
  const ventasPropias = config.ventasPropias;
  ingresoTotal += ventasPropias * precioBase * COMISION_MES_1 * DIST_VENDEDOR;

  // Ventas del equipo (según el nivel jerárquico)
  if (config.tipoVendedor === 'lider') {
    const ventasSeniors = config.equipo.seniors * config.equipo.ventasSeniors;
    const ventasJuniors = config.equipo.juniors * config.equipo.ventasJuniors;
    const ventasBase = config.equipo.base * config.equipo.ventasBase;

    ingresoTotal += ventasSeniors * precioBase * COMISION_MES_1 * DIST_UPLINE_1;
    ingresoTotal += ventasJuniors * precioBase * COMISION_MES_1 * DIST_UPLINE_2;
    ingresoTotal += ventasBase * precioBase * COMISION_MES_1 * DIST_LIDER;
  } else if (config.tipoVendedor === 'senior') {
    const ventasJuniors = config.equipo.juniors * config.equipo.ventasJuniors;
    const ventasBase = config.equipo.base * config.equipo.ventasBase;

    ingresoTotal += ventasJuniors * precioBase * COMISION_MES_1 * DIST_UPLINE_1;
    ingresoTotal += ventasBase * precioBase * COMISION_MES_1 * DIST_UPLINE_2;
  } else if (config.tipoVendedor === 'junior') {
    const ventasBase = config.equipo.base * config.equipo.ventasBase;
    ingresoTotal += ventasBase * precioBase * COMISION_MES_1 * DIST_UPLINE_1;
  }

  return ingresoTotal;
}

/**
 * Calcula el ingreso del Mes 2 (30%) por clientes del mes anterior
 */
function calcularIngresoM2(clientesMes2: number, config: CalculatorConfig): number {
  if (!config.tipoVendedor) return 0;

  const precioBase = PLANES[config.plan].precio;

  // Simplificación: asumimos distribución similar al M1 pero con 30%
  // En la práctica, los clientesMes2 representan todas las ventas del mes anterior
  return clientesMes2 * precioBase * COMISION_MES_2 * DIST_VENDEDOR;
}

/**
 * Calcula el ingreso Mes 3+ (3% recurrente)
 */
function calcularIngresoM3(clientesMes3Plus: number, config: CalculatorConfig): number {
  if (!config.tipoVendedor) return 0;

  const precioBase = PLANES[config.plan].precio;

  // Ingreso recurrente del 3% sobre clientes activos
  return clientesMes3Plus * precioBase * COMISION_MES_3_PLUS * DIST_VENDEDOR;
}

/**
 * Ejecuta la simulación completa
 */
export function simular(config: CalculatorConfig): SimulationResults {
  if (!config.tipoVendedor) {
    return {
      resultados: [],
      resumen: {
        totalGanado: 0,
        promedioMensual: 0,
        ingresoUltimoMes: 0,
        ingresoRecurrenteUltimoMes: 0,
        clientesActivos: 0
      }
    };
  }

  const resultados: MonthResult[] = [];
  let clientesMes2 = 0;
  let clientesMes3Plus = 0;
  let acumulado = 0;

  const ventasEquipoMensuales = calcularVentasEquipo(config);
  const ventasTotalesMensuales = config.ventasPropias + ventasEquipoMensuales;

  for (let mes = 1; mes <= config.meses; mes++) {
    const ventasNuevas = ventasTotalesMensuales;

    const ingresoM1 = calcularIngresoM1(ventasNuevas, config);
    const ingresoM2 = calcularIngresoM2(clientesMes2, config);
    const ingresoM3 = calcularIngresoM3(clientesMes3Plus, config);

    const totalMes = ingresoM1 + ingresoM2 + ingresoM3;
    acumulado += totalMes;

    const clientesActivos = ventasNuevas + clientesMes2 + clientesMes3Plus;

    resultados.push({
      mes,
      ventasNuevas,
      ingresoM1,
      ingresoM2,
      ingresoM3,
      totalMes,
      acumulado,
      clientesActivos
    });

    // Actualizar clientes para el siguiente mes
    clientesMes3Plus += clientesMes2;
    clientesMes2 = ventasNuevas;
  }

  const ultimoMes = resultados[resultados.length - 1];

  return {
    resultados,
    resumen: {
      totalGanado: acumulado,
      promedioMensual: acumulado / config.meses,
      ingresoUltimoMes: ultimoMes?.totalMes || 0,
      ingresoRecurrenteUltimoMes: ultimoMes?.ingresoM3 || 0,
      clientesActivos: ultimoMes?.clientesActivos || 0
    }
  };
}

/**
 * Formatea un número como moneda colombiana
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Formatea un número con separadores de miles
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-CO').format(Math.round(value));
}
