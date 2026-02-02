'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import {
  VendorTypeSelector,
  PlanSelector,
  SalesInput,
  TeamConfiguration,
  PeriodSelector,
  ResultsTable,
  SummaryCard,
  ExportPDFButton,
} from '@/components/calculator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCalculator } from '@/hooks/useCalculator';

export default function Home() {
  const {
    config,
    results,
    setTipoVendedor,
    setPlan,
    setVentasPropias,
    setMeses,
    setEquipo,
    camposEquipoVisibles,
    tieneEquipo,
  } = useCalculator();

  const [showConfig, setShowConfig] = useState(true);

  const hasResults = results.resultados.length > 0;

  return (
    <>
      <Header />

      <main className="flex-1 bg-gradient-to-b from-fuchsia-50/30 via-white to-white">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">

          {/* Mobile Toggle */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowConfig(!showConfig)}
              className="w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-fuchsia-100 active:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Configuración</p>
                  <p className="text-xs text-gray-500">
                    {config.tipoVendedor
                      ? `${config.tipoVendedor.charAt(0).toUpperCase() + config.tipoVendedor.slice(1)} · ${config.ventasPropias} ventas/mes`
                      : 'Configura tu simulación'}
                  </p>
                </div>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${showConfig ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="grid lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-4 sm:gap-6 lg:gap-8">

            {/* Panel de Configuración */}
            <div className={`space-y-4 sm:space-y-5 ${showConfig ? 'block' : 'hidden'} lg:block`}>
              <Card className="overflow-hidden border-fuchsia-100/50 shadow-sm hover:shadow-md transition-shadow duration-300 animate-fade-in">
                <CardHeader className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Configuración
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 sm:space-y-6 p-4 sm:p-6">
                  <VendorTypeSelector
                    value={config.tipoVendedor}
                    onChange={setTipoVendedor}
                  />

                  <Separator className="bg-fuchsia-100" />

                  <PlanSelector
                    value={config.plan}
                    onChange={setPlan}
                  />

                  <Separator className="bg-fuchsia-100" />

                  <SalesInput
                    value={config.ventasPropias}
                    onChange={setVentasPropias}
                  />
                </CardContent>
              </Card>

              {tieneEquipo && (
                <div className="animate-slide-up">
                  <TeamConfiguration
                    vendorType={config.tipoVendedor}
                    config={config.equipo}
                    onChange={setEquipo}
                    camposVisibles={camposEquipoVisibles}
                  />
                </div>
              )}

              {/* Quick Stats Mobile */}
              {hasResults && (
                <div className="lg:hidden p-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-xl text-white animate-fade-in">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-fuchsia-100 text-xs uppercase tracking-wide">Total Proyectado</p>
                      <p className="text-2xl font-bold">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(results.resumen.totalGanado)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-fuchsia-100 text-xs uppercase tracking-wide">Promedio Mensual</p>
                      <p className="text-lg font-semibold">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(results.resumen.promedioMensual)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Panel de Resultados */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 p-4 bg-white rounded-xl shadow-sm border border-fuchsia-100/50">
                <PeriodSelector
                  value={config.meses}
                  onChange={setMeses}
                />

                <ExportPDFButton
                  config={config}
                  results={results}
                />
              </div>

              {/* Results Table */}
              <div className="animate-fade-in">
                <ResultsTable
                  data={results.resultados}
                  period={config.meses}
                />
              </div>

              {/* Summary Cards */}
              {hasResults && (
                <div className="animate-slide-up">
                  <SummaryCard
                    total={results.resumen.totalGanado}
                    average={results.resumen.promedioMensual}
                    lastMonth={results.resumen.ingresoUltimoMes}
                    recurring={results.resumen.ingresoRecurrenteUltimoMes}
                    clients={results.resumen.clientesActivos}
                    period={config.meses}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
