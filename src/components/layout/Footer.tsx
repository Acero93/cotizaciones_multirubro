import { Heart, Code2, Camera } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200/60 dark:border-slate-700/40 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 justify-center sm:justify-start">
              Desarrollado con <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" /> por
            </p>
            <div className="mt-2 flex flex-col gap-1">
              <a
                href="https://acero93.github.io/cv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1.5 justify-center sm:justify-start"
              >
                <Code2 className="w-3.5 h-3.5" />
                Daniel Aracena Ch. — Software Engineer
              </a>
              <a
                href="https://instagram.com/codeando.futuro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-accent transition-colors flex items-center gap-1.5 justify-center sm:justify-start"
              >
                <Camera className="w-3.5 h-3.5" />
                Codeando Futuro Chile
              </a>
            </div>
          </div>

          <div className="text-center sm:text-right">
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Cotizador Multirubro — v1.0
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              Adaptable a cualquier profesión o rubro
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
