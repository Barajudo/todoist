require("colors");

const Tareas = require("./Models/Tareas.js");

const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  validador,
  mostrarListadoChecklist,
} = require("./helpers/inquirer.js");

const { guardarDB, leerDB } = require("./helpers/manejarDB.js");

const main = async () => {
  let opt = "";

  const tareas = new Tareas();
  const tareasDB = leerDB();

  // Probablemente esto este demas, solo hace falta pasar tareasDB
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    // AWAIT: Esperate a que tengamos una respuesta de la funcion inquirerMenu() he imprime el menu
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción de la nueva tarea: ");
        tareas.crearTarea(desc);
        break;

      case "2":
        tareas.listadoCompleto();
        break;

      case "3":
        tareas.listarTareasByStatus();
        break;

      case "4":
        tareas.listarTareasByStatus(false);
        break;

      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);

        console.log({ ids });

        tareas.toggleCompletadas(ids);

        break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);

        if (id !== "0") {
          const ok = await validador("¿Estás seguro que deseas eliminarlo?");

          if (ok) {
            tareas.borrarTarea(id);
          } else {
            console.log("No se eliminó ninguna tarea".yellow);
          }
        }

        break;

      default:
        break;
    }

    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
};

main();
