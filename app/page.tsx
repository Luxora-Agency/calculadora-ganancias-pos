'use client';

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

  return (
    <>
      <Header />

      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-[400px_1fr] gap-6">
            {/* Panel de Configuración */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Configuración</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <VendorTypeSelector
                    value={config.tipoVendedor}
                    onChange={setTipoVendedor}
                  />

                  <Separator />

                  <PlanSelector
                    value={config.plan}
                    onChange={setPlan}
                  />

                  <Separator />

                  <SalesInput
                    value={config.ventasPropias}
                    onChange={setVentasPropias}
                  />
                </CardContent>
              </Card>

              {tieneEquipo && (
                <TeamConfiguration
                  vendorType={config.tipoVendedor}
                  config={config.equipo}
                  onChange={setEquipo}
                  camposVisibles={camposEquipoVisibles}
                />
              )}
            </div>

            {/* Panel de Resultados */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <PeriodSelector
                  value={config.meses}
                  onChange={setMeses}
                />

                <ExportPDFButton
                  config={config}
                  results={results}
                />
              </div>

              <ResultsTable
                data={results.resultados}
                period={config.meses}
              />

              <SummaryCard
                total={results.resumen.totalGanado}
                average={results.resumen.promedioMensual}
                lastMonth={results.resumen.ingresoUltimoMes}
                recurring={results.resumen.ingresoRecurrenteUltimoMes}
                clients={results.resumen.clientesActivos}
                period={config.meses}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
