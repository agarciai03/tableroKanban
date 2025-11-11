//obtenemos contenedores y botones
const contenedores = document.querySelectorAll('.cards');
const botonesAdd = document.querySelectorAll('.add-btn');

//boton +añade una tarjeta
botonesAdd.forEach(function (boton) {
    boton.addEventListener('click', function () {
        const contenedorTarjetas = boton.previousElementSibling;

        if (contenedorTarjetas.querySelector('.card-form')) {
            return;
        }

        //clonamos el form del template
        const template = document.getElementById('card-form');
        const formulario = template.content.cloneNode(true).firstElementChild;
        contenedorTarjetas.appendChild(formulario);

        //funcionalidad boton cancelar (X)
        const btnCancelar = formulario.querySelector('.cancel-btn');
        btnCancelar.addEventListener('click', function () {
            formulario.remove();
        });

        //funcionalidad +añadir tarjeta
        const btnConfirmar = formulario.querySelector('button[type="submit"]');
        const input = formulario.querySelector('input');

        btnConfirmar.addEventListener('click', function (event) {
            event.preventDefault();
            const texto = input.value.trim();
            if (texto === '') return;

            //creamos card
            const tarjeta = document.createElement('article');
            tarjeta.className = 'card';
            tarjeta.draggable = true;
            tarjeta.innerHTML = `
            <p class="box">${texto}</p>
            <button class="delete-btn">X</button>
        `;


            //funcionalidad boton eliminar(X)
            const btnEliminar = tarjeta.querySelector('.delete-btn');
            btnEliminar.addEventListener('click', function () {
                tarjeta.remove();
            });

            //drag and drop
            tarjeta.addEventListener('dragstart', function (event) {
                tarjeta.dataset.id = Date.now();
                event.dataTransfer.setData('text/plain', tarjeta.dataset.id);
            });

            contenedorTarjetas.insertBefore(tarjeta, formulario);
            formulario.remove();
        });
    });
});

contenedores.forEach(function (columna) {
    columna.addEventListener('dragover', function (event) {
        event.preventDefault();
    });

    columna.addEventListener('drop', function (event) {
        event.preventDefault();
        const id = event.dataTransfer.getData('text/plain');
        const tarjeta = document.querySelector(`[data-id="${id}"]`);
        if (tarjeta && tarjeta.parentElement != columna) {
            columna.appendChild(tarjeta);
        }
    });
});

document.querySelectorAll('.card').forEach(function (tarjeta) {
    if (!tarjeta.dataset.id) {
        tarjeta.addEventListener('dragstart', function (event) {
            tarjeta.dataset.id = Date.now();
            event.dataTransfer.setData('text/plain', tarjeta.dataset.id);
        });
    }
});