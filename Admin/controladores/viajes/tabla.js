function actualizarviajes() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "VIAJES", false);
    datos.send(null);
    var res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].Numeroautobus + "</td>";
        tabla += "<td>" + res[i].nombre +' '+ res[i].apellidoP +' '+ res[i].apellidoM + "</td>";
        tabla += "<td>" + res[i].fechaHora + "</td>";
        tabla += "<td>" + res[i].origen + '-' + res[i].destino + "</td>";
        tabla += "</tr>";
    }
    document.getElementById("tabla").innerHTML = tabla;
}
actualizarviajes();