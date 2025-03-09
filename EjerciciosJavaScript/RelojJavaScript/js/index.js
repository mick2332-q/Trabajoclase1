/* Ejercicio una función que permite mostrar el reloj
en el elemento HTML con id="reloj" al presionar el botón con id="mostrar" */
function reloj() {
    let fecha = new Date();
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();

    if (hora < 10) {
        hora = "0" + hora;
    }
    if (minutos < 10) {
        minutos = "0" + minutos;
    }
    if (segundos < 10) {
        segundos = "0" + segundos;
    }

    let reloj = hora + ":" + minutos + ":" + segundos;
    document.getElementById("reloj").innerHTML = reloj;
    setTimeout("reloj()", 1000);
    
}

// Agregar el evento click al botón
document.getElementById("mostrar").addEventListener("click", reloj);