import { motion } from 'framer-motion';
import { Plus, Trash2, Layers } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';

export default function CustomSectionsPanel() {
  const { data, dispatch } = useQuotation();

  const inputClass = "px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="glass rounded-2xl p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Secciones Personalizadas</h2>
        </div>
        <button
          onClick={() => dispatch({ type: 'ADD_CUSTOM_SECTION' })}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          <Plus className="w-4 h-4" />
          Agregar Sección
        </button>
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500">
        Agrega secciones adicionales a tu cotización (garantías, condiciones especiales, etc.)
      </p>

      {data.customSections.map((section) => (
        <div key={section.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3 bg-white/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <input
              placeholder="Título de la sección"
              value={section.title}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_CUSTOM_SECTION_TITLE', id: section.id, title: e.target.value })
              }
              className={`flex-1 font-medium ${inputClass}`}
            />
            <button
              onClick={() => dispatch({ type: 'REMOVE_CUSTOM_SECTION', id: section.id })}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {section.fields.map((field) => (
            <div key={field.id} className="flex gap-2 items-center">
              <input
                placeholder="Etiqueta"
                value={field.label}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CUSTOM_SECTION_FIELD',
                    sectionId: section.id,
                    fieldId: field.id,
                    label: e.target.value,
                    value: field.value,
                  })
                }
                className={`flex-1 ${inputClass}`}
              />
              <input
                placeholder="Valor"
                value={field.value}
                onChange={(e) =>
                  dispatch({
                    type: 'UPDATE_CUSTOM_SECTION_FIELD',
                    sectionId: section.id,
                    fieldId: field.id,
                    label: field.label,
                    value: e.target.value,
                  })
                }
                className={`flex-1 ${inputClass}`}
              />
              <button
                onClick={() =>
                  dispatch({ type: 'REMOVE_CUSTOM_SECTION_FIELD', sectionId: section.id, fieldId: field.id })
                }
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          <button
            onClick={() => dispatch({ type: 'ADD_CUSTOM_SECTION_FIELD', sectionId: section.id })}
            className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Agregar campo
          </button>
        </div>
      ))}

      <div className="space-y-3 pt-2">
        <textarea
          placeholder="Notas adicionales..."
          value={data.notes}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'notes', value: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
        />
        <textarea
          placeholder="Términos y condiciones..."
          value={data.terms}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'terms', value: e.target.value })}
          rows={2}
          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
        />
      </div>
    </motion.div>
  );
}
