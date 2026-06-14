import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Plus, Trash2 } from 'lucide-react';
import { useQuotation } from '../../context/QuotationContext';

export default function CompanyPanel() {
  const { data, dispatch } = useQuotation();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      dispatch({ type: 'SET_COMPANY_LOGO', logo: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const inputClass = "px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";
  const smallInputClass = "flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6 space-y-5"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Upload className="w-4 h-4 text-primary" />
        </div>
        <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Datos de tu Empresa</h2>
      </div>

      <div className="flex items-start gap-5">
        <div className="relative">
          {data.company.logo ? (
            <div className="relative group">
              <img
                src={data.company.logo}
                alt="Logo"
                className="w-24 h-24 rounded-xl object-contain border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 p-2"
              />
              <button
                onClick={() => dispatch({ type: 'SET_COMPANY_LOGO', logo: null })}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileRef.current?.click()}
              className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary hover:bg-primary/5 dark:hover:bg-primary/10 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Upload className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              <span className="text-xs text-slate-400 dark:text-slate-500">Logo</span>
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
        </div>

        <div className="flex-1 grid sm:grid-cols-2 gap-3">
          <input
            placeholder="Nombre de la empresa *"
            value={data.company.name}
            onChange={(e) => dispatch({ type: 'SET_COMPANY_FIELD', field: 'name', value: e.target.value })}
            className={`col-span-2 ${inputClass}`}
          />
          <input
            placeholder="Dirección"
            value={data.company.address}
            onChange={(e) => dispatch({ type: 'SET_COMPANY_FIELD', field: 'address', value: e.target.value })}
            className={inputClass}
          />
          <input
            placeholder="Teléfono"
            value={data.company.phone}
            onChange={(e) => dispatch({ type: 'SET_COMPANY_FIELD', field: 'phone', value: e.target.value })}
            className={inputClass}
          />
          <input
            placeholder="Email"
            value={data.company.email}
            onChange={(e) => dispatch({ type: 'SET_COMPANY_FIELD', field: 'email', value: e.target.value })}
            className={inputClass}
          />
          <input
            placeholder="Sitio web"
            value={data.company.website}
            onChange={(e) => dispatch({ type: 'SET_COMPANY_FIELD', field: 'website', value: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Campos extra</span>
          <button
            onClick={() => dispatch({ type: 'ADD_COMPANY_EXTRA_FIELD' })}
            className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors"
          >
            <Plus className="w-3 h-3" />
            Agregar campo
          </button>
        </div>
        {data.company.extraFields.map((field) => (
          <div key={field.id} className="flex gap-2 items-center">
            <input
              placeholder="Etiqueta"
              value={field.label}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_COMPANY_EXTRA_FIELD', id: field.id, label: e.target.value, value: field.value })
              }
              className={smallInputClass}
            />
            <input
              placeholder="Valor"
              value={field.value}
              onChange={(e) =>
                dispatch({ type: 'UPDATE_COMPANY_EXTRA_FIELD', id: field.id, label: field.label, value: e.target.value })
              }
              className={smallInputClass}
            />
            <button
              onClick={() => dispatch({ type: 'REMOVE_COMPANY_EXTRA_FIELD', id: field.id })}
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
