document.addEventListener("DOMContentLoaded", () => {
    // Detectamos el idioma del HTML
    const isEnglish = document.documentElement.lang === 'en';
    
    // Definimos los textos dependiendo del idioma
    const texts = isEnglish 
        ? ["Game Designer", "Gameplay Programmer", "Engine / C++ Developer"]
        : ["Diseñador de Videojuegos", "Programador de Gameplay", "Desarrollador Engine / C++"];

    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    const typeWriterElement = document.getElementById("typewriter");

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        typeWriterElement.textContent = `> ${letter}_`;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000); 
        } else {
            setTimeout(type, 80); 
        }
    }
    
    type();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});

var form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("status");
  var data = new FormData(event.target);

  // 1. Detectamos si la página está en inglés
  const isEnglish = document.documentElement.lang === 'en';

  // 2. Preparamos los textos en función del idioma
  const msgSuccess = isEnglish 
      ? "Mission accomplished! Message sent successfully." 
      : "¡Misión cumplida! Mensaje enviado correctamente.";
      
  const msgError = isEnglish 
      ? "Oops! There was a problem sending your message." 
      : "Ups! Hubo un problema al enviar tu mensaje.";
      
  const msgConnection = isEnglish 
      ? "Connection error. Please try again." 
      : "Error de conexión. Inténtalo de nuevo.";

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = msgSuccess;
      status.classList.remove("error"); // Limpiamos por si había un error previo
      status.classList.add("success");
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          // Formspree devuelve los errores en inglés por defecto, los mostramos
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        } else {
          status.innerHTML = msgError;
        }
        status.classList.remove("success");
        status.classList.add("error");
      })
    }
  }).catch(error => {
    status.innerHTML = msgConnection;
    status.classList.remove("success");
    status.classList.add("error");
  });
}

// Comprobamos que el formulario exista antes de añadir el evento
if (form) {
    form.addEventListener("submit", handleSubmit);
}