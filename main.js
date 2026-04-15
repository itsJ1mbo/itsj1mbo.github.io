document.addEventListener("DOMContentLoaded", () => {
    
    // 1. EFECTO TYPEWRITER
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

    // 2. ANIMACIÓN DE SCROLL
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