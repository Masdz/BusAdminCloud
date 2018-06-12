function actualizarReportes() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "REPORTES", false);
    datos.send(null);
    var res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].nombre + "</td>";
        tabla += "<td>" + res[i].apellidoP + "</td>";
        tabla += "<td>" + res[i].apellidoM + "-" + res[i].destino + "</td>";
        tabla += "<td>" + res[i].motivo + "</td>";
        tabla += "<td>" + res[i].fecha + "</td>";
        tabla += "</tr>";
    }
    document.getElementById("tabla").innerHTML = tabla;
}

function refresh() {
    window.open("reportes.html", "_self");
}

actualizarReportes();