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
  cantidad: number;
  ventas: number;
  maxCantidad: number;
  onCantidadChange: (value: number) => void;
  onVentasChange: (value: number) => void;
  colorClass: string;
}

function TeamLevelInput({
  label,
  cantidad,
  ventas,
  maxCantidad,
  onCantidadChange,
  onVentasChange,
  colorClass
}: TeamLevelInputProps) {
  const handleCantidadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(maxCantidad, parseInt(e.target.value) || 0));
    onCantidadChange(value);
  };

  const handleVentasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      LIMITES.ventasPorMiembro.min,
      Math.min(LIMITES.ventasPorMiembro.max, parseInt(e.target.value) || 0)
    );
    onVentasChange(value);
  };

  const totalVentas = cantidad * ventas;

  return (
    <div className={`p-4 rounded-lg border-l-4 ${colorClass}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          Total: {totalVentas} ventas/mes
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">
            Cantidad (máx. {maxCantidad})
          </Label>
          <Input
            type="number"
            value={cantidad}
            onChange={handleCantidadChange}
            min={0}
            max={maxCantidad}
            className="h-9"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">
            Ventas c/u
          </Label>
          <Input
            type="number"
            value={ventas}
            onChange={handleVentasChange}
            min={LIMITES.ventasPorMiembro.min}
            max={LIMITES.ventasPorMiembro.max}
            className="h-9"
          />
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

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span>Configuración del Equipo</span>
          <span className="text-sm font-normal text-muted-foreground">
            {totalEquipo} personas | {totalVentasEquipo} ventas/mes
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {camposVisibles.seniors && (
          <TeamLevelInput
            label="Seniors"
            cantidad={config.seniors}
            ventas={config.ventasSeniors}
            maxCantidad={limites.seniors}
            onCantidadChange={(v) => onChange({ seniors: v })}
            onVentasChange={(v) => onChange({ ventasSeniors: v })}
            colorClass="border-fuchsia-600 bg-fuchsia-50"
          />
        )}

        {camposVisibles.juniors && (
          <TeamLevelInput
            label="Juniors"
            cantidad={config.juniors}
            ventas={config.ventasJuniors}
            maxCantidad={limites.juniors}
            onCantidadChange={(v) => onChange({ juniors: v })}
            onVentasChange={(v) => onChange({ ventasJuniors: v })}
            colorClass="border-fuchsia-400 bg-fuchsia-50/50"
          />
        )}

        {camposVisibles.base && (
          <TeamLevelInput
            label="Base"
            cantidad={config.base}
            ventas={config.ventasBase}
            maxCantidad={limites.base}
            onCantidadChange={(v) => onChange({ base: v })}
            onVentasChange={(v) => onChange({ ventasBase: v })}
            colorClass="border-gray-400 bg-gray-50"
          />
        )}
      </CardContent>
    </Card>
  );
}
