function actualizarAutobuses() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "AUTOBUSES", false);
    datos.send(null);
    var res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].Numeroautobus + "</td>";
        tabla += "<td>" + res[i].placa + "</td>";
        tabla += "<td>" + res[i].origen + "-" + res[i].destino + "</td>";
        tabla += "<td>" + res[i].total + "</td>";
        tabla += '<td><button class="btn btn-danger" data-toggle="modal" data-target="#confirmationModal" onclick="setidbusconductor(' + res[i].Numeroautobus + ')">'
        tabla += '<i class="fa fa-trash"></i>'
        tabla += '</button></td>';
        tabla += "</tr>";
    }
    document.getElementById("tabla").innerHTML = tabla;
}

function iniselect() {
    var request = new XMLHttpRequest();
    request.open("GET", "RUTAS", false);
    request.send(null);
    var res = JSON.parse(request.responseText);
    var selec = "";
    for (var i in res) {
        selec += "<option value='" + res[i].idruta + "'>";
        selec += res[i].origen + "-" + res[i].destino;
        selec += "</option>";
    }
    document.getElementById("selectruta").innerHTML = selec;
}

function registrarAutobus() {
    var Numeroautobus = document.getElementById("ftnoautobus").value;
    var placa = document.getElementById("ftplaca").value;
    var idruta = document.getElementById("selectruta").value;
    var request = new XMLHttpRequest();
    request.open("POST", "REGISTRARAUTOBUS", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alerta("Registrando...", request.responseText);
        }
        actualizarAutobuses();
    }
    request.send(JSON.stringify({ Numeroautobus, placa, idruta, idlinea: 1 }));
}

function setidbusconductor(val) {
    console.log("id:" + val);
    document.getElementById("idItem").innerHTML = val;
}

function eliminar() {
    var id = document.getElementById("idItem").innerHTML;
    var request = new XMLHttpRequest();
    request.open("POST", "ELIMINARAUTOBUS", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alerta("Eliminando...", request.responseText);
        }
        actualizarAutobuses();
    }
    request.send(JSON.stringify({ id }));
}
actualizarAutobuses();
iniselect();