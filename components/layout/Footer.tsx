'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-fuchsia-100">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left - Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-gray-700">
              Sistema POS Multi-Nicho
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">&copy; {currentYear}</span>
          </div>

          {/* Right - Disclaimer */}
          <p className="text-xs text-gray-400 text-center sm:text-right max-w-md">
            Herramienta de simulación. Los resultados son proyecciones y pueden variar.
          </p>
        </div>
      </div>
    </footer>
  );
}
