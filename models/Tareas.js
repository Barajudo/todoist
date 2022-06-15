require("colors");
const Tarea = require("./Tarea");

class Tareas {
  _listado = {};

  //Convertimos los objetos en arreglos
  get listadoArr() {
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareasDB = []) {
    tareasDB.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(descripcion = "") {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    for (let index = 0; index < this.listadoArr.length; index++) {
      let idx = `${index + 1}`.green;

      let { descripcion, completadoEn } = this.listadoArr[index];

      let status_tarea = completadoEn ? "Completada".green : "Pendiente".red;

      console.log(`${idx}. ${descripcion} :: ${status_tarea}`);
    }
  }

  listarTareasByStatus(status = true) {
    let idx = 0;

    for (let index = 0; index < this.listadoArr.length; index++) {
      let status_tarea = "";

      let { descripcion, completadoEn } = this.listadoArr[index];

      if (status && completadoEn) {
        idx++;
        console.log(
          `${(idx + ".").green} ${descripcion} :: ${completadoEn.yellow}`
        );
      } else if (!status && !completadoEn) {
        idx++;
        status_tarea = "Pendiente".red;
        console.log(`${(idx + ".").green} ${descripcion} :: ${status_tarea}`);
      }
    }
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
