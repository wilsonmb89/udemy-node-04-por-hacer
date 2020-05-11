const { argv } = require('./config/yargs');

const operacion = argv._[0];
const porHacer = require('./por-hacer/por-hacer');

switch (operacion) {
  case 'crear':
    console.log('tarea', porHacer.crearTarea(argv.descripcion));
    break;
  case 'listar':
    porHacer.obtenerTareas();
    break;
  case 'actualizar':
    porHacer.actualizarTarea(argv.descripcion, argv.completado);
    break;
  case 'eliminar':
    const result = porHacer.eliminarTarea(argv.descripcion);
    console.log(result ? 'Operación exitosa' : 'Hubo un error en la operación');
    break;
  default:
    console.log('La operación no está soportada aún');
    break;
}