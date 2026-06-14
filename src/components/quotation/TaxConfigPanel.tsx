import { motion } from 'framer-motion';
import { Percent } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';

export default function TaxConfigPanel() {
  const { data, dispatch } = useQuotation();

  const inputClass = "px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-400 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="glass rounded-2xl p-6 space-y-4"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <Percent className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
        <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Impuesto y Descuento</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.tax.enabled}
              onChange={(e) =>
                dispatch({ type: 'SET_TAX', tax: { ...data.tax, enabled: e.target.checked } })
              }
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Aplicar impuesto</span>
          </label>
          {data.tax.enabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex gap-2"
            >
              <input
                placeholder="Nombre (IVA, IGV...)"
                value={data.tax.name}
                onChange={(e) =>
                  dispatch({ type: 'SET_TAX', tax: { ...data.tax, name: e.target.value } })
                }
                className={`flex-1 ${inputClass}`}
              />
              <div className="relative w-24">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.tax.rate}
                  onChange={(e) =>
                    dispatch({ type: 'SET_TAX', tax: { ...data.tax, rate: Number(e.target.value) } })
                  }
                  className={`w-full text-right ${inputClass}`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">%</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={data.discountEnabled}
              onChange={(e) =>
                dispatch({
                  type: 'SET_DISCOUNT',
                  enabled: e.target.checked,
                  discountType: data.discountType,
                  value: data.discountValue,
                })
              }
              className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Aplicar descuento general</span>
          </label>
          {data.discountEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex gap-2"
            >
              <select
                value={data.discountType}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_DISCOUNT',
                    enabled: true,
                    discountType: e.target.value as 'percentage' | 'amount',
                    value: data.discountValue,
                  })
                }
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              >
                <option value="percentage">%</option>
                <option value="amount">Monto fijo</option>
              </select>
              <div className="relative flex-1">
                {data.discountType === 'percentage' ? (
                  <>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={data.discountValue}
                      onChange={(e) =>
                        dispatch({
                          type: 'SET_DISCOUNT',
                          enabled: true,
                          discountType: 'percentage',
                          value: Number(e.target.value),
                        })
                      }
                      className={`w-full text-right ${inputClass}`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm">%</span>
                  </>
                ) : (
                  <input
                    type="number"
                    min="0"
                    value={data.discountValue}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_DISCOUNT',
                        enabled: true,
                        discountType: 'amount',
                        value: Number(e.target.value),
                      })
                    }
                    className={`w-full text-right ${inputClass}`}
                  />
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
