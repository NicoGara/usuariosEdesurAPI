import puppeteer from "puppeteer";

const cUsers={
    getUsers: async (req, res) => {
        try {
            const primerNumero = await obtenerPrimerNumero();
            res.json({ primerNumero });
          } catch (error) {
            res.status(500).json({ error: 'No se pudo obtener el valor' });
          }
    }
}

async function obtenerPrimerNumero() {
    const url ="https://www.argentina.gob.ar/enre/estado-del-servicio-electrico-de-edesur";
  
    const browser = await puppeteer.launch({ headless: true ,   args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
  
    await page.goto(url, { waitUntil: "networkidle2" });
  
    // Buscar el frame que contiene la tabla
    const frame = page
      .frames()
      .find((f) =>
        f
          .url()
          .includes(
            "https://www.enre.gov.ar/paginacorte/tabla_cortes_edesur.html"
          )
      );
    const text = await frame.evaluate(() => document.body.innerText);
  
    // Función para extraer el texto deseado mediante regex
    function extraerTextoRegex(texto) {
      const regex =
        /TOTAL DE USUARIOS CON SUMINISTRO([\s\S]*?)DETALLE DE LOS CORTES/;
      const match = texto.match(regex);
      return match ? match[1].trim() : "";
    }
  
    const resultado = extraerTextoRegex(text);
  
    // Extraer hasta el primer salto de línea
    const indiceSalto = resultado.indexOf("\n");
    const primerNumero =
      indiceSalto !== -1
        ? resultado.substring(0, indiceSalto).trim()
        : resultado.trim();
  
    await browser.close();
  
    return primerNumero;
  }


export default cUsers;