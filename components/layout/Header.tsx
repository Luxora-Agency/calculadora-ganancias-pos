'use client';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-fuchsia-100 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-fuchsia-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-fuchsia-500/25 transform hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Calculadora de Ganancias
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500 hidden xs:block">
                Sistema POS Multi-Nicho
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status Badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-fuchsia-50 rounded-full">
              <span className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-fuchsia-700">En vivo</span>
            </div>

            {/* Version Badge */}
            <div className="px-2 py-1 bg-gray-100 rounded-lg">
              <span className="text-[10px] sm:text-xs font-medium text-gray-600">v1.0</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
