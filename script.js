// Obtenemos contenedores y botones
const contenedores = document.querySelectorAll('.cards');
const botonesAdd = document.querySelectorAll('.add-btn');

// boton "+ Añade una tarjeta"
botonesAdd.forEach(function (boton) {
    boton.addEventListener('click', function () {
        const contenedorTarjetas = boton.previousElementSibling;

        if (contenedorTarjetas.querySelector('.card-form')) {
            return;
        }
        //clonamos el formulario del template
        const template = document.getElementById('card-form');
        const formulario = template.contentEditable.cloneNode(true).firstElementChild;

        contenedorTarjetas.appendChild('card-form');

        // funcionalidad boton de cancelar (X)
        const btnCancelar = formulario.querySelector('.cancel-btn');
        btnCancelar.addEventListener('click', function () {
            formulario.remove();
        });

        //funcionalidad  +añadir tarjeta
        const btnConfirmar = formulario.querySelector('button[type="sumbit"]');
        const input = formulario.querySelector('input');

        btnConfirmar.addEventListener('click', function (e) {
            e.preventDefault();

            const texto = input.value.trim();
            if (texto === '') return;

            //creamos la tarjeta
            const tarjeta = document.createElement('article');
            tarjeta.className = 'card';
            tarjeta.draggable = true;

            tarjeta.innerHTML = `
        <p>${texto}</p>
        <button class="delete-btn">X</button>
        `;


        //funcionalidad boton eliminar(X)
        const btnEliminar = tarjeta.querySelector('.delete-btn');
        btnEliminar.addEventListener('click', function(){
            tarjeta.remove;
        });


        //drag and drop
        tarjeta.addEventListener('dragstart', function(event){
            tarjeta.dataset.id = Date.now();
            event.dataTransfer,setData('text/plain', tarjeta.dataset.id);
        });

        contenedorTarjetas.insertBefore(tarjeta, formulario);
        formulario.remove();

        });
    })
}
)

