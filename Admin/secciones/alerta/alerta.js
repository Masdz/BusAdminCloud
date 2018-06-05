var barra = new XMLHttpRequest();
barra.open("GET", "secciones/alerta/alerta.html", false);
barra.send(null);
var nav = barra.responseText;
document.getElementById("alertaDiv").innerHTML = nav;

function alerta(titulo, mensaje) {
    document.getElementById("alertaTitulo").innerHTML = titulo;
    document.getElementById("alertaMensaje").innerHTML = mensaje;
    $('#alerta').modal('show'); // abrir
}