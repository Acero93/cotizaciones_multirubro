import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const COLOR_PROPS = [
  'color', 'backgroundColor', 'borderColor', 'borderTopColor',
  'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'outlineColor', 'textDecorationColor', 'caretColor',
  'columnRuleColor', 'fill', 'stroke',
];

function applyComputedColors(sourceDoc: Document, clonedDoc: Document): void {
  const sourceEls = sourceDoc.querySelectorAll('#quotation-preview, #quotation-preview *');
  const clonedEls = clonedDoc.querySelectorAll('#quotation-preview, #quotation-preview *');

  sourceEls.forEach((src, i) => {
    if (!clonedEls[i]) return;
    const computed = sourceDoc.defaultView?.getComputedStyle(src as Element);
    if (!computed) return;

    const cloned = clonedEls[i] as HTMLElement;
    const inline: string[] = [];

    COLOR_PROPS.forEach((prop) => {
      const val = computed.getPropertyValue(prop);
      if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent') {
        inline.push(`${prop}: ${val}`);
      }
    });

    const bgImage = computed.getPropertyValue('background-image');
    if (bgImage && bgImage !== 'none') {
      inline.push(`background-image: ${bgImage}`);
    }

    if (inline.length > 0) {
      cloned.style.cssText = inline.join('; ') + '; ' + cloned.style.cssText;
    }
  });
}

export async function downloadPDF(elementId: string, filename: string): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      alert('No se encontró el contenido para exportar.');
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      allowTaint: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        applyComputedColors(document, clonedDoc);
      },
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 0;
    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
  } catch (err) {
    console.error('Error al exportar PDF:', err);
    alert('Ocurrió un error al generar el PDF.');
  }
}

export function openPrintableWindow(_elementId: string, _title: string): void {
  // Replaced by direct download
}
