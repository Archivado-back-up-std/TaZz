// Datos simulados de hackathones (usados como respaldo si no se puede cargar el archivo)
const hackathonsSimulados = [
    {
        fechaEnvio: "2024-10-01",
        fechaDeadline: "2024-12-15",
        nombre: "Hackathon Innovación",
        premio: "$10,000",
        link: "https://ejemplo.com/hack1"
    },
    {
        fechaEnvio: "2024-11-01",
        fechaDeadline: "2024-12-31",
        nombre: "Hackathon Tecnología",
        premio: "$5,000",
        link: "https://ejemplo.com/hack2"
    },
    {
        fechaEnvio: "2026-01-15",
        fechaDeadline: "2026-03-15",
        nombre: "Hackathon IA 2026",
        premio: "$15,000",
        link: "https://ejemplo.com/hack3"
    }
];

/**
 * Calcula los días restantes desde hoy hasta la fecha deadline
 * @param {string} fechaDeadline - Fecha en formato YYYY-MM-DD
 * @returns {number|string} - Número de días restantes o "Finalizado"
 */
function calcularDiasRestantes(fechaDeadline) {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Resetear horas para comparar solo días
    
    const deadline = new Date(fechaDeadline);
    deadline.setHours(0, 0, 0, 0);
    
    const diferenciaMilisegundos = deadline - hoy;
    const diasRestantes = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    
    if (diasRestantes < 0) {
        return "Finalizado";
    }
    
    return diasRestantes;
}

/**
 * Crea un elemento HTML de fila de tabla para un hackathon
 * @param {object} hackathon - Objeto con datos del hackathon
 * @returns {HTMLElement} - Elemento tr con la fila del hackathon
 */
function crearTarjetaHackathon(hackathon) {
    const row = document.createElement('tr');
    
    const diasRestantes = calcularDiasRestantes(hackathon.fechaDeadline);
    const claseEstado = diasRestantes === "Finalizado" ? "finalizado" : (diasRestantes <= 7 ? "urgente" : diasRestantes <= 30 ? "proximo" : "activo");
    
    row.innerHTML = `
        <td class="nombre">${hackathon.nombre}</td>
        <td class="premio">${hackathon.premio}</td>
        <td>${hackathon.fechaEnvio}</td>
        <td>${hackathon.fechaDeadline}</td>
        <td class="dias-restantes ${claseEstado}">${diasRestantes === "Finalizado" ? diasRestantes : diasRestantes + " days"}</td>
        <td><a href="${hackathon.link}" target="_blank" class="btn-link">Link</a></td>
    `;
    
    return row;
}

/**
 * Procesa el texto del archivo hc.txt y lo convierte en array de objetos
 * @param {string} texto - Contenido del archivo de texto
 * @returns {Array} - Array de objetos de hackathones
 */
function procesarTextoHackathons(texto) {
    const lineas = texto.trim().split('\n');
    const hackathons = [];
    
    lineas.forEach((linea, index) => {
        // Saltar líneas vacías
        if (!linea.trim()) return;
        
        const partes = linea.split(',');
        
        // Validar que la línea tenga el formato correcto
        if (partes.length >= 5) {
            hackathons.push({
                fechaEnvio: partes[0].trim(),
                fechaDeadline: partes[1].trim(),
                nombre: partes[2].trim(),
                premio: partes[3].trim(),
                link: partes[4].trim()
            });
        } else {
            console.warn(`Línea ${index + 1} tiene formato incorrecto: ${linea}`);
        }
    });
    
    return hackathons;
}

/**
 * Carga los hackathones desde el archivo o usa datos simulados como respaldo
 */
async function cargarHackathons() {
    const container = document.getElementById('hackathons-container');
    let hackathons = [];
    
    try {
        // Intentar cargar desde el archivo hc.txt
        const response = await fetch('hc.txt');
        
        if (!response.ok) {
            throw new Error(`Error al cargar el archivo: ${response.status}`);
        }
        
        const texto = await response.text();
        hackathons = procesarTextoHackathons(texto);
        
        console.log('Hackathones cargados desde archivo:', hackathons.length);
        
    } catch (error) {
        console.warn('No se pudo cargar hc.txt, usando datos simulados:', error.message);
        hackathons = hackathonsSimulados;
    }
    
    // Limpiar el contenedor
    container.innerHTML = '';
    
    // Si no hay hackathones, mostrar mensaje
    if (hackathons.length === 0) {
        container.innerHTML = '<tr><td colspan="6" class="no-data">No hay hackathones disponibles en este momento.</td></tr>';
        return;
    }
    
    // Crear y agregar filas al contenedor
    hackathons.forEach(hackathon => {
        const fila = crearTarjetaHackathon(hackathon);
        container.appendChild(fila);
    });
    
    console.log(`Se han cargado ${hackathons.length} hackathones`);
}

// Cargar los hackathones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', cargarHackathons);
