(function name(params) {
    let DB;
    const nombreInput = document.querySelector('#nombre')
    const emailInput = document.querySelector('#email')
    const telefonoInput = document.querySelector('#telefono')
    const empresaInput = document.querySelector('#empresa')

    

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        //!actualiza el registro
        const formulario = document.querySelector('#formulario');
        formulario.addEventListener('submit', actualizarCliente);


        //! verificar el ID de la url
        const parametrosURL = new URLSearchParams(window.location.search);

        const idCliente = parametrosURL.get('id');

        if (idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 300);
        }
    });

    function actualizarCliente(e) {
        e.preventDefault();

        if ( nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value === '') {
            console.log('hubo un error');
            return;
        }
        
    }

    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function (e) {
            const cursor = e.target.result;

            if (cursor) {
                if (cursor.value.id === Number(id)) {
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        };

        console.log(objectStore);
    }

    function conectarDB() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function () {
            console.log('Hubo un un error');
        };

        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;
        };
    }

   function llenarFormulario(datosCliente) {
            const {nombre, email, telefono, empresa} = datosCliente;


            nombreInput.value = nombre;
            emailInput.value = email;
            telefonoInput.value = telefono;
            empresaInput.value = empresa;

    }
})();
