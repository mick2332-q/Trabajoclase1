/*
Consumir el endPoint de la API del clima Open-Meteo: 
- https://open-meteo.com/
- https://open-meteo.com/en/docs
- Ejemplo de petición
https://api.open-meteo.com/v1/forecast?latitude=7.1254&longitude=-73.1198&current=temperature_2m&hourly=temperature_2m&timezone=auto&past_days=3&forecast_days=3


Características para desarrollar: 
 - Cuando el sitio cargue se debe mostrar un gráfico con datos de prueba y la tabla sin datos
 - Cuando el usuario de click al botón buscar se debe hacer la solicitud de los datos a la API
 - Al recibir la respuesta del servidor se deben mapear los datos en la tabla y en el gráfico.
 - En caso de no encontrar datos o presentar un error se debe reportar por consola"
*/

function mapeardatos(datos) {
    document.getElementById("v_lat").innerText = datos.latitude;
    document.getElementById("v_long").innerText = datos.longitude;
    document.getElementById("v_alt").innerText = datos.elevation;
    document.getElementById("v_zone").innerText = datos.timezone;
    document.getElementById("v_temp").innerText = datos.current.temperature_2m; 
    document.getElementById("v_hour").innerText = datos.current.time;
}
let chart; 
function actualizarGrafico(datos) {
    const horas = datos.hourly.time;
    const temperaturas = datos.hourly.temperature_2m; 

    if (chart) {
        chart.destroy();
    }
    const ctx = document.getElementById('grafico');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: horas,
            datasets: [{
                label: 'Temperatura (°C)',
                data: temperaturas,
                borderColor: 'rgb(75, 192, 95)',
                borderWidth: 1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Tiempo' } },
                y: { title: { display: true, text: 'Temperatura (°C)' }, beginAtZero: false}
            }
        }
    });
}


let url_base = "https://api.open-meteo.com/v1/forecast?";
let end_url = "&current=temperature_2m&hourly=temperature_2m&timezone=auto&past_days=3&forecast_days=3";

function cargarDatos() {
    let latitude = document.getElementById("latitud").value; 
    let longitude = document.getElementById("longitud").value; 
    let url = url_base + "latitude=" + latitude + "&longitude=" + longitude + end_url;

    console.log("URL generada:", url); 
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error en la solicitud");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Datos recibidos:", data); 
            mapeardatos(data);
            actualizarGrafico(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

//Ejemplo de creación de Gráfico
document.addEventListener("DOMContentLoaded", function() {
    const ctx = document.getElementById('grafico');

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2025-03-02T00:00', '2025-03-02T01:00', '2025-03-02T02:00', '2025-03-02T03:00', '2025-03-02T04:00'],
            datasets: [{
                label: 'Temperatura',
                data: [20.3, 20.5, 20.3, 20.1, 19.9, 19.7],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
document.getElementById("buscar_datos").addEventListener("click", cargarDatos);