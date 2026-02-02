'use client';

import { formatCurrency, formatNumber } from '@/lib/calculations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SummaryCardProps {
  total: number;
  average: number;
  lastMonth: number;
  recurring: number;
  clients: number;
  period: number;
}

export function SummaryCard({
  total,
  average,
  lastMonth,
  recurring,
  clients,
  period
}: SummaryCardProps) {
  if (total === 0) {
    return null;
  }

  return (
    <Card className="overflow-hidden border-fuchsia-100/50 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-4">
        <CardTitle className="text-base flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Resumen de Ganancias
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        {/* Main Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
          {/* Total */}
          <div className="col-span-2 p-4 sm:p-5 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-2xl text-white shadow-lg shadow-fuchsia-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-fuchsia-100 text-xs sm:text-sm font-medium mb-1">
                  Total en {period} meses
                </p>
                <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {formatCurrency(total)}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Average */}
          <div className="p-4 bg-gradient-to-br from-white to-fuchsia-50 rounded-xl border border-fuchsia-100 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-fuchsia-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-fuchsia-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs text-gray-500 font-medium">Promedio</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-800">{formatCurrency(average)}</p>
            <p className="text-[10px] text-gray-400">por mes</p>
          </div>

          {/* Last Month */}
          <div className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs text-gray-500 font-medium">Último Mes</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-gray-800">{formatCurrency(lastMonth)}</p>
            <p className="text-[10px] text-gray-400">mes {period}</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {/* Recurring Income */}
          <div className="p-4 bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-xl border border-fuchsia-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-fuchsia-700 uppercase tracking-wide">Ingreso Recurrente</span>
              <span className="px-2 py-0.5 bg-fuchsia-200 text-fuchsia-700 text-[10px] font-bold rounded-full">Mes 3+</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-fuchsia-600 mb-1">{formatCurrency(recurring)}</p>
            <p className="text-xs text-fuchsia-500">ingreso pasivo mensual</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 h-2 bg-fuchsia-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
              <span className="text-[10px] text-fuchsia-600 font-medium">Creciendo</span>
            </div>
          </div>

          {/* Active Clients */}
          <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Clientes Activos</span>
              <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-[10px] font-bold rounded-full">al final</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{formatNumber(clients)}</p>
            <p className="text-xs text-gray-500">clientes generando ingresos</p>
            <div className="mt-3 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold
                    ${i < 3 ? 'bg-fuchsia-100 text-fuchsia-600' : 'bg-gray-100 text-gray-400'}
                  `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              ))}
              <span className="text-[10px] text-gray-400 ml-1">+{Math.max(0, clients - 5)}</span>
            </div>
          </div>
        </div>

        {/* Info Note */}
        <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-xs text-gray-600 leading-relaxed">
              <p className="mb-1">
                <span className="font-semibold text-gray-700">Estructura de comisiones:</span>
              </p>
              <ul className="list-disc list-inside space-y-0.5 text-gray-500">
                <li><span className="text-fuchsia-600 font-medium">Mes 1:</span> 100% del plan (70% tuyo, 15-10-5% uplines)</li>
                <li><span className="text-fuchsia-600 font-medium">Mes 2:</span> 30% adicional por cliente activo</li>
                <li><span className="text-fuchsia-600 font-medium">Mes 3+:</span> 3% recurrente mientras el cliente esté activo</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
