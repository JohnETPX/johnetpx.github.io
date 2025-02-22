const questions = [
    {
        question: "1. ¿Qué es la Web Animations API?",
        answer: "Proporciona una interfaz para crear efectos de movimiento, transiciones, interpolaciones y otros comportamientos animados sin depender de librerías externas o de hacks con CSS."
    },
    {
        question: "2.Primero, obtenemos la referencia del elemento del DOM que queremos animar:",
        answer: "<code>let loader = document.getElementById('loader');</code> <br><br> Este elemento loader es el que mostraremos al usuario mientras esperamos la respuesta de la red (fetch) o mientras se ejecutan operaciones más lentas. En mi caso tengo este estilo aplicado: <br><br><code>#loader { width: 50px;  height: 50px; border: 6px solid #eee; border-top: 6px solid #e74c3c; border-radius: 50%;  margin: 20px auto;}</code>"
    },
    {
        question: "3.Definición de la secuencia de animación",
        answer: "Utilizamos el método animate() de la Web Animations API para indicar cómo queremos que se transforme el elemento en el tiempo. En nuestro caso, hacemos una rotación de 0 a 360 grados de forma continua: <br><br> <code>let rotateAnimation = loader.animate([{ transform: 'rotate(0deg)' },{ transform: 'rotate(360deg)' }],{duration: 1000,iterations: Infinity});</code><ul><li>Keyframes: En el primer keyframe ({ transform: 'rotate(0deg)' }) comenzamos sin rotación, y en el segundo ({ transform: 'rotate(360deg)' }) especificamos la rotación completa de 360 grados.</li><li>duration define la duración de una iteración de la animación (en milisegundos).</li><li>iterations controla cuántas veces se repite la secuencia; en este caso, de forma infinita.</li></ul>"
    },
    {
        question: "4.Control del estado de la animación",
        answer: "<code>rotateAnimation.pause();</code> <br><br> De esta manera, la animación está definida pero no se está reproduciendo. La usaremos únicamente cuando sea necesario indicar al usuario que estamos cargando datos."
    },
    {
        question: "5.Reproducción de la animación en el momento necesario",
        answer: "Cuando el usuario hace clic en el botón de envío o cuando iniciamos un proceso que puede tardar unos segundos, mostramos el loader y reactivamos la animación: <br><br><code>loader.style.display = 'block';</code> <br><code>rotateAnimation.play();</code>"
    },
    {
        question: "6.Detener la animación y ocultar el loader",
        answer: "Una vez que recibimos la respuesta (o transcurren algunos segundos programados), detenemos la animación y ocultamos el loader: <br><br><code>loader.style.display = 'none';</code> <br><code>rotateAnimation.pause();</code> <br><br> De este modo, el usuario deja de ver el elemento de carga y puede centrarse en el contenido ya disponible en la página."
    },
    {
        question: "Beneficios de utilizar la Web Animations API",
        answer: "<ul><li>Nativa en JavaScript: No es necesaria ninguna biblioteca adicional.</li><li>Rendimiento mejorado: La Web Animations API está optimizada para funcionar directamente sobre el compositor del navegador.</li><li>Control granular: Podemos pausar, reiniciar, cambiar la velocidad, invertir la animación, etc.</li></ul>"
    }
];

const questionsContainer = document.getElementById("questions");

questions.forEach(item => {
    const questionElement = document.createElement("div");
    questionElement.classList.add("question");
    questionElement.innerHTML = item.question;

    const answerElement = document.createElement("div");
    answerElement.classList.add("answer");
    answerElement.innerHTML = item.answer;

    questionsContainer.appendChild(questionElement);
    questionsContainer.appendChild(answerElement);
});
