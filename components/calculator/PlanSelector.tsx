'use client';

import { PlanType } from '@/lib/types';
import { PLANES } from '@/lib/constants';
import { Label } from '@/components/ui/label';

interface PlanSelectorProps {
  value: PlanType;
  onChange: (value: PlanType) => void;
}

export function PlanSelector({ value, onChange }: PlanSelectorProps) {
  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-gray-700">
        Plan a Vender
      </Label>

      <div className="space-y-2">
        {Object.values(PLANES).map((plan) => {
          const isSelected = value === plan.id;
          const isRecommended = plan.id === 'profesional';

          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => onChange(plan.id)}
              className={`
                w-full p-3 rounded-xl border-2 text-left transition-all duration-200
                hover:border-fuchsia-300 hover:bg-fuchsia-50/50
                active:scale-[0.99]
                ${isSelected
                  ? 'border-fuchsia-500 bg-gradient-to-r from-fuchsia-50 to-pink-50 shadow-md shadow-fuchsia-100'
                  : 'border-gray-200 bg-white'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Radio Circle */}
                  <div className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                    ${isSelected
                      ? 'border-fuchsia-500 bg-fuchsia-500'
                      : 'border-gray-300'
                    }
                  `}>
                    {isSelected && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>

                  {/* Plan Info */}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold text-sm ${isSelected ? 'text-fuchsia-700' : 'text-gray-800'}`}>
                        {plan.nombre}
                      </span>
                      {isRecommended && (
                        <span className="px-1.5 py-0.5 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                          Popular
                        </span>
                      )}
                    </div>
                    <span className={`text-xs ${isSelected ? 'text-fuchsia-600' : 'text-gray-500'}`}>
                      {plan.precioFormateado}/mes
                    </span>
                  </div>
                </div>

                {/* Price Badge */}
                <div className={`
                  px-3 py-1.5 rounded-lg font-bold text-sm
                  ${isSelected
                    ? 'bg-fuchsia-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                  }
                `}>
                  ${(plan.precio / 1000).toFixed(0)}K
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
