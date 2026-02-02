'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CalculatorConfig, SimulationResults } from '@/lib/types';
import { generarPDF } from '@/lib/pdf-generator';

interface ExportPDFButtonProps {
  config: CalculatorConfig;
  results: SimulationResults;
  disabled?: boolean;
}

export function ExportPDFButton({ config, results, disabled }: ExportPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleExport = async () => {
    if (!config.tipoVendedor || results.resultados.length === 0) {
      return;
    }

    setIsGenerating(true);

    try {
      await generarPDF(config, results);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor, intenta de nuevo.');
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled = disabled || !config.tipoVendedor || results.resultados.length === 0;

  return (
    <Button
      onClick={handleExport}
      disabled={isDisabled || isGenerating}
      className="w-full sm:w-auto"
      size="lg"
    >
      {isGenerating ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Generando PDF...
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Exportar a PDF
        </>
      )}
    </Button>
  );
}
