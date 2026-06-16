import { motion } from 'framer-motion';
import { FileDown, Save, Trash2 } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { saveQuotation, loadQuotation } from '../../utils/storage';

interface ExportBarProps {
  onPrint: () => void;
}

export default function ExportBar({ onPrint }: ExportBarProps) {
  const { data, dispatch } = useQuotation();

  const handleSave = () => {
    saveQuotation(data);
    alert('Cotización guardada en el navegador.');
  };

  const handleLoad = () => {
    const saved = loadQuotation();
    if (saved) {
      dispatch({ type: 'SET_QUOTATION', payload: saved });
      alert('Cotización cargada.');
    } else {
      alert('No hay cotización guardada.');
    }
  };

  const handleReset = () => {
    if (confirm('¿Reiniciar cotización? Se perderán los datos actuales.')) {
      dispatch({ type: 'RESET' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass rounded-2xl p-3 sm:p-4 flex flex-wrap items-center gap-2 sm:gap-3"
    >
      <button
        onClick={onPrint}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all"
      >
        <FileDown className="w-4 h-4" />
        <span className="hidden sm:inline">Exportar PDF</span>
        <span className="sm:hidden">PDF</span>
      </button>

      <div className="flex-1 hidden sm:block" />

      <button
        onClick={handleSave}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
      >
        <Save className="w-4 h-4" />
        <span className="hidden sm:inline">Guardar</span>
      </button>

      <button
        onClick={handleLoad}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 text-slate-600 dark:text-slate-400 text-xs sm:text-sm font-medium rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
      >
        <span className="hidden sm:inline">Cargar</span>
        <span className="sm:hidden">Cargar</span>
      </button>

      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 text-red-500 text-xs sm:text-sm font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
