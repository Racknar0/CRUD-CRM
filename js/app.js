(function name(params) {
    
    let BD;

    document.addEventListener('DOMContentLoaded', () => {
        crearBD();
    })


    //! Crea la base de datos de IndexedDB
    function crearBD(){
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function() {
            console.log('Hubo un eror');
        }

        crearBD.onsuccess = function() {
            DB = crearDB.result;
        }

        crearDB.onupgradeneeded =  function(e){
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

            objectStore.createIndex('nombre', 'nombre', {unique: false});
            objectStore.createIndex('email', 'email', {unique: true});
            objectStore.createIndex('telefono', 'telefono', { unique: false});
            objectStore.createIndex('empresa', 'empresa', {unique: false});
            objectStore.createIndex('id', 'id', {unique:true})

            console.log('BD lista y creada');

        }
        

    }

})();