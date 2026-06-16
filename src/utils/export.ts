import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const COLOR_PROPS = [
  'color', 'backgroundColor', 'borderColor', 'borderTopColor',
  'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'outlineColor', 'textDecorationColor', 'caretColor',
  'columnRuleColor', 'fill', 'stroke',
];

function applyComputedColors(sourceDoc: Document, clonedDoc: Document): void {
  // Remove ALL stylesheets from clone - we'll use only inline computed colors
  clonedDoc.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => el.remove());

  const sourceEls = sourceDoc.querySelectorAll('#quotation-preview, #quotation-preview *');
  const clonedEls = clonedDoc.querySelectorAll('#quotation-preview, #quotation-preview *');

  sourceEls.forEach((src, i) => {
    if (!clonedEls[i]) return;
    const computed = sourceDoc.defaultView?.getComputedStyle(src as Element);
    if (!computed) return;

    const cloned = clonedEls[i] as HTMLElement;

    COLOR_PROPS.forEach((prop) => {
      const val = computed.getPropertyValue(prop);
      if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent' && val !== 'none') {
        cloned.style.setProperty(prop, val);
      }
    });

    // Copy layout-critical properties
    const layoutProps = [
      'display', 'flex-direction', 'justify-content', 'align-items', 'gap',
      'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'width', 'max-width', 'min-width', 'height', 'max-height',
      'font-size', 'font-weight', 'font-family', 'text-align', 'line-height',
      'border-style', 'border-width', 'border-radius', 'border-collapse',
      'white-space', 'overflow', 'position', 'top', 'right', 'bottom', 'left',
      'text-transform', 'letter-spacing',
    ];
    layoutProps.forEach((prop) => {
      const val = computed.getPropertyValue(prop);
      if (val && val !== 'normal' && val !== 'auto' && val !== 'none' && val !== '0px' && val !== 'static') {
        cloned.style.setProperty(prop, val);
      }
    });

    // Copy background
    const bgImage = computed.getPropertyValue('background-image');
    if (bgImage && bgImage !== 'none') {
      cloned.style.setProperty('background-image', bgImage);
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
