document.addEventListener("DOMContentLoaded", function () {
    let comunidades = document.getElementById("ccaa");
    let provincias = document.getElementById("provincia");
    let poblaciones = document.getElementById("poblacion");
    let form = document.forms[0];
    let imageContainer = document.getElementById("image-container");

    // 1. Referencia al loader
    let loader = document.getElementById("loader");
    // 2. Definimos la animación, pero de momento no la reproducimos
    let rotateAnimation = loader.animate(
        [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ],
        {
            duration: 1000, // 1 segundo
            iterations: Infinity
        }
    );
    // La dejamos pausada hasta que la necesitemos
    rotateAnimation.pause();

    fetch('https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/ccaa.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(ccaa => {
                let option = document.createElement('option');
                option.value = ccaa.code;
                option.innerHTML = ccaa.label;
                comunidades.appendChild(option);
            });
        })
        .catch(error => { console.log("No se cargo la api correctamente => " + error) });

    comunidades.addEventListener('change', function () {
        provincias.innerHTML = '<option value=""></option>';
        poblaciones.innerHTML = '<option value=""></option>';

        fetch('https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/provincias.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(provincia => {
                    if (provincia.parent_code == comunidades.value) {
                        let option = document.createElement('option');
                        option.value = provincia.code;
                        option.innerHTML = provincia.label;
                        provincias.appendChild(option);
                    }

                });
            })
            .catch(error => { console.log("No se cargo la api correctamente => " + error) });
    });

    provincias.addEventListener('change', function () {
        poblaciones.innerHTML = '<option value=""></option>';

        fetch('https://raw.githubusercontent.com/frontid/ComunidadesProvinciasPoblaciones/refs/heads/master/poblaciones.json')
            .then(response => response.json())
            .then(data => {
                data.forEach(poblacion => {
                    if (poblacion.parent_code == provincias.value) {
                        let option = document.createElement('option');
                        option.value = poblacion.code;
                        option.innerHTML = poblacion.label;
                        poblaciones.appendChild(option);
                    }
                })
            })
    });



    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let poblacionNombre = poblaciones.options[poblaciones.selectedIndex].text;
        let url_imagen = `https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=images&titles=${encodeURIComponent(poblacionNombre)}`;

        // 1. Mostrar loader (quitamos "display:none") y reproducir animación
        loader.style.display = "block";
        rotateAnimation.play();

        // 2. Ocultamos contenedor de imágenes mientras se cargan (opcional)
        imageContainer.style.display = "none";

        fetch(url_imagen)
            .then(response => response.json())
            .then(data => {
                imageContainer.innerHTML = "";

                let pages = data.query.pages;
                if (!pages) {
                    imageContainer.innerHTML = "<p>No images found</p>";
                    return;
                }

                Object.values(pages).forEach(page => {
                    if (page.images) {
                        page.images.forEach(image => {
                            let imgURL = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(image.title)}`;

                            // Crear contenedor de imagen
                            let imageBox = document.createElement("div");
                            imageBox.classList.add("image-box");

                            // Crear imagen
                            let imgElement = document.createElement("img");
                            imgElement.src = imgURL;
                            imgElement.alt = poblacionNombre;

                            // Crear pie de foto
                            let caption = document.createElement("div");
                            caption.classList.add("image-caption");
                            caption.textContent = image.title.replace(/File:/g, ""); // Limpiar el título de la imagen

                            // Agregar elementos al contenedor
                            imageBox.appendChild(imgElement);
                            imageBox.appendChild(caption);
                            imageContainer.appendChild(imageBox);
                        });
                    }
                });
            })
            .catch(
                error => {
                    console.log("Error fetching images:", error)

                })
            .finally(() => {
                setTimeout(() => {
                    // 3. Ocultar loader y detener animación
                    loader.style.display = "none";
                    rotateAnimation.pause();

                    // 4. Mostrar contenedor de imágenes
                    imageContainer.style.display = "flex";
                }, 3000); // 3 segundos
            });
    });
});  