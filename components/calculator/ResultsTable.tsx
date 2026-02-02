'use client';

import { MonthResult } from '@/lib/types';
import { formatCurrency } from '@/lib/calculations';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultsTableProps {
  data: MonthResult[];
  period: number;
}

export function ResultsTable({ data, period }: ResultsTableProps) {
  if (data.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <p>Selecciona un tipo de vendedor para ver la proyección</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">
          Proyección a {period} Meses
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16 text-center">Mes</TableHead>
                <TableHead className="text-center">Ventas</TableHead>
                <TableHead className="text-right">
                  <div className="flex flex-col">
                    <span>Ing. M1</span>
                    <span className="text-xs font-normal text-muted-foreground">(100%)</span>
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex flex-col">
                    <span>Ing. M2</span>
                    <span className="text-xs font-normal text-muted-foreground">(30%)</span>
                  </div>
                </TableHead>
                <TableHead className="text-right">
                  <div className="flex flex-col">
                    <span>Ing. M3+</span>
                    <span className="text-xs font-normal text-muted-foreground">(3% rec.)</span>
                  </div>
                </TableHead>
                <TableHead className="text-right font-semibold">Total Mes</TableHead>
                <TableHead className="text-right font-semibold">Acumulado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={row.mes}
                  className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
                >
                  <TableCell className="text-center font-medium">
                    {row.mes}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.ventasNuevas}
                  </TableCell>
                  <TableCell className="text-right text-fuchsia-600">
                    {formatCurrency(row.ingresoM1)}
                  </TableCell>
                  <TableCell className="text-right text-fuchsia-500">
                    {formatCurrency(row.ingresoM2)}
                  </TableCell>
                  <TableCell className="text-right text-fuchsia-400">
                    {formatCurrency(row.ingresoM3)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatCurrency(row.totalMes)}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">
                    {formatCurrency(row.acumulado)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
