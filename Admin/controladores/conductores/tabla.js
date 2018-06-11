var res;

function actualizarConductores() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "CONDUCTORES", false);
    datos.send(null);
    res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].idconductor + "</td>";
        tabla += "<td>" + res[i].nombre + "</td>";
        tabla += "<td>" + res[i].apellidoP + "</td>";
        tabla += "<td>" + res[i].apellidoM + "</td>";
        tabla += "<td>" + res[i].email + "</td>";
        tabla += '<td>';
        tabla += '<button class="btn btn-danger" data-toggle="modal" data-target="#confirmationModal" onclick="setid(' + res[i].idconductor + ')">'
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
    window.open("conductores.html", "_self");
}

function registrarConductor() {
    var nombre = document.getElementById("ftnombre").value;
    var apaterno = document.getElementById("ftapellidop").value;
    var amaterno = document.getElementById("ftapellidom").value;
    var email = document.getElementById("ftcorreo").value;
    var tabla = "conductores";
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (nombre == "" || nombre == null || apaterno == "" || apaterno == null || amaterno == "" || amaterno == null || email == "" || email == null) {
        document.getElementById("mensajeE").innerHTML = "Completa todos los campos.";
        $('#alertaError').show();
        $('#mmodificar').modal('show'); // abrir
        limpiar();
    } else if (!emailRegex.test(email)) {
        document.getElementById("mensajeE").innerHTML = "Ingresa una dirección de E-mail valida.";
        $('#alertaError').show();
        $('#mmodificar').modal('show'); // abrir
    } else {
        var request = new XMLHttpRequest();
        request.open("POST", "VERIFYEMAIL2", true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({ tabla, email }));
        request.onreadystatechange = function() {
            console.log("State paps");
            if (request.readyState == 4) {
                console.log("Primer if");
                if (request.status == 418) {
                    console.log("Segundo if");
                    document.getElementById("mensajeE").innerHTML = "El E-mail ya está registrado, intenta con otro.";
                    $('#alertaError').show();
                    $('#mmodificar').modal('show'); // abrir
                } else if (request.status == 200) {
                    guardarDatos();
                }
            }
        }
    }
}

function limpiar() {
    $('#alertaErrorMod').hide();
}

function guardarDatos() {
    var nombre = document.getElementById("ftnombre").value;
    var apaterno = document.getElementById("ftapellidop").value;
    var amaterno = document.getElementById("ftapellidom").value;
    var email = document.getElementById("ftcorreo").value;
    var request = new XMLHttpRequest();
    request.open("POST", "REGISTRARCONDUCTOR", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ nombre, apaterno, amaterno, email, contrasena: null }));
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alerta("Registrando...", request.responseText);
        }
        actualizarConductores();
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
    request.open("POST", "ELIMINARCONDUCTOR", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alerta("Eliminando...", request.responseText);
        }
        actualizarConductores();
    }
    request.send(JSON.stringify({ id }));
}

function inimod(id) {
    console.log(res[id]);
    document.getElementById("modnombre").value = res[id].nombre;
    document.getElementById("modapellidop").value = res[id].apellidoP;
    document.getElementById("modapellidom").value = res[id].apellidoM;
    document.getElementById("modcorreo").value = res[id].email;
    setid(id);
}

function validarDatos() {
    var id = getid();
    var idconductor = res[id].idconductor;
    var nombre = document.getElementById("modnombre").value;
    var apellidoP = document.getElementById("modapellidop").value;
    var apellidoM = document.getElementById("modapellidom").value;
    var email = document.getElementById("modcorreo").value;
    var email2 = email;
    var tabla = "conductores";
    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (nombre == "" || nombre == null || apellidoP == "" || apellidoP == null || apellidoM == "" || apellidoM == null || email == "" || email == null) {
        document.getElementById("mensajeEMod").innerHTML = "Completa todos los campos.";
        $('#alertaErrorMod').show();
    } else if (!emailRegex.test(email)) {
        document.getElementById("mensajeEMod").innerHTML = "Ingresa una dirección de E-mail valida.";
        $('#alertaErrorMod').show();
    } else {
        var id = getid();
        var idconductor = res[id].idconductor;
        var request = new XMLHttpRequest();
        request.open("POST", "VERIFYEMAIL3", true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({ tabla, email, idconductor }));
        request.onreadystatechange = function() {
            console.log("State paps");
            if (request.readyState == 4) {
                console.log("Primer if");
                if (request.status == 418) {
                    console.log("Segundo if");
                    document.getElementById("mensajeEMod").innerHTML = "El E-mail ya está registrado, intenta con otro.";
                    $('#alertaErrorMod').show();
                    //$('#mmodificar').modal('show'); // abrir
                } else if (request.status == 200) {
                    guardarModificacion();
                    console.log("Si entro");
                }
            }
        }
    }
}

function guardarModificacion() {
    var id = getid();
    var idconductor = res[id].idconductor;
    var nombre = document.getElementById("modnombre").value;
    var apellidoP = document.getElementById("modapellidop").value;
    var apellidoM = document.getElementById("modapellidom").value;
    var email = document.getElementById("modcorreo").value;
    var request = new XMLHttpRequest();
    request.open("POST", "MODIFICARCONDUCTOR", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alerta("Éxito", request.responseText);
        }
        limpiar();
        actualizarConductores();
        $('#mmodificar').modal('hide');
        $('#modal').hide();
    }
    request.send(JSON.stringify({
        idconductor,
        nombre,
        apellidoP,
        apellidoM,
        email,
    }));
}

function modificar() {

    /*   var nombre = document.getElementById("modnombre").value;
      var apellidoP = document.getElementById("modapellidop").value;
      var apellidoM = document.getElementById("modapellidom").value;
      var email = document.getElementById("modcorreo").value; */
    validarDatos();

}
actualizarConductores();