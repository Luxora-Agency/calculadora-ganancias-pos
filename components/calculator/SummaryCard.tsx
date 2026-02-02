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

interface MetricItemProps {
  label: string;
  value: string;
  sublabel?: string;
  highlight?: boolean;
  colorClass?: string;
}

function MetricItem({ label, value, sublabel, highlight, colorClass }: MetricItemProps) {
  return (
    <div
      className={`p-4 rounded-lg ${
        highlight
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted/50'
      }`}
    >
      <p className={`text-xs ${highlight ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
        {label}
      </p>
      <p className={`text-xl font-bold ${colorClass || ''}`}>
        {value}
      </p>
      {sublabel && (
        <p className={`text-xs ${highlight ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
          {sublabel}
        </p>
      )}
    </div>
  );
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
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          Resumen de Ganancias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <MetricItem
            label={`Total en ${period} meses`}
            value={formatCurrency(total)}
            highlight
          />
          <MetricItem
            label="Promedio Mensual"
            value={formatCurrency(average)}
          />
          <MetricItem
            label="Ingreso Último Mes"
            value={formatCurrency(lastMonth)}
          />
          <MetricItem
            label="Ingreso Recurrente"
            value={formatCurrency(recurring)}
            sublabel="(3% mensual)"
            colorClass="text-fuchsia-600"
          />
          <MetricItem
            label="Clientes Activos"
            value={formatNumber(clients)}
            sublabel="al final del periodo"
          />
          <div className="p-4 rounded-lg bg-gradient-to-br from-fuchsia-50 to-pink-50 border border-fuchsia-200">
            <p className="text-xs text-fuchsia-700">
              Ingreso Pasivo Potencial
            </p>
            <p className="text-xl font-bold text-fuchsia-600">
              {formatCurrency(recurring)}
            </p>
            <p className="text-xs text-fuchsia-600">
              cada mes de forma recurrente
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded-lg border border-gray-300">
          <p className="text-sm text-gray-800">
            <strong>Nota:</strong> El ingreso del Mes 1 (100%) y Mes 2 (30%) son pagos únicos por cada venta.
            El 3% es recurrente y crece conforme mantienes clientes activos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
