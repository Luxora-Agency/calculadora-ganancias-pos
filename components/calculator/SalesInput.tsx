'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { LIMITES } from '@/lib/constants';

interface SalesInputProps {
  value: number;
  onChange: (value: number) => void;
}

const PRESETS = [
  { value: 1, label: '1', desc: 'Mínimo' },
  { value: 2, label: '2', desc: 'Básico' },
  { value: 4, label: '4', desc: '1/sem' },
  { value: 8, label: '8', desc: '2/sem' },
  { value: 12, label: '12', desc: '3/sem' },
];

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
    const porSemana = ventas / 4;
    if (porSemana < 1) return `${ventas} al mes`;
    if (porSemana === 1) return '1 venta por semana';
    return `${porSemana.toFixed(1).replace('.0', '')} por semana`;
  };

  // Progress percentage for visual feedback
  const progressPercent = (value / LIMITES.ventasPropias.max) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-gray-700">
          Ventas Propias / Mes
        </Label>
        <span className="text-xs font-medium text-fuchsia-600 bg-fuchsia-50 px-2 py-1 rounded-full">
          {getEquivalencia(value)}
        </span>
      </div>

      {/* Value Display */}
      <div className="relative">
        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-xl border border-fuchsia-200">
          {/* Large Number Display */}
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-fuchsia-600">{value}</span>
              <span className="text-sm text-fuchsia-400">ventas/mes</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-2 h-1.5 bg-fuchsia-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Input Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange(Math.max(0, value - 1))}
              className="w-10 h-10 rounded-lg bg-white border border-fuchsia-200 text-fuchsia-600 font-bold hover:bg-fuchsia-50 active:scale-95 transition-all flex items-center justify-center"
              disabled={value <= 0}
            >
              -
            </button>
            <Input
              type="number"
              value={value}
              onChange={handleInputChange}
              min={LIMITES.ventasPropias.min}
              max={LIMITES.ventasPropias.max}
              className="w-16 text-center font-bold text-lg border-fuchsia-200 focus:border-fuchsia-500 focus:ring-fuchsia-500/20"
            />
            <button
              type="button"
              onClick={() => onChange(Math.min(LIMITES.ventasPropias.max, value + 1))}
              className="w-10 h-10 rounded-lg bg-white border border-fuchsia-200 text-fuchsia-600 font-bold hover:bg-fuchsia-50 active:scale-95 transition-all flex items-center justify-center"
              disabled={value >= LIMITES.ventasPropias.max}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="px-1">
        <Slider
          value={[value]}
          onValueChange={handleSliderChange}
          min={LIMITES.ventasPropias.min}
          max={LIMITES.ventasPropias.max}
          step={1}
          className="[&_[role=slider]]:bg-fuchsia-500 [&_[role=slider]]:border-fuchsia-500 [&_[role=slider]]:w-5 [&_[role=slider]]:h-5 [&_.bg-primary]:bg-fuchsia-500"
        />
        <div className="flex justify-between mt-1 text-[10px] text-gray-400">
          <span>0</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      {/* Quick Presets */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Selección rápida:</p>
        <div className="grid grid-cols-5 gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => onChange(preset.value)}
              className={`
                py-2 px-1 rounded-lg text-center transition-all duration-200 active:scale-95
                ${value === preset.value
                  ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-md shadow-fuchsia-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-fuchsia-50 hover:text-fuchsia-700'
                }
              `}
            >
              <span className="block font-bold text-sm">{preset.label}</span>
              <span className={`block text-[9px] ${value === preset.value ? 'text-fuchsia-100' : 'text-gray-400'}`}>
                {preset.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
