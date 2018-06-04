function actualizarAdministradores() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "ADMINISTRADORES", false);
    datos.send(null);
    var res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].nombre + "</td>";
        tabla += "<td>" + res[i].apPaterno + "</td>";
        tabla += "<td>" + res[i].apMaterno + "</td>";
        tabla += "<td>" + res[i].correo + "</td>";
        tabla += "</tr>";
    }
    document.getElementById("tabla").innerHTML = tabla;
}
actualizarAdministradores();