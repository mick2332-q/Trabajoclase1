/* Codigo javascript gestionar una lista de tareas 
1. El usuario debe poder ingresar tareas.
2. El usuario debe poder marcar tareas como completadas al hacer click en ellas.
3. El usuario debe poder marcar tareas como no completadas al hacer click en ellas cuando estan completadas 
(por defecto las tareas agregadas están no completadas).
4. El usuario debe poder ver la lista de tareas.
*/

let listaTareas = [];

//Función para agregar una tarea a la lista
function agregarTarea() {
    let NombreTarea = document.getElementById("inputTarea").value;
    let tarea = {
        nombre: NombreTarea,
        completada: false
    }
    listaTareas.push(tarea);
    document.getElementById("inputTarea").value = "";
    mostrarTareas();
}

//Función para mostrar la lista de tareas
function mostrarTareas() {
    let lista = document.getElementById("listaTareas");
    lista.innerHTML = "";
    for (let i = 0; i < listaTareas.length; i++) {
        let tarea = listaTareas[i];
        let item = document.createElement("li");
        item.textContent = tarea.nombre;
        if (tarea.completada) {
            item.classList.add("completada");
        }
        item.addEventListener("click", function () {
            if (tarea.completada) {
                item.classList.remove("completada");
                item.classList.add("noCompletada");
            } else {
                item.classList.add("completada");
                item.classList.remove("noCompletada");
            }
            tarea.completada = !tarea.completada;
            mostrarTareas();
        });
        lista.appendChild(item);
    }

}




//Agregar el evento click al botón
document.getElementById("btnAgregarTarea").addEventListener("click", agregarTarea);