function actualizarRutas() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "RUTAS", false);
    datos.send(null);
    var res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].idruta + "</td>";
        tabla += "<td>" + res[i].origen + "</td>";
        tabla += "<td>" + res[i].destino + "</td>";
        tabla += "</tr>";
    }
    document.getElementById("tabla").innerHTML = tabla;
}
actualizarRutas();