import { clasificadoresLabels, regionLabels, tipoLabels } from '@/components/mapping';
import { ReportType } from '@/components/schemas';
import { getCountryForRegion } from '@/components/utils';

async function urlToBase64(path: string): Promise<string> {
    const res = await fetch(path);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}


const clasificadorPaths: Record<string, string> = {
    "Refleja el terroir":   "/img/clasificadores/Refleja el terroir.png",
    "Generación de saliva": "/img/clasificadores/Generacion de saliva.png",
    "Cuerpo redondo":       "/img/clasificadores/Cuerpo redondo.png",
    "Armonía perfecta":     "/img/clasificadores/Armonia perfecta.png",
    "Capas aromáticas":     "/img/clasificadores/Capas aromaticas.png",
    "Añejamiento noble":    "/img/clasificadores/Anejamiento noble.png",
    "Muchas infusiones":    "/img/clasificadores/Muchas infusiones.png",
    "Aroma puro":           "/img/clasificadores/Aroma puro.png",
    "Ligereza":             "/img/clasificadores/Ligereza.png",
};

async function getClasificadorBase64(label: string): Promise<string> {
    const path = clasificadorPaths[label];
    if (!path) throw new Error(`Unknown clasificador: ${label}`);
    return urlToBase64(path);
}

const tipoToFolder: Record<string, string> = {
    "白茶":      "Blanco",
    "绿茶":      "Verde",
    "Ryukyucha": "Verde",
    "黃茶":      "Amarillo",
    "Hwangcha":  "Amarillo",
    "乌龙":      "Oolong",
    "红茶":      "Negro",
    "生普":      "Puerh",
    "熟普":      "Puerh",
    "떡차":      "Puerh",
};

async function getWatermarkBase64(
    tipo: string
): Promise<{ img: string; opacity: number; folder: string } | null> {
    const folder = tipoToFolder[tipo];
    if (!folder) return null;

    const variant = Math.floor(Math.random() * 3) + 1;
    const path = `/img/watermark/${folder}-${variant}.png`;

    const img = await urlToBase64(path);
    return {
        img,
        opacity: folder === 'Blanco' ? 0.50 : 0.10,
        folder,
    };
}

