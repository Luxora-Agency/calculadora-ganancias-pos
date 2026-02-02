'use client';

import { PERIODOS_SIMULACION } from '@/lib/constants';

interface PeriodSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  return (
    <div className="flex-1 sm:flex-initial">
      <p className="text-xs text-gray-500 mb-2 font-medium">Periodo de simulación</p>
      <div className="flex gap-1.5 sm:gap-2">
        {PERIODOS_SIMULACION.map((periodo) => {
          const isSelected = value === periodo;
          return (
            <button
              key={periodo}
              type="button"
              onClick={() => onChange(periodo)}
              className={`
                flex-1 sm:flex-initial py-2 sm:py-2.5 px-3 sm:px-4 text-sm font-semibold rounded-xl
                transition-all duration-200 active:scale-95
                ${isSelected
                  ? 'bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-fuchsia-300 hover:text-fuchsia-600'
                }
              `}
            >
              <span className="block sm:hidden">{periodo}m</span>
              <span className="hidden sm:block">{periodo} meses</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
