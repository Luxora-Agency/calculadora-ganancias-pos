'use client';

import { Label } from '@/components/ui/label';
import { PERIODOS_SIMULACION } from '@/lib/constants';

interface PeriodSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">
        Periodo de Simulación
      </Label>

      <div className="flex gap-2">
        {PERIODOS_SIMULACION.map((periodo) => (
          <button
            key={periodo}
            type="button"
            onClick={() => onChange(periodo)}
            className={`flex-1 py-2 px-3 text-sm font-medium rounded-lg border transition-all ${
              value === periodo
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-background hover:bg-muted border-input'
            }`}
          >
            {periodo} meses
          </button>
        ))}
      </div>
    </div>
  );
}
