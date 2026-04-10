// ==========================================
// CONFIGURACIÓN DE NÚMEROS (EL ROUTER)
// Reemplazá estos números por los reales de cada profesional.
// Formato: 549 + código de área + número (sin el 15).
// Ejemplo: "5493511234567"
// ==========================================

const TELEFONOS = {
    "Fonoaudiología": "5493510000001", // Celular de tu mamá
    "Kinesiología": "5493510000002",   // Celular Kinesióloga
    "Psicología": "5493510000003",     // Celular Psicóloga
    "Consulta general": "5493510000001" // Por defecto va a tu mamá
};

// --- 1. FUNCIÓN PARA LOS BOTONES DE LAS TARJETAS ---
function contactarProfesional(area, numeroDestino) {
    const mensaje = `Hola, me gustaría hacer una consulta para el área de *${area}*.`;
    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// --- 2. LÓGICA DEL FORMULARIO (Enrutador Inteligente) ---
const form = document.getElementById('formConsulta');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita recargar la página

        const nombre = document.getElementById('nombre').value;
        const areaSeleccionada = document.getElementById('motivo').value;
        const mensajeUsuario = document.getElementById('mensaje').value;

        // Busca el número en el diccionario, si falla usa el de consulta general
        const numeroFinal = TELEFONOS[areaSeleccionada] || TELEFONOS["Consulta general"];

        // Arma el texto
        let textoWhatsApp = `Hola, mi nombre es *${nombre}*.\n\nQuería consultar por: *${areaSeleccionada}*.`;
        
        if (mensajeUsuario.trim() !== "") {
            textoWhatsApp += `\n\nMensaje adicional:\n"${mensajeUsuario}"`;
        }

        // Abre WhatsApp
        const url = `https://wa.me/${numeroFinal}?text=${encodeURIComponent(textoWhatsApp)}`;
        window.open(url, "_blank");
    });
}

// --- 3. LÓGICA DEL BOTÓN DE COMPARTIR (Web Share API) ---
const btnCompartir = document.getElementById('btnCompartir');

if (btnCompartir) {
    btnCompartir.addEventListener('click', async () => {
        // Datos que se van a compartir
        const shareData = {
            title: 'Centro Integral de Salud',
            text: '¡Mirá el nuevo centro de salud integral especializado en Fonoaudiología, Kinesiología y Psicología!',
            url: window.location.href // Captura automáticamente tu link de GitHub Pages
        };

        // Verifica si el navegador soporta el menú nativo de compartir
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Página compartida con éxito');
            } catch (err) {
                console.log('Error al compartir o cancelado por el usuario:', err);
            }
        } else {
            // Plan B (Para PCs o navegadores no compatibles): Copia el link al portapapeles
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert("¡Link copiado al portapapeles! Ya podés pegarlo y compartirlo.");
            }).catch(err => {
                console.error("No se pudo copiar el link: ", err);
            });
        }
    });
}