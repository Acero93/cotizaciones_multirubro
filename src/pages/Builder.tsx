import { useRef, useState, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { motion } from 'framer-motion';
import { Calendar, Hash, Clock, Coins } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CompanyPanel from '../components/quotation/CompanyPanel';
import ClientPanel from '../components/quotation/ClientPanel';
import ItemsTable from '../components/quotation/ItemsTable';
import TaxConfigPanel from '../components/quotation/TaxConfigPanel';
import TotalsCard from '../components/quotation/TotalsCard';
import CustomSectionsPanel from '../components/quotation/CustomSectionsPanel';
import QuotationPreview from '../components/quotation/QuotationPreview';
import ExportBar from '../components/quotation/ExportBar';
import SocialModal from '../components/quotation/SocialModal';
import { useQuotation } from '../context/QuotationContext';

export default function Builder() {
  const { data, dispatch } = useQuotation();
  const previewRef = useRef<HTMLDivElement>(null);
  const [showSocialModal, setShowSocialModal] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: previewRef,
    documentTitle: `Cotizacion_${data.number}`,
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .no-print { display: none !important; }
      }
    `,
  });

  const handleExportClick = useCallback(() => {
    const hideModal = localStorage.getItem('hide_social_modal');
    if (hideModal === 'true') {
      handlePrint();
    } else {
      setShowSocialModal(true);
    }
  }, [handlePrint]);

  const handleContinueExport = useCallback(() => {
    handlePrint();
  }, [handlePrint]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <SocialModal
        isOpen={showSocialModal}
        onClose={() => setShowSocialModal(false)}
        onContinue={handleContinueExport}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 no-print"
        >
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Nueva Cotización</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Completa los campos y exporta a PDF</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-3 sm:p-4 grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 no-print"
        >
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              value={data.number}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'number', value: e.target.value })}
              placeholder="Nº Cotización"
              className="flex-1 px-2 py-1.5 text-sm bg-transparent border-b border-slate-200 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="date"
              value={data.date}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'date', value: e.target.value })}
              className="flex-1 px-2 py-1.5 text-sm bg-transparent border-b border-slate-200 dark:border-slate-700 dark:text-slate-200 color-scheme:dark focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="date"
              value={data.validUntil}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'validUntil', value: e.target.value })}
              className="flex-1 px-2 py-1.5 text-sm bg-transparent border-b border-slate-200 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={data.currency}
              onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'currency', value: e.target.value })}
              className="flex-1 px-2 py-1.5 text-sm bg-transparent border-b border-slate-200 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:border-primary transition-colors"
            >
              <option value="CLP">CLP — Peso Chileno</option>
              <option value="USD">USD — Dólar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="ARS">ARS — Peso Argentino</option>
              <option value="PEN">PEN — Sol Peruano</option>
              <option value="MXN">MXN — Peso Mexicano</option>
              <option value="COP">COP — Peso Colombiano</option>
              <option value="BOB">BOB — Boliviano</option>
              <option value="PYG">PYG — Guaraní</option>
              <option value="UYU">UYU — Peso Uruguayo</option>
            </select>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6 no-print">
            <CompanyPanel />
            <ClientPanel />
            <ItemsTable />
            <TaxConfigPanel />
            <TotalsCard />
            <CustomSectionsPanel />
            <ExportBar onPrint={handleExportClick} />
          </div>
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <div className="glass rounded-2xl p-4 overflow-auto max-h-[calc(100vh-120px)]">
                <QuotationPreview ref={previewRef} />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="glass rounded-2xl p-4 overflow-auto">
            <QuotationPreview ref={previewRef} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
