function actualizarviajescurso() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "VIAJESCURSO", false);
    datos.send(null);
    var res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].Numeroautobus + "</td>";
        tabla += "<td>" + res[i].nombre +' '+ res[i].apellidoP +' '+ res[i].apellidoM + "</td>";
        tabla += "<td>" + res[i].fechaHora + "</td>";
        tabla += "<td>" + res[i].origen + '-' + res[i].destino + "</td>";
        tabla += "<td>";
        tabla += '<button type="button" class="btn btn-success"';
        tabla += 'data-toggle="modal" data-target="#terminarviajeModal" onclick="setidbusconductor()">';
        
        tabla += '<i class="fa fa-fw fa-sign-out"></i>';
        tabla += '</button>';
        tabla += "</td>";
        tabla += "</tr>";
    }
    document.getElementById("tablaviajescurso").innerHTML = tabla;
}
var idConductor;
function setidbusconductor(){

}

actualizarviajescurso();