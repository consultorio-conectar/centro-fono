// ==========================================
// CONFIGURACIÓN DE NÚMEROS (EL ROUTER)
// ==========================================

const TELEFONOS = {
    "Fonoaudiología": "5493512354594", 
    "Psicología": "5493533438382",     
    "Consulta general": "5493512354594" 
};

// --- 1. EFECTO TYPING ---
const words = ["Psicología", "Fonoaudiología", "Bienestar", "Salud"];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
  currentWord = words[i];
  if (isDeleting) {
    document.getElementById("typing-text").textContent = currentWord.substring(0, j - 1);
    j--;
    if (j == 0) {
      isDeleting = false;
      i = (i + 1) % words.length;
    }
  } else {
    document.getElementById("typing-text").textContent = currentWord.substring(0, j + 1);
    j++;
    if (j == currentWord.length) {
      isDeleting = true;
    }
  }
  setTimeout(type, isDeleting ? 100 : 200);
}

// --- 2. REVEAL ON SCROLL ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

// Iniciar efectos usando DOMContentLoaded en lugar de onload
document.addEventListener("DOMContentLoaded", () => {
    type();
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});

// --- 3. FUNCIÓN PARA LOS BOTONES DE LAS TARJETAS ---
function contactarProfesional(area, numeroDestino) {
    const mensaje = `Hola, me gustaría hacer una consulta para el área de *${area}*.`;
    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// --- 4. LÓGICA DEL FORMULARIO ---
const form = document.getElementById('formConsulta');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const areaSeleccionada = document.getElementById('motivo').value;
        const mensajeUsuario = document.getElementById('mensaje').value;

        const numeroFinal = TELEFONOS[areaSeleccionada] || TELEFONOS["Consulta general"];

        let textoWhatsApp = `Hola, mi nombre es *${nombre}*.\n\nQuería consultar por: *${areaSeleccionada}*.`;
        
        if (mensajeUsuario.trim() !== "") {
            textoWhatsApp += `\n\nMensaje adicional:\n"${mensajeUsuario}"`;
        }

        const url = `https://wa.me/${numeroFinal}?text=${encodeURIComponent(textoWhatsApp)}`;
        window.open(url, "_blank");
    });
}

// --- 5. LÓGICA DEL BOTÓN DE COMPARTIR ---
const btnCompartir = document.getElementById('btnCompartir');

if (btnCompartir) {
    btnCompartir.addEventListener('click', async () => {
        const shareData = {
            title: 'Consultorio Conectar Meraki',
            text: 'Salud integral: Psicología y Fonoaudiología. ¡Contactanos!',
            url: window.location.href
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                console.log('Compartido con éxito');
            } catch (err) {
                console.log('Error al compartir:', err);
            }
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert("¡Link copiado al portapapeles!");
            }).catch(err => {
                console.error("Error al copiar: ", err);
            });
        }
    });
}
