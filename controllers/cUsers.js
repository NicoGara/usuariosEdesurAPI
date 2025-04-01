import axios from 'axios';
import vm from 'vm';

const cUsers = {
    getUsers: async (req, res) => {
        try {
            const usuariosSinLuz = await obtenerUsuariosSinLuz();
            res.json({ total: usuariosSinLuz });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

async function obtenerUsuariosSinLuz() {
    const url = "https://www.enre.gov.ar/paginacorte/js/data_EDS.js?";
    
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
                'Referer': 'https://www.enre.gov.ar/paginacorte/tabla_cortes_edesur.html'
            }
        });

        // Ejecutar el código JS en un sandbox
        const sandbox = { data: null };
        vm.createContext(sandbox);
        vm.runInContext(data, sandbox);
        
        // Acceder al objeto data directamente
        const parsedData = sandbox.data;
        
        return parseInt(parsedData.totalUsuariosSinSuministro.replace(/\./g, ''), 10);
        
    } catch (error) {
        console.error("Error detallado:", error);
        throw new Error("Error al procesar los datos: " + error.message);
    }
}

export default cUsers;