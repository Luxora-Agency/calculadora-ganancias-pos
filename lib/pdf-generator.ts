'use client';

import jsPDF from 'jspdf';
import { CalculatorConfig, SimulationResults } from './types';
import { PLANES, VENDEDORES } from './constants';
import { formatCurrency } from './calculations';

export async function generarPDF(
  config: CalculatorConfig,
  results: SimulationResults
): Promise<void> {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Configuración de colores (Fucsia, Blanco, Negro)
  const primaryColor: [number, number, number] = [217, 70, 239]; // Fuchsia-500
  const textColor: [number, number, number] = [15, 15, 15]; // Negro
  const lightGray: [number, number, number] = [253, 244, 255]; // Fuchsia-50

  let yPos = 20;

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 35, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Simulación de Ganancias', pageWidth / 2, 18, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Sistema POS Multi-Nicho', pageWidth / 2, 28, { align: 'center' });

  yPos = 50;

  // Fecha de generación
  doc.setTextColor(...textColor);
  doc.setFontSize(10);
  const fecha = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  doc.text(`Generado: ${fecha}`, pageWidth - 15, yPos, { align: 'right' });

  yPos += 15;

  // Configuración usada
  doc.setFillColor(...lightGray);
  doc.rect(15, yPos - 5, pageWidth - 30, 45, 'F');

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Configuración de la Simulación', 20, yPos + 5);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos += 15;

  const vendedor = config.tipoVendedor ? VENDEDORES[config.tipoVendedor] : null;
  const plan = PLANES[config.plan];

  doc.text(`Tipo de Vendedor: ${vendedor?.nombre || 'No seleccionado'}`, 20, yPos);
  doc.text(`Plan: ${plan.nombre} (${plan.precioFormateado})`, 110, yPos);
  yPos += 8;
  doc.text(`Ventas Propias: ${config.ventasPropias}/mes`, 20, yPos);
  doc.text(`Periodo: ${config.meses} meses`, 110, yPos);

  if (config.tipoVendedor && config.tipoVendedor !== 'base') {
    yPos += 8;
    let equipoTexto = 'Equipo: ';
    const partes = [];

    if (config.tipoVendedor === 'lider' && config.equipo.seniors > 0) {
      partes.push(`${config.equipo.seniors} Seniors (${config.equipo.ventasSeniors} ventas c/u)`);
    }
    if ((config.tipoVendedor === 'lider' || config.tipoVendedor === 'senior') && config.equipo.juniors > 0) {
      partes.push(`${config.equipo.juniors} Juniors (${config.equipo.ventasJuniors} ventas c/u)`);
    }
    if (config.equipo.base > 0) {
      partes.push(`${config.equipo.base} Base (${config.equipo.ventasBase} ventas c/u)`);
    }

    if (partes.length > 0) {
      equipoTexto += partes.join(', ');
    } else {
      equipoTexto += 'Sin equipo';
    }
    doc.text(equipoTexto, 20, yPos);
  }

  yPos += 25;

  // Tabla de proyección
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Proyección Mensual', 20, yPos);
  yPos += 10;

  // Encabezados de tabla
  const headers = ['Mes', 'Ventas', 'Ing. M1', 'Ing. M2', 'Ing. M3+', 'Total Mes', 'Acumulado'];
  const colWidths = [15, 20, 30, 30, 30, 35, 35];
  let xPos = 15;

  doc.setFillColor(...primaryColor);
  doc.rect(15, yPos - 5, pageWidth - 30, 8, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');

  headers.forEach((header, i) => {
    doc.text(header, xPos + 2, yPos);
    xPos += colWidths[i];
  });

  yPos += 6;
  doc.setTextColor(...textColor);
  doc.setFont('helvetica', 'normal');

  // Filas de datos
  let rowCount = 0;
  const maxRowsFirstPage = 15;
  const maxRowsOtherPages = 25;

  for (const row of results.resultados) {
    // Verificar si necesitamos nueva página
    if ((rowCount === maxRowsFirstPage) ||
        (rowCount > maxRowsFirstPage && (rowCount - maxRowsFirstPage) % maxRowsOtherPages === 0)) {
      doc.addPage();
      yPos = 20;

      // Repetir encabezados
      xPos = 15;
      doc.setFillColor(...primaryColor);
      doc.rect(15, yPos - 5, pageWidth - 30, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      headers.forEach((header, i) => {
        doc.text(header, xPos + 2, yPos);
        xPos += colWidths[i];
      });
      yPos += 6;
      doc.setTextColor(...textColor);
      doc.setFont('helvetica', 'normal');
    }

    // Alternar color de fondo
    if (rowCount % 2 === 0) {
      doc.setFillColor(...lightGray);
      doc.rect(15, yPos - 3, pageWidth - 30, 7, 'F');
    }

    xPos = 15;
    const rowData = [
      row.mes.toString(),
      row.ventasNuevas.toString(),
      formatCurrency(row.ingresoM1),
      formatCurrency(row.ingresoM2),
      formatCurrency(row.ingresoM3),
      formatCurrency(row.totalMes),
      formatCurrency(row.acumulado)
    ];

    rowData.forEach((cell, i) => {
      doc.text(cell, xPos + 2, yPos);
      xPos += colWidths[i];
    });

    yPos += 7;
    rowCount++;
  }

  yPos += 10;

  // Verificar si hay espacio para el resumen
  if (yPos > doc.internal.pageSize.getHeight() - 60) {
    doc.addPage();
    yPos = 20;
  }

  // Resumen
  doc.setFillColor(...primaryColor);
  doc.rect(15, yPos - 5, pageWidth - 30, 50, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Resumen de la Simulación', 20, yPos + 5);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  yPos += 15;

  doc.text(`Total Ganado en ${config.meses} meses:`, 20, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(results.resumen.totalGanado), 100, yPos);
  doc.setFont('helvetica', 'normal');

  yPos += 8;
  doc.text('Promedio Mensual:', 20, yPos);
  doc.text(formatCurrency(results.resumen.promedioMensual), 100, yPos);

  yPos += 8;
  doc.text('Ingreso Último Mes:', 20, yPos);
  doc.text(formatCurrency(results.resumen.ingresoUltimoMes), 100, yPos);

  yPos += 8;
  doc.text('Ingreso Recurrente (Mes Final):', 20, yPos);
  doc.text(formatCurrency(results.resumen.ingresoRecurrenteUltimoMes), 100, yPos);

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setTextColor(128, 128, 128);
    doc.setFontSize(8);
    doc.text(
      `Sistema POS Multi-Nicho v1.0 | Página ${i} de ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Generar nombre de archivo
  const fechaArchivo = new Date().toISOString().split('T')[0];
  const tipoArchivo = config.tipoVendedor || 'sin_tipo';
  const nombreArchivo = `simulacion_ganancias_pos_${fechaArchivo}_${tipoArchivo}.pdf`;

  // Descargar
  doc.save(nombreArchivo);
}
