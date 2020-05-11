/**
 * Yargs config
 */

const descripcion = {
  demand: true,
  alias: 'd',
  desc: 'Descripcion de la tarea por hacer'
};

const completado = {
  demand: true,
  alias: 'c',
  default: true,
  desc: 'Marca como completado o pendiente la tarea'
}

const argv = require('yargs')
  .command(
    'crear',
    'Crea una tarea en la lista de tareas',
    { descripcion }
  )
  .command(
    'actualizar',
    'Actualiza el estado completado de una tarea',
    { descripcion, completado }
  )
  .command(
    'eliminar',
    'Eliminar una tarea de la lista de tareas',
    { descripcion }
  ).help().argv;

module.exports = { argv };