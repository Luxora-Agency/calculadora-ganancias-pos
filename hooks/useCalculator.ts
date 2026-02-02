'use client';

import { useState, useMemo, useCallback } from 'react';
import { CalculatorConfig, SimulationResults, VendorType, PlanType, TeamConfig } from '@/lib/types';
import { simular } from '@/lib/calculations';
import { DEFAULTS, LIMITES_EQUIPO } from '@/lib/constants';

const initialTeamConfig: TeamConfig = {
  seniors: 0,
  ventasSeniors: DEFAULTS.ventasPorMiembro,
  juniors: 0,
  ventasJuniors: DEFAULTS.ventasPorMiembro,
  base: 0,
  ventasBase: DEFAULTS.ventasPorMiembro
};

const initialConfig: CalculatorConfig = {
  tipoVendedor: null,
  plan: DEFAULTS.plan,
  ventasPropias: DEFAULTS.ventasPropias,
  meses: DEFAULTS.meses,
  equipo: initialTeamConfig
};

export function useCalculator() {
  const [config, setConfig] = useState<CalculatorConfig>(initialConfig);

  const setTipoVendedor = useCallback((tipo: VendorType | null) => {
    setConfig(prev => {
      // Resetear equipo según el nuevo tipo de vendedor
      const limites = tipo ? LIMITES_EQUIPO[tipo] : LIMITES_EQUIPO.base;

      const nuevoEquipo: TeamConfig = {
        seniors: Math.min(prev.equipo.seniors, limites.seniors),
        ventasSeniors: prev.equipo.ventasSeniors,
        juniors: Math.min(prev.equipo.juniors, limites.juniors),
        ventasJuniors: prev.equipo.ventasJuniors,
        base: Math.min(prev.equipo.base, limites.base),
        ventasBase: prev.equipo.ventasBase
      };

      return {
        ...prev,
        tipoVendedor: tipo,
        equipo: nuevoEquipo
      };
    });
  }, []);

  const setPlan = useCallback((plan: PlanType) => {
    setConfig(prev => ({ ...prev, plan }));
  }, []);

  const setVentasPropias = useCallback((ventas: number) => {
    setConfig(prev => ({ ...prev, ventasPropias: ventas }));
  }, []);

  const setMeses = useCallback((meses: number) => {
    setConfig(prev => ({ ...prev, meses }));
  }, []);

  const setEquipo = useCallback((equipo: Partial<TeamConfig>) => {
    setConfig(prev => ({
      ...prev,
      equipo: { ...prev.equipo, ...equipo }
    }));
  }, []);

  const resetConfig = useCallback(() => {
    setConfig(initialConfig);
  }, []);

  // Calcular resultados de forma memoizada
  const results: SimulationResults = useMemo(() => {
    return simular(config);
  }, [config]);

  // Determinar qué campos de equipo mostrar
  const camposEquipoVisibles = useMemo(() => {
    if (!config.tipoVendedor) {
      return { seniors: false, juniors: false, base: false };
    }

    switch (config.tipoVendedor) {
      case 'lider':
        return { seniors: true, juniors: true, base: true };
      case 'senior':
        return { seniors: false, juniors: true, base: true };
      case 'junior':
        return { seniors: false, juniors: false, base: true };
      case 'base':
      default:
        return { seniors: false, juniors: false, base: false };
    }
  }, [config.tipoVendedor]);

  const tieneEquipo = camposEquipoVisibles.seniors || camposEquipoVisibles.juniors || camposEquipoVisibles.base;

  return {
    config,
    results,
    setTipoVendedor,
    setPlan,
    setVentasPropias,
    setMeses,
    setEquipo,
    resetConfig,
    camposEquipoVisibles,
    tieneEquipo
  };
}
