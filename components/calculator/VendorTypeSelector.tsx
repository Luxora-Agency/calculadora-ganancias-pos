'use client';

import { VendorType } from '@/lib/types';
import { VENDEDORES } from '@/lib/constants';
import { Label } from '@/components/ui/label';

interface VendorTypeSelectorProps {
  value: VendorType | null;
  onChange: (value: VendorType | null) => void;
}

const VENDOR_ICONS: Record<VendorType, React.ReactNode> = {
  lider: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  ),
  senior: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  junior: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  base: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
};

export function VendorTypeSelector({ value, onChange }: VendorTypeSelectorProps) {
  const vendedor = value ? VENDEDORES[value] : null;

  return (
    <div className="space-y-3">
      <Label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
        Tipo de Vendedor
        <span className="text-fuchsia-500">*</span>
      </Label>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-2 gap-2">
        {Object.values(VENDEDORES).map((v) => {
          const isSelected = value === v.id;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => onChange(v.id)}
              className={`
                relative p-3 rounded-xl border-2 text-left transition-all duration-200
                hover:border-fuchsia-300 hover:bg-fuchsia-50/50
                active:scale-[0.98]
                ${isSelected
                  ? 'border-fuchsia-500 bg-gradient-to-br from-fuchsia-50 to-pink-50 shadow-md shadow-fuchsia-100'
                  : 'border-gray-200 bg-white'
                }
              `}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <div className="w-5 h-5 bg-fuchsia-500 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}

              {/* Icon */}
              <div className={`
                w-9 h-9 rounded-lg flex items-center justify-center mb-2
                ${isSelected
                  ? 'bg-fuchsia-500 text-white'
                  : 'bg-gray-100 text-gray-500'
                }
              `}>
                {VENDOR_ICONS[v.id]}
              </div>

              {/* Text */}
              <p className={`font-semibold text-sm ${isSelected ? 'text-fuchsia-700' : 'text-gray-800'}`}>
                {v.nombre}
              </p>
              <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-fuchsia-600' : 'text-gray-400'}`}>
                {v.puedeReclutar}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Info Card */}
      {vendedor && (
        <div className="p-3 bg-gradient-to-r from-fuchsia-50 to-pink-50 rounded-xl border border-fuchsia-200 animate-fade-in">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-fuchsia-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-fuchsia-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-fuchsia-800 leading-relaxed">{vendedor.descripcion}</p>
              <p className="text-xs text-fuchsia-600 mt-1 font-medium">
                {vendedor.maxEquipo}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
