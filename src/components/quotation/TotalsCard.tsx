import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';
import { calcSubtotal, calcTotalDiscount, calcTaxAmount, calcTotal, formatCurrency } from '../../utils/calculations';

export default function TotalsCard() {
  const { data } = useQuotation();
  const subtotal = calcSubtotal(data.items);
  const itemsDiscount = calcTotalDiscount(data.items);
  const taxAmount = calcTaxAmount(subtotal, data.discountValue, data.discountEnabled, data.discountType, data.tax);
  const total = calcTotal(subtotal, data.discountEnabled, data.discountType, data.discountValue, data.tax);

  let generalDiscountAmount = 0;
  let generalDiscountLabel = '';
  if (data.discountEnabled) {
    if (data.discountType === 'percentage') { generalDiscountAmount = subtotal * (data.discountValue / 100); generalDiscountLabel = `Desc. ${data.discountValue}%`; }
    else { generalDiscountAmount = data.discountValue; generalDiscountLabel = 'Desc. Gral.'; }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass rounded-2xl p-4 sm:p-6 space-y-3 overflow-hidden">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
          <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h2 className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100">Totales</h2>
      </div>

      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between text-slate-600 dark:text-slate-300"><span>Subtotal</span><span className="font-medium">{formatCurrency(subtotal, data.currency)}</span></div>
        {itemsDiscount > 0 && <div className="flex justify-between text-slate-500 dark:text-slate-400"><span>Desc. por items</span><span>-{formatCurrency(itemsDiscount, data.currency)}</span></div>}
        {data.discountEnabled && generalDiscountAmount > 0 && <div className="flex justify-between text-rose-600 dark:text-rose-400"><span>{generalDiscountLabel}</span><span>-{formatCurrency(generalDiscountAmount, data.currency)}</span></div>}
        {data.tax.enabled && <div className="flex justify-between text-amber-600 dark:text-amber-400"><span>{data.tax.name} ({data.tax.rate}%)</span><span>{formatCurrency(taxAmount, data.currency)}</span></div>}
        <div className="flex justify-between text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 pt-3 border-t-2 border-slate-200 dark:border-slate-700">
          <span>TOTAL</span><span className="text-base sm:text-lg">{formatCurrency(total, data.currency)}</span>
        </div>
      </div>
    </motion.div>
  );
}
