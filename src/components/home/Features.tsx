import { motion } from 'framer-motion';
import {
  Briefcase,
  Palette,
  Calculator,
  FileDown,
  Settings2,
  Building2,
  Stethoscope,
  Wrench,
  GraduationCap,
} from 'lucide-react';

const features = [
  { icon: Briefcase, title: 'Multirubro', desc: 'Funciona para cualquier profesión: electricistas, médicos, diseñadores, constructores y más.' },
  { icon: Palette, title: 'Personalizable', desc: 'Agrega tu logo, campos extra en empresa, cliente y cotización. Todo adaptable.' },
  { icon: Calculator, title: 'Impuesto Variable', desc: 'Configura el nombre y porcentaje del impuesto según tu país o régimen tributario.' },
  { icon: FileDown, title: 'Exporta a PDF', desc: 'Documento listo para imprimir o enviar. Profesional y con todos los detalles.' },
  { icon: Settings2, title: 'Tabla Dinámica', desc: 'Agrega, quita y edita filas. Código, descripción, cantidad, precio unitario y más.' },
  { icon: Building2, title: 'Datos de Empresa', desc: 'Carga tu información profesional, logo y campos adicionales que necesites mostrar.' },
];

const rubros = [
  { icon: Wrench, label: 'Oficios' },
  { icon: Stethoscope, label: 'Salud' },
  { icon: GraduationCap, label: 'Educación' },
  { icon: Palette, label: 'Diseño' },
  { icon: Briefcase, label: 'Consultoría' },
  { icon: Building2, label: 'Construcción' },
];

export default function Features() {
  return (
    <section className="py-20 sm:py-28 bg-white/40 dark:bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100">
            ¿Para qué rubro?
          </h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Diseñado para adaptarse a cualquier profesión u oficio
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {rubros.map((r) => (
              <div
                key={r.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
              >
                <r.icon className="w-4 h-4" />
                {r.label}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group glass rounded-2xl p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
