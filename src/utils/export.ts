import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image-more';

export async function downloadPDF(elementId: string, filename: string): Promise<void> {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      alert('No se encontró el contenido para exportar.');
      return;
    }

    const dataUrl = await domtoimage.toPng(element, {
      quality: 1,
      scale: 2,
      cacheBust: true,
      bgcolor: '#ffffff',
      style: {
        transform: 'none',
      },
    });

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const img = new Image();
    img.src = dataUrl;

    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (img.height * imgWidth) / img.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
  } catch (err) {
    console.error('Error al exportar PDF:', err);
    alert('Ocurrió un error al generar el PDF.');
  }
}
