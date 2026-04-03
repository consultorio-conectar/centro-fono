// --- CONFIGURACIÓN ---
// Reemplazá con el número real de tu mamá (549 + área + número, sin el 15)
// Ejemplo para Córdoba: 5493516123456
const TELEFONO_WHATSAPP = "5493517667909"; 

// --- LÓGICA ---

// 1. Configurar el enlace del botón flotante automáticamente
document.getElementById('whatsappFloat').href = `https://wa.me/${5493517667909}`;

// 2. Lógica para el formulario de consultas directas
const form = document.getElementById('formConsulta');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que la página se recargue

        // Capturamos los datos
        const nombre = document.getElementById('nombre').value;
        const motivo = document.getElementById('motivo').value;
        const mensaje = document.getElementById('mensaje').value;

        // Armamos el texto estructurado para tu mamá
        // Usamos asteriscos para poner negrita en WhatsApp
        let textoWhatsApp = `Hola, mi nombre es *${nombre}*.\n\nQuería consultar por: *${motivo}*.`;
        
        if (mensaje.trim() !== "") {
            textoWhatsApp += `\n\nMensaje adicional:\n"${mensaje}"`;
        }

        // Abrimos WhatsApp con el texto codificado
        const url = `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(textoWhatsApp)}`;
        window.open(url, "_blank");
    });
}