export async function GeneratePDF(draft: ReportType): Promise<void> {
    const clasificadorLabel = clasificadoresLabels[draft.postinfusion.clasificadores ?? 'Ninguno'];
    const clasificadorImg = clasificadorLabel !== 'Ninguno'
        ? await getClasificadorBase64(clasificadorLabel)
        : null;

    const watermark = await getWatermarkBase64(draft.analisis.tipo);

    const html = buildHTML(draft, {}, clasificadorImg, clasificadorLabel, watermark);

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        alert('El navegador bloqueó la ventana emergente. Permite los pop-ups para esta página.');
        return;
    }

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();

    printWindow.onload = () => {
        setTimeout(() => printWindow.print(), 300);
    };
}

  function buildHTML(
      draft: ReportType,
      customRegions: Record<string, string[]>,
      clasificadorImg: string | null,
      clasificadorLabel: string,
      watermark: { img: string; opacity: number; folder: string } | null, 
  ) {
      const country = getCountryForRegion(draft.analisis.region, customRegions)
      const regionDisplay = regionLabels[draft.analisis.region] ?? draft.analisis.region;
      const totalScore = draft.infusiones.reduce((acc, inf) => acc + (Number(inf.score) || 0), 0);
      const averageScore = draft.infusiones.length > 0 
          ? (totalScore / draft.infusiones.length).toFixed(1) 
          : 0;
      const fecha = draft.fecha.toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
      }).replace(/\//g, '-')
      const accentColor: Record<string, string> = {
          'Blanco':   '#C8B89A',
          'Verde':    '#6B8F5E',
          'Amarillo': '#C9A84C',
          'Oolong':   '#8B6914',
          'Negro':    '#3B2A1A',
          'Puerh':    '#7A3B2E',
      };

      const accent = watermark ? (accentColor[watermark.folder] ?? '#8B7355') : '#8B7355';

    return `
    <html>
      <head>
        <style>
           .watermark {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              object-fit: contain;
              object-position: center center;              
              opacity: ${watermark?.opacity ?? 0.10};
              pointer-events: none;
            }

          body { 
            position: relative; 
            z-index: 1; 
            font-family: 'Helvetica', sans-serif; 
            color: #1A1209; 
            padding: 30px; 
            line-height: 1.4; 
            }
          
          /* Cabecera con Sello */
          .header-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            padding-bottom: 10px;
            margin-bottom: 30px;
            border-bottom: 2px solid ${accent};
          }

          .header-title { flex: 1; }
          h1 { color: #8B7355; margin: 0; font-size: 1.8em; text-transform: uppercase; letter-spacing: 1px; }

          .clasificador {
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 120px;
            margin-left: 20px;
            margin-bottom: -15px; 
            background-color: rgba(255, 255, 255, 0.75);
            padding: 5px;
          }

          .clasificador img { 
            width: 100px; 
            height: 100px; 
            object-fit: contain; 
          }

          .clasificador-text { 
            font-size: 0.85em; 
            color: #5D4037; 
            font-weight: bold; 
            text-transform: uppercase; 
            margin-top: 5px;
          }

          .clasificador-sub { 
            font-size: 0.7em; 
            color: #8B7355; 
            font-style: italic; 
          }

          .text {
            position: relative;
            z-index: 2;
          }

          /* Secciones y Contenido */
          h2 { color: #2C1A0E; margin-top: 25px; border-left: 4px solid ${accent}; padding-left: 10px; font-size: 1.2em; }
          .section { margin-bottom: 15px; padding: 12px; background: rgba(253, 251, 250, 0.75); border-radius: 8px; border: 1px solid #F2EBE4; }
          .label { font-weight: bold; color: ${accent}; text-transform: uppercase; font-size: 0.75em; margin-right: 5px; }
          .value { color: #1A1209; }
          
          p { margin: 6px 0; font-size: 0.9em; }
          .footer { margin-top: 50px; font-size: 0.7em; text-align: center; color: ${accent}; border-top: 1px solid ${accent}; padding-top: 20px; }
          strong { color: ${accent}; }
        </style>
      </head>
      <body>
        ${watermark ? `<img class="watermark" src="${watermark.img}" />` : ''}
        
        <div class="header-wrapper">
          <div class="header-title">
            <h1 class="text">Reporte de Cata</h1>
            <div class="text" style="font-size: 1.4em; color: #2C1A0E; font-weight: bold;">${draft.analisis.nombre}</div>
          </div>
          
          ${clasificadorImg ? `
            <div class="clasificador">
              <img src="${clasificadorImg}" />
              <div class="clasificador-text">${clasificadorLabel}</div>
              <div class="clasificador-sub">${draft.postinfusion.clasificadores || ''}</div>
            </div>
          ` : ''}
        </div>

        <div class="section">
          <p class="text"><span class="label">Revisor:</span> <span class="value">${draft.reviewer}</span></p>
          <p class="text"><span class="label">Fecha:</span> <span class="value">${fecha}</span></p>
          <p class="text"><span class="label">Origen:</span> <span class="value">${regionDisplay}${country ? `, ${country}` : ''}</span></p>
          <p class="text"><span class="label">Tipo:</span> <span class="value">${tipoLabels[draft.analisis.tipo] || draft.analisis.tipo}</span></p>
          <p class="text"><span class="label">Corte:</span> <span class="value">${draft.analisis.corte}</span></p>
          <p class="text"><span class="label">Método:</span> <span class="value">${draft.analisis.metodo}</span></p>
        </div>

        <h2>Preinfusión</h2>
        <div class="section">
          <p class="text"><span class="label">Forma/Textura:</span> ${draft.analisis.formaHierba}</p>
          <p class="text"><span class="label">Cantidad:</span> ${draft.analisis.cantidad}g</p>
          <p class="text"><span class="label">Aroma Seco:</span> ${draft.analisis.aromaHebra.join(', ')}</p>
          <p class="text"><span class="label">Manufactura:</span> ${draft.analisis.manufactura}</p>
        </div>

        ${draft.infusiones.map((inf, i) => `
          <h2 class="text">Infusión ${i + 1}</h2>
          <div class="section">
            <p class="text"><span class="label">Parámetros:</span> ${inf.temperatura}°C | ${inf.tiempo} seg</p>
            <p class="text"><span class="label">Licor:</span> ${inf.colorLicor} (Aro: ${inf.colorAro})</p>
            <p class="text"><span class="label">Aromas:</span> ${[...inf.aroma, ...inf.aromaPersonalizado].join(', ')}</p>
            <p class="text"><span class="label">Sabor/Cuerpo:</span> ${inf.sabor.join(', ')} | Cuerpo: ${inf.cuerpo}</p>
            <p class="text"><span class="label">Puntaje:</span> <strong>${inf.score}/5</strong></p>
          </div>
        `).join('')}

        <h2 class="text">Postinfusión</h2>
        <div class="section">
          <p class="text"><span class="label">Tacto:</span> ${draft.postinfusion.tacto}</p>
          <p class="text"><span class="label">Aroma de Fondo:</span> ${draft.postinfusion.aromaFondo.join(', ')}</p>
          <p class="text"><span class="label">Maridaje:</span> ${draft.postinfusion.maridaje}</p>
          <p class="text"><span class="label">Observaciones:</span> ${draft.postinfusion.observaciones || 'Sin observaciones'}</p>
          <p class="text" style="font-size: 1.1em; margin-top: 10px;"><span class="label">Puntaje Final:</span> <strong>${averageScore}/5</strong></p>
        </div>

        <div class="footer">
          Generado por Recuerdos de Té · Desarrollado por Ivan Benedetti · ${new Date().getFullYear()}
        </div>
      </body>
    </html>
    `;
}