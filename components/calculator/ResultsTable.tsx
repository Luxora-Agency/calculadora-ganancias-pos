'use client';

import { MonthResult } from '@/lib/types';
import { formatCurrency } from '@/lib/calculations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultsTableProps {
  data: MonthResult[];
  period: number;
}

export function ResultsTable({ data, period }: ResultsTableProps) {
  if (data.length === 0) {
    return (
      <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
        <CardContent className="py-16 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">Sin datos de proyección</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            Selecciona un tipo de vendedor en el panel de configuración para ver tu proyección de ganancias
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-fuchsia-100/50 shadow-sm">
      <CardHeader className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white py-4">
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Proyección a {period} Meses
          </div>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
            {data.length} registros
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto scrollbar-custom">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Mes</th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Ventas</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex flex-col items-end">
                    <span>Ing. M1</span>
                    <span className="text-[10px] font-normal text-gray-400">(100%)</span>
                  </div>
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex flex-col items-end">
                    <span>Ing. M2</span>
                    <span className="text-[10px] font-normal text-gray-400">(30%)</span>
                  </div>
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <div className="flex flex-col items-end">
                    <span>Recurrente</span>
                    <span className="text-[10px] font-normal text-gray-400">(3%)</span>
                  </div>
                </th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Mes</th>
                <th className="py-3 px-4 text-right text-xs font-semibold text-fuchsia-600 uppercase tracking-wider">Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((row, index) => (
                <tr
                  key={row.mes}
                  className={`transition-colors hover:bg-fuchsia-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                >
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg font-bold text-gray-700">
                      {row.mes}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-sm">
                      <span className="font-semibold text-gray-800">{row.ventasNuevas}</span>
                      <span className="text-gray-400 text-xs">ventas</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-fuchsia-600">
                    {formatCurrency(row.ingresoM1)}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-fuchsia-500">
                    {formatCurrency(row.ingresoM2)}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-fuchsia-400">
                    {formatCurrency(row.ingresoM3)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-gray-800">
                    {formatCurrency(row.totalMes)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-block px-3 py-1 bg-fuchsia-100 text-fuchsia-700 font-bold rounded-lg">
                      {formatCurrency(row.acumulado)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-gray-100 max-h-[60vh] overflow-y-auto scrollbar-custom">
          {data.map((row, index) => (
            <div
              key={row.mes}
              className={`p-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {row.mes}
                  </span>
                  <div>
                    <p className="text-xs text-gray-500">Mes {row.mes}</p>
                    <p className="text-sm font-semibold text-gray-800">{row.ventasNuevas} ventas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total del mes</p>
                  <p className="text-lg font-bold text-gray-900">{formatCurrency(row.totalMes)}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 bg-fuchsia-50 rounded-lg">
                  <p className="text-[10px] text-fuchsia-600 font-medium">M1 (100%)</p>
                  <p className="text-xs font-bold text-fuchsia-700">{formatCurrency(row.ingresoM1)}</p>
                </div>
                <div className="p-2 bg-fuchsia-50/50 rounded-lg">
                  <p className="text-[10px] text-fuchsia-500 font-medium">M2 (30%)</p>
                  <p className="text-xs font-bold text-fuchsia-600">{formatCurrency(row.ingresoM2)}</p>
                </div>
                <div className="p-2 bg-pink-50 rounded-lg">
                  <p className="text-[10px] text-pink-500 font-medium">Rec (3%)</p>
                  <p className="text-xs font-bold text-pink-600">{formatCurrency(row.ingresoM3)}</p>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">Acumulado</span>
                <span className="px-3 py-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold text-sm rounded-full">
                  {formatCurrency(row.acumulado)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
