import { motion } from 'framer-motion';
import { User, Plus, Trash2 } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';

export default function ClientPanel() {
  const { data, dispatch } = useQuotation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass rounded-2xl p-6 space-y-5"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
          <User className="w-4 h-4 text-accent" />
        </div>
        <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Datos del Cliente</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input
          placeholder="Nombre del cliente *"
          value={data.client.name}
          onChange={(e) => dispatch({ type: 'SET_CLIENT_FIELD', field: 'name', value: e.target.value })}
          className="col-span-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
        <input
          placeholder="Empresa"
          value={data.client.company}
          onChange={(e) => dispatch({ type: 'SET_CLIENT_FIELD', field: 'company', value: e.target.value })}
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
        <input
          placeholder="Teléfono"
          value={data.client.phone}
          onChange={(e) => dispatch({ type: 'SET_CLIENT_FIELD', field: 'phone', value: e.target.value })}
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
        <input
          placeholder="Email"
          value={data.client.email}
          onChange={(e) => dispatch({ type: 'SET_CLIENT_FIELD', field: 'email', value: e.target.value })}
          className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
        <input
          placeholder="Dirección"
          value={data.client.address}
          onChange={(e) => dispatch({ type: 'SET_CLIENT_FIELD', field: 'address', value: e.target.value })}
          className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Campos extra del cliente</span>
          <button
            onClick={() => dispatch({ type: 'ADD_CLIENT_EXTRA_FIELD' })}
            className="flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Agregar campo
          </button>
        </div>
        {data.client.extraFields.map((field) => (
          <div key={field.id} className="flex gap-2 items-center">
            <input
              placeholder="Etiqueta"
              value={field.label}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CLIENT_EXTRA_FIELD', id: field.id, label: e.target.value, value: field.value })
              }
              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
            />
            <input
              placeholder="Valor"
              value={field.value}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CLIENT_EXTRA_FIELD', id: field.id, label: field.label, value: e.target.value })
              }
              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
            />
            <button
              onClick={() => dispatch({ type: 'REMOVE_CLIENT_EXTRA_FIELD', id: field.id })}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
