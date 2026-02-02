'use client';

import { useState } from 'react';
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
    <button
      onClick={handleExport}
      disabled={isDisabled || isGenerating}
      className={`
        relative flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3
        text-sm font-semibold rounded-xl transition-all duration-200
        active:scale-[0.98] overflow-hidden group
        ${isDisabled
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : isGenerating
            ? 'bg-fuchsia-100 text-fuchsia-600 cursor-wait'
            : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20 hover:shadow-xl'
        }
      `}
    >
      {/* Gradient overlay on hover */}
      {!isDisabled && !isGenerating && (
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}

      {/* Content */}
      <span className="relative flex items-center gap-2">
        {isGenerating ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
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
            <span>Generando...</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
            <span className="hidden sm:inline">Exportar PDF</span>
            <span className="sm:hidden">PDF</span>
          </>
        )}
      </span>
    </button>
  );
}
