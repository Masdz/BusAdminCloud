function actualizarConductores() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "CONDUCTORES", false);
    datos.send(null);
    var res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].idconductor + "</td>";
        tabla += "<td>" + res[i].nombre + "</td>";
        tabla += "<td>" + res[i].apellidoP + "</td>";
        tabla += "<td>" + res[i].apellidoM + "</td>";
        tabla += "<td>" + res[i].email + "</td>";
        tabla += "</tr>";
    }
    document.getElementById("tabla").innerHTML = tabla;
}
actualizarConductores();