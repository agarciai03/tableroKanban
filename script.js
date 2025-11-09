// Obtenemos contenedores y botones
const contenedores = document.querySelectorAll('.cards');
const botones = document.querySelectorAll('.add-btn');

// boton "+ Añade una tarjeta"
botones.forEach(function (boton) {
    boton.addEventListener('click', function () {
        const contenedorTarjetas = boton.previousElementSibling;

        if (contenedorTarjetas.querySelector('.card-form')) {
            return;
        }
        //clonamos el formulario del template
        const template = document.getElementById('card-form');
        const formulario = template.contentEditable.cloneNode(true).firstElementChild;

        contenedorTarjetas.appendChild('card-form');
    })
}
)

