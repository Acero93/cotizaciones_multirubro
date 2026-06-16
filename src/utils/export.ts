export function openPrintableWindow(elementId: string, title: string): void {
  const element = document.getElementById(elementId);
  if (!element) {
    alert('No se encontró el contenido para exportar.');
    return;
  }

  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((el) => el.outerHTML)
    .join('\n');

  const content = element.outerHTML;

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  ${styles}
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { background: #fff; width: 100%; min-height: 100vh; }
    body { display: flex; justify-content: center; padding: 0; }
    /* Ocultar todo excepto el preview */
    body > *:not(#quotation-preview) { display: none !important; }
    #quotation-preview {
      display: block !important;
      max-width: 210mm !important;
      margin: 0 auto !important;
      padding: 10mm !important;
      background: #fff !important;
    }
    /* Forzar que los elementos glass y dark se vean claros */
    .glass, [class*="dark:"] {
      background: #fff !important;
      border-color: #e2e8f0 !important;
      color: #1e293b !important;
      box-shadow: none !important;
      backdrop-filter: none !important;
    }
    /* Esconder barra de navegación y footer del preview */
    nav, footer, .no-print { display: none !important; }
    @media print {
      @page { size: A4; margin: 0; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    @media screen {
      body { background: #e2e8f0; padding: 20px; }
      #quotation-preview {
        box-shadow: 0 4px 24px rgba(0,0,0,0.12);
        border-radius: 4px;
        margin-top: 20px !important;
        margin-bottom: 20px !important;
      }
    }
  </style>
</head>
<body>
  ${content}
  <script>
    // Auto-abrir diálogo de impresión después de cargar
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  <\/script>
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (win) {
    win.onload = () => URL.revokeObjectURL(url);
  }
}

export function downloadPDF(elementId: string, filename: string): void {
  openPrintableWindow(elementId, filename);
}
