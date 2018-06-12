var res;

function actualizarAutobuses() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "AUTOBUSES", false);
    datos.send(null);
    res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].Numeroautobus + "</td>";
        tabla += "<td>" + res[i].placa + "</td>";
        tabla += "<td>" + res[i].origen + "-" + res[i].destino + "</td>";
        tabla += '<td>'
        tabla += '<button class="btn btn-danger" data-toggle="modal" data-target="#confirmationModal" onclick="setid(' + res[i].Numeroautobus + ')">'
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

function refresh() {
    window.open("autobuses.html", "_self");
}

function iniselect(select) {
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
    document.getElementById(select).innerHTML = selec;
}

function validarDatos() {
    var Numeroautobus = document.getElementById("ftnoautobus").value;
    var placa = document.getElementById("ftplaca").value;
    var idruta = document.getElementById("selectruta").value;
    var numeroRegex = /^([0-9])*$/;
    var placaRegex = /^([A-z0-9])*$/;
    if (Numeroautobus == "" || Numeroautobus == null || placa == "" || placa == null || idruta == "" || idruta == null) {
        document.getElementById("mensajeE").innerHTML = "Completa todos los campos.";
        $('#alertaError').show();
        console.log("Campos");
    } else if (!numeroRegex.test(Numeroautobus)) {
        document.getElementById("mensajeE").innerHTML = "El número del autobús solo debe tener digítos del 0 al 9.";
        $('#alertaError').show();
        console.log("NumeroBus");
    } else if (!placaRegex.test(placa)) {
        document.getElementById("mensajeE").innerHTML = "La placa solo debe tener letras y números.";
        $('#alertaError').show();
        console.log("Placa");
    } else {
        var request = new XMLHttpRequest();
        request.open("POST", "REGISTRARAUTOBUS", true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.onreadystatechange = function() {
            console.log("Exito");
            if (request.readyState == 4) {
                alerta("Mensaje:", request.responseText);
            }
            actualizarAutobuses();
            $('#alertaError').hide();
        }
        request.send(JSON.stringify({ Numeroautobus, placa, idruta, idlinea: 1 }));
    }
}

function registrarAutobus() {
    /*  var Numeroautobus = document.getElementById("ftnoautobus").value;
     var placa = document.getElementById("ftplaca").value;
     var idruta = document.getElementById("selectruta").value; */
    validarDatos();
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

function inimod(id) {
    console.log(res[id]);
    iniselect("modruta");
    document.getElementById("modplaca").value = res[id].placa;
    document.getElementById("modruta").value = res[id].idruta;
    setid(id);
}

function modificar() {
    var id = getid();
    var Numeroautobus = res[id].Numeroautobus;
    var placa = document.getElementById("modplaca").value;
    var idruta = document.getElementById("modruta").value;
    var request = new XMLHttpRequest();
    request.open("POST", "MODIFICARAUTOBUS", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alert(request.responseText);
        }
        actualizarAutobuses();
    }
    request.send(JSON.stringify({ Numeroautobus, placa, idruta }));
}
actualizarAutobuses();
iniselect('selectruta');