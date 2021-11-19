const Tarea = require('./tarea');

class Tareas {

  _listado = {};

  get listadoArr() {

    const listado = [];
    Object.keys(this._listado).forEach( key => {
      const tarea = this._listado[ key ];
      listado.push( tarea );
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea( id = '' ) {
    if ( this._listado[id] ) {
      delete this._listado[id];
    }
  };

  cargarTareasFromArray( tareas = [] ) {
    tareas.map(( tarea ) => {
      this._listado[ tarea.id ] = tarea;
    });
  };

  crearTarea( desc = '' ) {
    const tarea = new Tarea( desc );
    this._listado[ tarea.id ] = tarea;
  }

  listadoCompleto() {
    // Ejemplo utilizando un objeto
    let i = 1;
    for ( let tarea in this._listado ) {
      const index = `${i.toString().blue}`
      const { desc, completadoEn } = this._listado[tarea];
      const estado = ( completadoEn ) ? 'Completada'.green : 'Pendiente'.red;
      
      console.log( `${index}. ${desc.green} :: ${estado}`)
      
      i++;
    }

    // Ejemplo utilizando un arreglo

    /* console.log();
    this.listadoArr.forEach( (tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = ( completadoEn )
        ? 'Completada'.green
        : 'Pendiente'.red;
      
      console.log(`${ idx } ${ desc } :: ${ estado }`);
    }); */
  
  }

  listarPendientesCompletadas( completadas ) {

    // console.log( this.listadoArr[0].completadoEn )
    console.log();
    /* const listaCompletados = this.listadoArr.filter( (tarea, i) => tarea.completadoEn === completadas )
    
    listaCompletados.forEach( (tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = ( completadoEn )
        ? 'Completada'.green
        : null;
      
      console.log(`${ idx }. ${ desc } :: ${ estado }`);
    }); */

    // hacer otro filter que SÍ filtre el arreglo xD

    let arrfiltrado = [];
    if ( completadas ) {
      arrfiltrado = this.listadoArr.filter( (tarea) => (tarea.completadoEn) )
    } else {
      arrfiltrado = this.listadoArr.filter( (tarea) => (tarea.completadoEn === completadas ) )
    }

    arrfiltrado.forEach(( tarea, i ) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      const estado = ( completadoEn )
        ? 'Completada'.green
        : 'Pendiente'.red;

      console.log(`${ idx }. ${ desc } :: ${ estado }`);
    })
 
  }

  toggleCompletadas ( ids = [] ) {
    ids.forEach( id => {
      const tarea = this._listado[id];
      if ( !tarea.completadoEn ) {
        tarea.completadoEn = new Date().toISOString();
      }

    })

    this.listadoArr.forEach( tarea => {
      if( !ids.includes( tarea.id ) ) {
        this._listado[tarea.id].completadoEn = null;
      }
    })
  }
}

module.exports = Tareas;