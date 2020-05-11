const fs = require('fs');
const colors = require('colors');

let tareasPorHacer = [];

const guardarDB = () => {
  const textData = JSON.stringify(tareasPorHacer);
  fs.writeFile('./db/data.json', textData, (err) => {
    if (err) throw err;
    console.log('Save ok');
  });
}


const cargarTareas = () => {
  try {
    tareasPorHacer = require('../db/data.json');
  } catch (err) {
    tareasPorHacer = [];
  }
}

const crearTarea = (descripcion) => {
  cargarTareas();
  const tarea = {
    descripcion,
    completado: false
  }
  tareasPorHacer.push(tarea);
  guardarDB();
  return tarea;
};

const obtenerTareas = () => {
  try {
    cargarTareas();
    if (tareasPorHacer.length > 0) {
      tareasPorHacer.forEach(
        tarea => {
          console.log('=========Por Hacer==========='.blue);
          console.log(tarea.descripcion);
          console.log('Estado:', tarea.completado ? 'Finalizada'.green : 'No Finalizada'.yellow);
          console.log('=============================');
        }
      );
    } else {
      console.log('==========No hay tareas aún==========='.yellow);
    }
    return true;
  } catch (err) {
    return false;
  }
};

const actualizarTarea = (descripcion, completado) => {
  try {
    cargarTareas();
    const idxUpdate = tareasPorHacer.findIndex(tarea => tarea.descripcion.toLowerCase() === descripcion.toLowerCase());
    if (idxUpdate !== -1) {
      tareasPorHacer[idxUpdate].completado = completado;
    }
    guardarDB();
  } catch (err) {
    return false;
  }
};

const eliminarTarea = (descripcion) => {
  try {
    cargarTareas();
    const tempTareasPorHacer = tareasPorHacer.filter(tarea => tarea.descripcion.toLowerCase() !== descripcion.toLowerCase());
    if (tempTareasPorHacer.length === tareasPorHacer.length) {
      console.log(`No se encontró la tarea ${descripcion}`);
      return false;
    }
    tareasPorHacer = tempTareasPorHacer;
    guardarDB();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { 
  crearTarea,
  obtenerTareas,
  actualizarTarea,
  eliminarTarea
};