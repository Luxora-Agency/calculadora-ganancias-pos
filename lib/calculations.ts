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
 * Estructura para rastrear ventas por nivel
 */
interface VentasPorNivel {
  propias: number;
  nivel1: number; // Equipo directo (ej: Seniors para Líder)
  nivel2: number; // Segundo nivel (ej: Juniors para Líder)
  nivel3: number; // Tercer nivel (ej: Base para Líder)
}

/**
 * Obtiene las ventas desglosadas por nivel según el tipo de vendedor
 */
function obtenerVentasPorNivel(config: CalculatorConfig): VentasPorNivel {
  const resultado: VentasPorNivel = {
    propias: config.ventasPropias,
    nivel1: 0,
    nivel2: 0,
    nivel3: 0
  };

  if (!config.tipoVendedor || config.tipoVendedor === 'base') {
    return resultado;
  }

  const { equipo } = config;

  if (config.tipoVendedor === 'lider') {
    // Líder: Seniors (nivel 1), Juniors (nivel 2), Base (nivel 3)
    resultado.nivel1 = equipo.seniors * equipo.ventasSeniors;
    resultado.nivel2 = equipo.juniors * equipo.ventasJuniors;
    resultado.nivel3 = equipo.base * equipo.ventasBase;
  } else if (config.tipoVendedor === 'senior') {
    // Senior: Juniors (nivel 1), Base (nivel 2)
    resultado.nivel1 = equipo.juniors * equipo.ventasJuniors;
    resultado.nivel2 = equipo.base * equipo.ventasBase;
  } else if (config.tipoVendedor === 'junior') {
    // Junior: Base (nivel 1)
    resultado.nivel1 = equipo.base * equipo.ventasBase;
  }

  return resultado;
}

/**
 * Calcula el ingreso total aplicando una tasa de comisión a las ventas por nivel
 * Redondea al entero más cercano para evitar errores de precisión de punto flotante
 */
function calcularIngresoPorNivel(
  ventas: VentasPorNivel,
  precioBase: number,
  tasaComision: number
): number {
  let ingresoTotal = 0;

  // Ventas propias: 70%
  ingresoTotal += ventas.propias * precioBase * tasaComision * DIST_VENDEDOR;

  // Nivel 1 (equipo directo): 15%
  ingresoTotal += ventas.nivel1 * precioBase * tasaComision * DIST_UPLINE_1;

  // Nivel 2: 10%
  ingresoTotal += ventas.nivel2 * precioBase * tasaComision * DIST_UPLINE_2;

  // Nivel 3: 5%
  ingresoTotal += ventas.nivel3 * precioBase * tasaComision * DIST_LIDER;

  // Redondear para evitar errores de punto flotante (ej: 125999.99999 → 126000)
  return Math.round(ingresoTotal);
}

/**
 * Calcula el ingreso del Mes 1 (100%) por ventas nuevas
 */
function calcularIngresoM1(config: CalculatorConfig): number {
  if (!config.tipoVendedor) return 0;

  const precioBase = PLANES[config.plan].precio;
  const ventas = obtenerVentasPorNivel(config);

  return calcularIngresoPorNivel(ventas, precioBase, COMISION_MES_1);
}

/**
 * Calcula el ingreso del Mes 2 (30%) por clientes del mes anterior
 * Mantiene la misma distribución multinivel que M1
 */
function calcularIngresoM2(clientesPorNivel: VentasPorNivel, config: CalculatorConfig): number {
  if (!config.tipoVendedor) return 0;

  const precioBase = PLANES[config.plan].precio;

  return calcularIngresoPorNivel(clientesPorNivel, precioBase, COMISION_MES_2);
}

/**
 * Calcula el ingreso Mes 3+ (3% recurrente)
 * Mantiene la misma distribución multinivel
 */
function calcularIngresoM3(clientesPorNivel: VentasPorNivel, config: CalculatorConfig): number {
  if (!config.tipoVendedor) return 0;

  const precioBase = PLANES[config.plan].precio;

  return calcularIngresoPorNivel(clientesPorNivel, precioBase, COMISION_MES_3_PLUS);
}

/**
 * Suma dos estructuras de VentasPorNivel
 */
function sumarVentas(a: VentasPorNivel, b: VentasPorNivel): VentasPorNivel {
  return {
    propias: a.propias + b.propias,
    nivel1: a.nivel1 + b.nivel1,
    nivel2: a.nivel2 + b.nivel2,
    nivel3: a.nivel3 + b.nivel3
  };
}

/**
 * Obtiene el total de ventas de una estructura VentasPorNivel
 */
function totalVentas(ventas: VentasPorNivel): number {
  return ventas.propias + ventas.nivel1 + ventas.nivel2 + ventas.nivel3;
}

/**
 * Crea una estructura de ventas vacía
 */
function ventasVacias(): VentasPorNivel {
  return { propias: 0, nivel1: 0, nivel2: 0, nivel3: 0 };
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
  let clientesMes2: VentasPorNivel = ventasVacias();
  let clientesMes3Plus: VentasPorNivel = ventasVacias();
  let acumulado = 0;

  // Ventas mensuales por nivel (constantes cada mes)
  const ventasMensuales = obtenerVentasPorNivel(config);
  const ventasTotalesMensuales = totalVentas(ventasMensuales);

  for (let mes = 1; mes <= config.meses; mes++) {
    // Calcular ingresos con la distribución correcta por nivel
    const ingresoM1 = calcularIngresoM1(config);
    const ingresoM2 = calcularIngresoM2(clientesMes2, config);
    const ingresoM3 = calcularIngresoM3(clientesMes3Plus, config);

    const totalMes = ingresoM1 + ingresoM2 + ingresoM3;
    acumulado += totalMes;

    const clientesActivos = ventasTotalesMensuales + totalVentas(clientesMes2) + totalVentas(clientesMes3Plus);

    resultados.push({
      mes,
      ventasNuevas: ventasTotalesMensuales,
      ingresoM1,
      ingresoM2,
      ingresoM3,
      totalMes,
      acumulado,
      clientesActivos
    });

    // Actualizar clientes para el siguiente mes (mantener estructura por nivel)
    clientesMes3Plus = sumarVentas(clientesMes3Plus, clientesMes2);
    clientesMes2 = { ...ventasMensuales };
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
