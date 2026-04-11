document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ANIMACIÓN DE LAS TARJETAS (Scroll)
    // ==========================================
    const tarjetas = document.querySelectorAll('.tarjeta');

    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Le agregamos la clase 'visible' cuando aparecen en pantalla
                entrada.target.classList.add('visible');
                // Dejamos de observar la tarjeta para que la animación se haga solo una vez
                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.15 // Se activa cuando el 15% de la tarjeta es visible
    });

    // Le decimos al observador que vigile cada tarjeta
    tarjetas.forEach(tarjeta => {
        observador.observe(tarjeta);
    });


    // ==========================================
    // 2. ENVÍO DEL FORMULARIO A WHATSAPP
    // ==========================================
    const formConsultas = document.getElementById('form-consultas');

    if (formConsultas) {
        formConsultas.addEventListener('submit', function(evento) {
            // Evitamos que la página se recargue al tocar "Enviar"
            evento.preventDefault();

            // Agarramos lo que escribió el paciente
            const nombre = document.getElementById('nombre-paciente').value;
            const mensaje = document.getElementById('mensaje-paciente').value;

            // El número de tu mamá (ya puesto con el código de Argentina y Córdoba)
            const numeroWhatsApp = "5493512354594"; 

            // Armamos el texto final que le va a llegar a ella
            const textoParaEnviar = `Hola Fonoaudiologa Maria Eugenia Galian, mi nombre es ${nombre}. Quería hacerle la siguiente consulta: ${mensaje}`;

            // Creamos el link que abre WhatsApp con el mensaje listo
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoParaEnviar)}`;

            // Abrimos WhatsApp en una pestaña nueva
            window.open(url, '_blank');
            
            // Limpiamos el formulario después de enviar
            formConsultas.reset();
        });
    }

});