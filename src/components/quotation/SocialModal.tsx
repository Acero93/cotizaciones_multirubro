import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Camera, ThumbsUp, Share2, X, Heart } from 'lucide-react';

interface SocialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function SocialModal({ isOpen, onClose, onContinue }: SocialModalProps) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleContinue = () => {
    if (dontShowAgain) {
      localStorage.setItem('hide_social_modal', 'true');
    }
    onContinue();
    onClose();
  };

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem('hide_social_modal', 'true');
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md glass rounded-3xl p-5 sm:p-8 text-center z-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-xl shadow-primary/30"
            >
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </motion.div>

            <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-2 sm:mb-3">
              ¿Te gusta la herramienta?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5 sm:mb-6 leading-relaxed">
              Si este cotizador te ha sido útil, apóyame siguiendo mis redes sociales y compartiendo el proyecto.
              ¡Cuesta 30 segundos y me ayudas muchísimo!
            </p>

            <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
              <a
                href="https://instagram.com/codeando.futuro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium text-xs sm:text-sm hover:scale-[1.02] transition-transform"
              >
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="flex-1 text-left">Seguir en Instagram</span>
                <span className="text-[10px] sm:text-xs opacity-80">@codeandofuturochile</span>
              </a>

              <a
                href="https://acero93.github.io/cv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-slate-800 dark:bg-slate-700 text-white font-medium text-xs sm:text-sm hover:scale-[1.02] transition-transform"
              >
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="flex-1 text-left">Visitar mi CV / Portfolio</span>
                <span className="text-[10px] sm:text-xs opacity-80">Daniel Aracena Ch.</span>
              </a>
            </div>

            <div className="flex items-center gap-3 justify-center mb-4">
              <a
                href={`https://wa.me/?text=${encodeURIComponent('Mira este cotizador multirubro gratuito: ' + window.location.origin)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 hover:text-green-500 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                Compartir
              </a>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <button
                onClick={handleContinue}
                className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-400 hover:text-primary transition-colors"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                Ya lo hice
              </button>
            </div>

            <label className="flex items-center justify-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary"
              />
              <span className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">No mostrar de nuevo</span>
            </label>

            <button
              onClick={handleContinue}
              className="mt-4 sm:mt-5 w-full py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-xs sm:text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02] transition-all"
            >
              Continuar a la exportación
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
