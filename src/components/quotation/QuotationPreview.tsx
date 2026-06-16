import { forwardRef } from 'react';
import { useQuotation } from '../../context/QuotationContext';
import {
  calcSubtotal,
  calcTotalDiscount,
  calcTaxAmount,
  calcTotal,
  calcItemTotal,
  formatCurrency,
} from '../../utils/calculations';

const QuotationPreview = forwardRef<HTMLDivElement>((_props, ref) => {
  const { data } = useQuotation();
  const subtotal = calcSubtotal(data.items);
  const itemsDiscount = calcTotalDiscount(data.items);
  const taxAmount = calcTaxAmount(subtotal, data.discountValue, data.discountEnabled, data.discountType, data.tax);
  const total = calcTotal(subtotal, data.discountEnabled, data.discountType, data.discountValue, data.tax);

  let generalDiscountAmount = 0;
  let generalDiscountLabel = '';
  if (data.discountEnabled) {
    if (data.discountType === 'percentage') {
      generalDiscountAmount = subtotal * (data.discountValue / 100);
      generalDiscountLabel = `${data.discountValue}%`;
    } else {
      generalDiscountAmount = data.discountValue;
      generalDiscountLabel = 'Monto fijo';
    }
  }

  return (
    <div
      ref={ref}
      id="quotation-preview"
      className="w-full text-slate-800 bg-white dark:bg-white dark:text-slate-800 text-sm leading-relaxed print:max-w-[210mm] print:mx-auto print:p-0"
    >
      <style>{`
        #quotation-preview * { font-family: 'Inter', system-ui, -apple-system, sans-serif; }
        #quotation-preview table { min-width: 100%; }
        @media print {
          #quotation-preview { padding: 0 !important; max-width: 210mm; margin: 0 auto; }
          body > *:not(#quotation-preview) { display: none !important; }
          @page { size: A4; margin: 10mm; }
        }
      `}</style>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-slate-800">
          <div className="flex items-start gap-4">
            {data.company.logo && (
              <img src={data.company.logo} alt="Logo" className="w-20 h-20 object-contain rounded" />
            )}
            <div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900">{data.company.name || 'Mi Empresa'}</h1>
            <div className="mt-1.5 space-y-0.5 text-slate-600 text-[10px] sm:text-xs">
                {data.company.address && <p>{data.company.address}</p>}
                {data.company.phone && <p>Tel: {data.company.phone}</p>}
                {data.company.email && <p>Email: {data.company.email}</p>}
                {data.company.website && <p>Web: {data.company.website}</p>}
                {data.company.extraFields.map((f) => (
                  f.label && <p key={f.id}>{f.label}: {f.value}</p>
                ))}
              </div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-bold text-primary">COTIZACIÓN</h2>
            <p className="text-sm font-semibold mt-1">{data.number}</p>
            <div className="mt-2 text-xs text-slate-600 space-y-0.5">
              <p>Fecha: {data.date}</p>
              <p>Válido hasta: {data.validUntil}</p>
              <p>Moneda: {data.currency}</p>
            </div>
          </div>
        </div>

        {/* Client */}
        <div className="mb-6 p-4 bg-slate-50 rounded-lg">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Cliente</h3>
          <p className="font-semibold text-slate-800">{data.client.name || '—'}</p>
          <div className="mt-1 text-xs text-slate-600 space-y-0.5">
            {data.client.company && <p>Empresa: {data.client.company}</p>}
            {data.client.address && <p>Dirección: {data.client.address}</p>}
            {data.client.phone && <p>Tel: {data.client.phone}</p>}
            {data.client.email && <p>Email: {data.client.email}</p>}
            {data.client.extraFields.map((f) => (
              f.label && <p key={f.id}>{f.label}: {f.value}</p>
            ))}
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-6 border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white text-xs">
              <th className="py-2.5 px-3 text-left font-semibold rounded-tl-lg">Código</th>
              <th className="py-2.5 px-3 text-left font-semibold">Descripción</th>
              <th className="py-2.5 px-3 text-center font-semibold">Cant.</th>
              <th className="py-2.5 px-3 text-center font-semibold">Unidad</th>
              <th className="py-2.5 px-3 text-right font-semibold">P. Unitario</th>
              <th className="py-2.5 px-3 text-right font-semibold">Descuento</th>
              <th className="py-2.5 px-3 text-right font-semibold rounded-tr-lg">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, idx) => (
              <tr key={item.id} className={`border-b border-slate-200 text-xs ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <td className="py-2 px-3">{item.code || '—'}</td>
                <td className="py-2 px-3">{item.description || '—'}</td>
                <td className="py-2 px-3 text-center">{item.quantity}</td>
                <td className="py-2 px-3 text-center">{item.unit}</td>
                <td className="py-2 px-3 text-right">{formatCurrency(item.unitPrice, data.currency)}</td>
                <td className="py-2 px-3 text-right">{item.discount > 0 ? formatCurrency(item.discount, data.currency) : '—'}</td>
                <td className="py-2 px-3 text-right font-semibold">{formatCurrency(calcItemTotal(item), data.currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-64 space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="text-slate-600">Subtotal</span>
              <span className="font-medium">{formatCurrency(subtotal, data.currency)}</span>
            </div>
            {itemsDiscount > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-200 text-slate-500">
                <span>Desc. por items</span>
                <span>-{formatCurrency(itemsDiscount, data.currency)}</span>
              </div>
            )}
            {data.discountEnabled && generalDiscountAmount > 0 && (
              <div className="flex justify-between py-1 border-b border-slate-200 text-rose-600">
                <span>Descuento ({generalDiscountLabel})</span>
                <span>-{formatCurrency(generalDiscountAmount, data.currency)}</span>
              </div>
            )}
            {data.tax.enabled && (
              <div className="flex justify-between py-1 border-b border-slate-200 text-amber-600">
                <span>{data.tax.name} ({data.tax.rate}%)</span>
                <span>{formatCurrency(taxAmount, data.currency)}</span>
              </div>
            )}
            <div className="flex justify-between py-2 font-bold text-sm text-slate-900 bg-slate-100 px-2 rounded">
              <span>TOTAL</span>
              <span>{formatCurrency(total, data.currency)}</span>
            </div>
          </div>
        </div>

        {/* Custom Sections */}
        {data.customSections.map((section) => (
          <div key={section.id} className="mb-4">
            {section.title && (
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 pb-1 border-b border-slate-300">
                {section.title}
              </h3>
            )}
            <div className="text-xs text-slate-600 space-y-0.5">
              {section.fields.map((f) => (
                f.label && <p key={f.id}><strong>{f.label}:</strong> {f.value}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Notes & Terms */}
        {data.notes && (
          <div className="mb-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
            <strong>Notas:</strong> {data.notes}
          </div>
        )}
        {data.terms && (
          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600">
            <strong>Términos y condiciones:</strong> {data.terms}
          </div>
        )}
      </div>
    </div>
  );
});

QuotationPreview.displayName = 'QuotationPreview';

export default QuotationPreview;
