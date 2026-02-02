'use client';

import { VendorType, TeamConfig } from '@/lib/types';
import { LIMITES_EQUIPO, LIMITES } from '@/lib/constants';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamConfigurationProps {
  vendorType: VendorType | null;
  config: TeamConfig;
  onChange: (config: Partial<TeamConfig>) => void;
  camposVisibles: {
    seniors: boolean;
    juniors: boolean;
    base: boolean;
  };
}

interface TeamLevelInputProps {
  label: string;
  comisionPct: string;
  icon: React.ReactNode;
  cantidad: number;
  ventas: number;
  maxCantidad: number;
  onCantidadChange: (value: number) => void;
  onVentasChange: (value: number) => void;
  colorClass: string;
  bgClass: string;
}

function TeamLevelInput({
  label,
  comisionPct,
  icon,
  cantidad,
  ventas,
  maxCantidad,
  onCantidadChange,
  onVentasChange,
  colorClass,
  bgClass
}: TeamLevelInputProps) {
  const handleCantidadChange = (delta: number) => {
    const newValue = Math.max(0, Math.min(maxCantidad, cantidad + delta));
    onCantidadChange(newValue);
  };

  const handleVentasChange = (delta: number) => {
    const newValue = Math.max(
      LIMITES.ventasPorMiembro.min,
      Math.min(LIMITES.ventasPorMiembro.max, ventas + delta)
    );
    onVentasChange(newValue);
  };

  const totalVentas = cantidad * ventas;

  return (
    <div className={`p-4 rounded-xl border-2 ${colorClass} ${bgClass} transition-all hover:shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg ${colorClass.replace('border-', 'bg-').replace('-200', '-100')} flex items-center justify-center`}>
            {icon}
          </div>
          <div>
            <span className="font-semibold text-gray-800">{label}</span>
            <span className="ml-2 text-xs font-medium text-fuchsia-600 bg-fuchsia-100 px-1.5 py-0.5 rounded">
              {comisionPct}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-full shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <span className="text-xs font-bold text-gray-700">{totalVentas}</span>
          <span className="text-xs text-gray-400">ventas</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Cantidad */}
        <div className="space-y-2">
          <Label className="text-xs text-gray-500 flex items-center justify-between">
            <span>Cantidad</span>
            <span className="text-fuchsia-500">máx {maxCantidad}</span>
          </Label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleCantidadChange(-1)}
              disabled={cantidad <= 0}
              className="w-8 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              -
            </button>
            <Input
              type="number"
              value={cantidad}
              onChange={(e) => onCantidadChange(Math.min(maxCantidad, Math.max(0, parseInt(e.target.value) || 0)))}
              min={0}
              max={maxCantidad}
              className="h-9 text-center font-bold flex-1"
            />
            <button
              type="button"
              onClick={() => handleCantidadChange(1)}
              disabled={cantidad >= maxCantidad}
              className="w-8 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        {/* Ventas por persona */}
        <div className="space-y-2">
          <Label className="text-xs text-gray-500">Ventas c/u</Label>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleVentasChange(-1)}
              disabled={ventas <= LIMITES.ventasPorMiembro.min}
              className="w-8 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              -
            </button>
            <Input
              type="number"
              value={ventas}
              onChange={(e) => onVentasChange(Math.min(LIMITES.ventasPorMiembro.max, Math.max(LIMITES.ventasPorMiembro.min, parseInt(e.target.value) || 0)))}
              min={LIMITES.ventasPorMiembro.min}
              max={LIMITES.ventasPorMiembro.max}
              className="h-9 text-center font-bold flex-1"
            />
            <button
              type="button"
              onClick={() => handleVentasChange(1)}
              disabled={ventas >= LIMITES.ventasPorMiembro.max}
              className="w-8 h-9 rounded-lg bg-white border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeamConfiguration({
  vendorType,
  config,
  onChange,
  camposVisibles
}: TeamConfigurationProps) {
  if (!vendorType || vendorType === 'base') {
    return null;
  }

  const limites = LIMITES_EQUIPO[vendorType];
  const tieneAlgunCampo = camposVisibles.seniors || camposVisibles.juniors || camposVisibles.base;

  if (!tieneAlgunCampo) {
    return null;
  }

  const totalEquipo =
    (camposVisibles.seniors ? config.seniors : 0) +
    (camposVisibles.juniors ? config.juniors : 0) +
    (camposVisibles.base ? config.base : 0);

  const totalVentasEquipo =
    (camposVisibles.seniors ? config.seniors * config.ventasSeniors : 0) +
    (camposVisibles.juniors ? config.juniors * config.ventasJuniors : 0) +
    (camposVisibles.base ? config.base * config.ventasBase : 0);

  // Determinar los porcentajes de comisión según el tipo de vendedor
  const getComisionPorcentajes = () => {
    switch (vendorType) {
      case 'lider':
        return { seniors: '15%', juniors: '10%', base: '5%' };
      case 'senior':
        return { seniors: '0%', juniors: '15%', base: '10%' };
      case 'junior':
        return { seniors: '0%', juniors: '0%', base: '15%' };
      default:
        return { seniors: '0%', juniors: '0%', base: '0%' };
    }
  };

  const comisiones = getComisionPorcentajes();

  return (
    <Card className="overflow-hidden border-fuchsia-100/50 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white pb-4">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Tu Equipo
          </div>
          <div className="flex items-center gap-3 text-sm font-normal">
            <span className="flex items-center gap-1">
              <span className="text-gray-400">{totalEquipo}</span>
              <span className="text-gray-500">personas</span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1">
              <span className="text-fuchsia-400 font-semibold">{totalVentasEquipo}</span>
              <span className="text-gray-500">ventas</span>
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {camposVisibles.seniors && (
          <TeamLevelInput
            label="Seniors"
            comisionPct={comisiones.seniors}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-fuchsia-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            }
            cantidad={config.seniors}
            ventas={config.ventasSeniors}
            maxCantidad={limites.seniors}
            onCantidadChange={(v) => onChange({ seniors: v })}
            onVentasChange={(v) => onChange({ ventasSeniors: v })}
            colorClass="border-fuchsia-200"
            bgClass="bg-gradient-to-br from-fuchsia-50/50 to-pink-50/50"
          />
        )}

        {camposVisibles.juniors && (
          <TeamLevelInput
            label="Juniors"
            comisionPct={comisiones.juniors}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-fuchsia-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            cantidad={config.juniors}
            ventas={config.ventasJuniors}
            maxCantidad={limites.juniors}
            onCantidadChange={(v) => onChange({ juniors: v })}
            onVentasChange={(v) => onChange({ ventasJuniors: v })}
            colorClass="border-fuchsia-100"
            bgClass="bg-gradient-to-br from-gray-50 to-fuchsia-50/30"
          />
        )}

        {camposVisibles.base && (
          <TeamLevelInput
            label="Base"
            comisionPct={comisiones.base}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            cantidad={config.base}
            ventas={config.ventasBase}
            maxCantidad={limites.base}
            onCantidadChange={(v) => onChange({ base: v })}
            onVentasChange={(v) => onChange({ ventasBase: v })}
            colorClass="border-gray-200"
            bgClass="bg-gray-50/50"
          />
        )}
      </CardContent>
    </Card>
  );
}
