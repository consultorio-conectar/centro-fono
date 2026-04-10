document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todas las tarjetas de servicios
    const tarjetas = document.querySelectorAll('.tarjeta');

    // Creamos el observador para detectar cuando entran en pantalla
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
});