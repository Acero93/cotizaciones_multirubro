import { motion } from 'framer-motion';
import { ArrowRight, FileText, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:via-transparent dark:to-accent/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            Cotizaciones profesionales en segundos
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
            Cotizador{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Multirubro
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Crea cotizaciones profesionales para <strong>cualquier profesión o rubro GRATIS</strong>.
            Personaliza cada detalle, agrega tu logo, configura impuestos y exporta a PDF en un instante.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/create"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-2xl shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
            >
              <FileText className="w-5 h-5" />
              Crear Cotización GRATIS
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="glass rounded-2xl p-2 shadow-2xl shadow-slate-200/50 dark:shadow-slate-900/50">
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 p-6 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="h-3 w-32 bg-slate-200 dark:bg-slate-600 rounded-full" />
                  <div className="h-2.5 w-20 bg-slate-100 dark:bg-slate-700 rounded-full mt-1.5" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-3/4 bg-slate-100 dark:bg-slate-700 rounded-full" />
                <div className="h-2.5 w-1/2 bg-slate-50 dark:bg-slate-800 rounded-full" />
                <div className="h-2.5 w-2/3 bg-slate-100 dark:bg-slate-700 rounded-full" />
              </div>
              <div className="grid grid-cols-4 gap-2 pt-2">
                <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded" />
                <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded" />
                <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded" />
                <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
