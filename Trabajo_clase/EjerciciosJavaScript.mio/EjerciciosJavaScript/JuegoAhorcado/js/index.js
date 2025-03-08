/* Desarrollar un código en javascript que permita jugar al ahorcado. 
El usuario debe adivinar una palabra de 5 letras.
El usuario tiene 6 oportunidades para adivinar la palabra.
Si el usuario adivina la palabra, se muestra un mensaje de felicitaciones.
Si el usuario se queda sin oportunidades, se muestra un mensaje de derrota.
El usuario puede jugar de nuevo.
*/

let listaPalabras = ["perro", "gato", "elefante", "jirafa", "mono","gallina","tigre","oso","leon","serpiente"];
let palabraSecreta;
let intentosRestantes = 6;
let letrasUsadas = [];
document.getElementById("jugar").disabled = false;
document.getElementById("validar").disabled = true;
document.getElementById("reiniciar").disabled = true;

//Función para obtener la palabra segun los aciertos del usuario
function obtenerPalabra() {
    let palabra = "";
    for(let letra of palabraSecreta){
        if (letrasUsadas.includes (letra)){
            palabra+=letra+"";
        }
        else{
            palabra += "_ ";
        }
    }
    return palabra;
}

//Función para iniciar el juego
function jugar() {
    intentosRestantes = 6;
    letrasUsadas = [];
    palabraSecreta = listaPalabras[Math.floor(Math.random() * listaPalabras.length)];
    document.getElementById("intentosRestantes").textContent = intentosRestantes;
    document.getElementById("letrasUsadas").textContent = letrasUsadas;
    document.getElementById("palabra").textContent = obtenerPalabra();
    document.getElementById("jugar").disabled = true;
    document.getElementById("validar").disabled = false;
    document.getElementById("reiniciar").disabled = false;
}   

//Función para reiniciar el juego
function reiniciar() {
    intentosRestantes = 6;  
    letrasUsadas = [];  
    palabraSecreta = "";
    document.getElementById("jugar").disabled = false;
    document.getElementById("reiniciar").disabled = true;
    document.getElementById("validar").disabled=true;
    document.getElementById("letra").value="";
}

//Función para validar la letra ingresada por el usuario
function validarLetra() {
    let letra = document.getElementById("letra").value;
    if (letrasUsadas.includes(letra)) {
        alert("La letra ya ha sido usada");
    } else {
    letrasUsadas.push(letra); // Agregar la letra a la lista de usadas
    document.getElementById("letrasUsadas").textContent = letrasUsadas.join(", ");
        if (palabraSecreta.includes(letra)) {
        document.getElementById("palabra").textContent = obtenerPalabra(); 
        }else {
        intentosRestantes--;
        document.getElementById("intentosRestantes").textContent = intentosRestantes;
        }
        if(intentosRestantes==0){
            alert("Usted ha perdido :(");
            document.getElementById("reiniciar").disabled = false;
            document.getElementById("validar").disabled=true
        }
        if(!document.getElementById("palabra").textContent.includes("_")){
            reiniciar()
            alert("Usted ganooo felicidades");
        }
    }

}



//Agregar el evento click al los botones
document.getElementById("jugar").addEventListener("click", jugar);
document.getElementById("validar").addEventListener("click", validarLetra);
document.getElementById("reiniciar").addEventListener("click", reiniciar);
