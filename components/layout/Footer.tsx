'use client';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <p>
            Sistema POS Multi-Nicho &copy; {currentYear}
          </p>
          <p className="text-xs">
            Esta herramienta es solo para fines de simulación. Los resultados reales pueden variar.
          </p>
        </div>
      </div>
    </footer>
  );
}
