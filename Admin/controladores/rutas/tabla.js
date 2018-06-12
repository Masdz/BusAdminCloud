var res;

function actualizarRutas() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "RUTAS", false);
    datos.send(null);
    res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].idruta + "</td>";
        tabla += "<td>" + res[i].origen + "</td>";
        tabla += "<td>" + res[i].destino + "</td>";
        tabla += '<td>';
        tabla += '<button class="btn btn-danger" data-toggle="modal" data-target="#confirmationModal" onclick="setid(' + res[i].idruta + ')">'
        tabla += '<i class="fa fa-trash"></i>'
        tabla += '</button>';
        tabla += '   <button class="btn btn-primary" data-toggle="modal" data-target="#mmodificar" onclick="inimod(' + i + ')">'
        tabla += '<i class="fa fa-edit"></i>'
        tabla += '</button>';
        tabla += '</td>';
        tabla += "</tr>";
    }
    document.getElementById("tabla").innerHTML = tabla;
}

function registrarRuta() {

    validarDatos();
}

function validarDatos() {
    var origen = document.getElementById("ftorigen").value;
    var destino = document.getElementById("ftdestino").value;
    if (origen == "" || origen == null || destino == "" || destino == null) {
        document.getElementById("mensajeE").innerHTML = "Completa todos los campos.";
        $('#alertaError').show();
    } else if (origen == destino) {
        document.getElementById("mensajeE").innerHTML = "El origen y el destino no pueden llamarse igual.";
        $('#alertaError').show();
    } else {
        var request = new XMLHttpRequest();
        request.open("POST", "REGISTRARRUTA", true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                alerta("Éxito", request.responseText);
            }
            $('#alertaError').hide();
            actualizarRutas();
        }
        request.send(JSON.stringify({ origen, destino }));
    }
}

function setid(val) {
    console.log("id:" + val);
    document.getElementById("idItem").innerHTML = val;
}

function getid() {
    return document.getElementById("idItem").innerHTML;
}

function eliminar() {
    var id = document.getElementById("idItem").innerHTML;
    var request = new XMLHttpRequest();
    request.open("POST", "ELIMINARUTA", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alert(request.responseText);
        }
        actualizarRutas();
    }
    request.send(JSON.stringify({ id }));
}

function inimod(id) {
    console.log(res[id]);
    document.getElementById("modorigen").value = res[id].origen;
    document.getElementById("moddestino").value = res[id].destino;
    setid(id);
}

function limpiar() {
    $('#alertaErrorMod').hide();
}

function modificar() {
    var id = getid();
    var idruta = res[id].idruta;
    var origen = document.getElementById("modorigen").value;
    var destino = document.getElementById("moddestino").value;
    if (origen == "" || origen == null || destino == "" || destino == null) {
        document.getElementById("mensajeEMod").innerHTML = "Completa todos los campos.";
        $('#alertaErrorMod').show();
    } else if (origen == destino) {
        document.getElementById("mensajeEMod").innerHTML = "El origen y el destino no pueden llamarse igual.";
        $('#alertaErrorMod').show();
    } else {
        var request = new XMLHttpRequest();
        request.open("POST", "MODIFICARRUTA", true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                alerta("Mensaje:", request.responseText);
            }
            actualizarRutas();
            limpiar();
            $('#mmodificar').modal('hide');
        }
        request.send(JSON.stringify({ idruta, origen, destino }));
    }

}
actualizarRutas();