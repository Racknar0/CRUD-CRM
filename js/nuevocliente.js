(function methodName(arguments) {
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {
        conectadDB();

        formulario.addEventListener('submit', validarCliente);
    });

    function conectadDB() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function () {
            console.log('Hubo un un error');
        };

        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;
        };
    }

    function validarCliente(e) {
        e.preventDefault();

        //!leer inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (
            nombre === '' ||
            email === '' ||
            telefono === '' ||
            empresa === ''
        ) {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
        }

        //! crear nuevo objeto con la info

        const cliente = {
            nombre: nombre,
            email: email,
            telefono: telefono,
            empresa: empresa,
            
        }
        cliente.id = Date.now();

        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function () {
            imprimirAlerta('Hubo un error', 'error');
        }

        transaction.oncomplete = function () {
            imprimirAlerta('Cliente agregado con exito');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }

    }

    function imprimirAlerta(mensaje, tipo) {
        const alerta = document.querySelector('.alerta');

        if (!alerta) {
            //Crear alerta
            const divMensaje = document.createElement('DIV');
            divMensaje.classList.add(
                'px-5',
                'py-3',
                'rounded',
                'max-w-lg',
                'mx-auto',
                'mt-6',
                'text-center',
                'alerta'
            );

            if (tipo === 'error') {
                divMensaje.classList.add(
                    'bg-red-100',
                    'border-red-400',
                    'text-red-700',
                    'border'
                );
            } else {
                divMensaje.classList.add(
                    'bg-green-100',
                    'border-green-400',
                    'text-green-700'
                ),
                    'border';
            }

            divMensaje.textContent = mensaje;
            formulario.appendChild(divMensaje);

            setTimeout(() => {
                divMensaje.remove();
            }, 3000);
        }
    }
})();
