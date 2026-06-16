import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { calcItemTotal, formatCurrency } from '../../utils/calculations';
import type { QuotationItem } from '../../types';

export default function ItemsTable() {
  const { data, dispatch } = useQuotation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-3 sm:p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100">Items de la Cotización</h2>
        <button
          onClick={() => dispatch({ type: 'ADD_ITEM' })}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white text-xs sm:text-sm font-medium rounded-xl shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all"
        >
          <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          Agregar Item
        </button>
      </div>

      <div className="overflow-x-auto -mx-3 sm:mx-0 scrollbar-thin">
        <div className="min-w-[640px] sm:min-w-0 px-3 sm:px-0">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                <th className="w-6 sm:w-8 py-2"></th>
                <th className="text-left py-2 px-1 sm:px-2 text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Código</th>
                <th className="text-left py-2 px-1 sm:px-2 text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Descripción</th>
                <th className="text-right py-2 px-1 sm:px-2 text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cant.</th>
                <th className="text-left py-2 px-1 sm:px-2 text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Unidad</th>
                <th className="text-right py-2 px-1 sm:px-2 text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">P. Unit.</th>
                <th className="text-right py-2 px-1 sm:px-2 text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Desc.</th>
                <th className="text-right py-2 px-1 sm:px-2 text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total</th>
                <th className="w-8 sm:w-10 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {data.items.map((item) => (
                  <ItemRow key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function ItemRow({ item }: { item: QuotationItem }) {
  const { data, dispatch } = useQuotation();
  const update = (field: keyof QuotationItem, value: string | number) => {
    dispatch({ type: 'UPDATE_ITEM', id: item.id, field, value });
  };
  const total = calcItemTotal(item);

  const inputClass = "w-full px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
    >
      <td className="py-1.5 sm:py-2">
        <GripVertical className="w-3 h-3 sm:w-4 sm:h-4 text-slate-300 dark:text-slate-600 cursor-grab" />
      </td>
      <td className="py-1.5 sm:py-2 px-1 sm:px-2">
        <input value={item.code} onChange={(e) => update('code', e.target.value)} placeholder="Cód." className={`${inputClass} w-16 sm:w-20`} />
      </td>
      <td className="py-1.5 sm:py-2 px-1 sm:px-2">
        <input value={item.description} onChange={(e) => update('description', e.target.value)} placeholder="Descripción" className={`${inputClass} min-w-[100px] sm:min-w-[140px]`} />
      </td>
      <td className="py-1.5 sm:py-2 px-1 sm:px-2">
        <input type="number" min="1" value={item.quantity} onChange={(e) => update('quantity', Number(e.target.value))} className={`${inputClass} w-12 sm:w-16 text-right`} />
      </td>
      <td className="py-1.5 sm:py-2 px-1 sm:px-2">
        <input value={item.unit} onChange={(e) => update('unit', e.target.value)} placeholder="un" className={`${inputClass} w-12 sm:w-14`} />
      </td>
      <td className="py-1.5 sm:py-2 px-1 sm:px-2">
        <input type="number" min="0" value={item.unitPrice} onChange={(e) => update('unitPrice', Number(e.target.value))} className={`${inputClass} w-20 sm:w-24 text-right`} />
      </td>
      <td className="py-1.5 sm:py-2 px-1 sm:px-2">
        <input type="number" min="0" value={item.discount} onChange={(e) => update('discount', Number(e.target.value))} className={`${inputClass} w-16 sm:w-20 text-right`} />
      </td>
      <td className="py-1.5 sm:py-2 px-1 sm:px-2 text-right font-semibold text-slate-800 dark:text-slate-200 text-xs">
        {formatCurrency(total, data.currency)}
      </td>
      <td className="py-1.5 sm:py-2 px-1 sm:px-2">
        <button
          onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
          className="p-1 sm:p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>
      </td>
    </motion.tr>
  );
}
