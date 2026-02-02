'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { LIMITES } from '@/lib/constants';

interface SalesInputProps {
  value: number;
  onChange: (value: number) => void;
}

const PRESETS = [1, 2, 4, 8, 12];

export function SalesInput({ value, onChange }: SalesInputProps) {
  const handleSliderChange = (values: number[]) => {
    onChange(values[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    const clampedValue = Math.max(
      LIMITES.ventasPropias.min,
      Math.min(LIMITES.ventasPropias.max, newValue)
    );
    onChange(clampedValue);
  };

  const getEquivalencia = (ventas: number): string => {
    if (ventas === 0) return 'Sin ventas';
    if (ventas <= 4) return `${ventas} ventas = ${ventas} por semana aprox.`;
    if (ventas <= 8) return `${ventas} ventas = ${Math.round(ventas / 4)} por semana`;
    return `${ventas} ventas = ${Math.round(ventas / 4.3).toFixed(1)} por semana`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="ventas-propias" className="text-sm font-medium">
          Ventas Propias / Mes
        </Label>
        <span className="text-xs text-muted-foreground">
          {getEquivalencia(value)}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          min={LIMITES.ventasPropias.min}
          max={LIMITES.ventasPropias.max}
          step={1}
          className="flex-1"
        />
        <Input
          id="ventas-propias"
          type="number"
          value={value}
          onChange={handleInputChange}
          min={LIMITES.ventasPropias.min}
          max={LIMITES.ventasPropias.max}
          className="w-20 text-center"
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            className={`px-3 py-1 text-sm rounded-full border transition-colors ${
              value === preset
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background hover:bg-muted border-input'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
