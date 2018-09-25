function actualizarviajescurso() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "VIAJESCURSO", false);
    datos.send(null);
    var res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].Numeroautobus + "</td>";
        tabla += "<td>" + res[i].nombre + ' ' + res[i].apellidoP + ' ' + res[i].apellidoM + "</td>";
        tabla += "<td>" + res[i].fechaHora + "</td>";
        tabla += "<td>" + res[i].origen + '-' + res[i].destino + "</td>";
        tabla += '<td><button class="btn btn-danger" data-toggle="modal" data-target="#confirmationModal" onclick="setidbusconductor(' + res[i].idbusconductor + ')">'
        tabla += '<i class="fa fa-trash"></i>'
        tabla += '</button></td>';
        tabla += '<td><button class="btn btn-primary" data-toggle="modal" data-target="#terminarviajeModal" onclick="setidbusconductor(' + res[i].idbusconductor + ')">'
        tabla += '<i class="fa fa-check"></i>'
        tabla += '</button></td>';
        tabla += '</tr>';
    }
    document.getElementById("tablaviajescurso").innerHTML = tabla;
}

function setidbusconductor(val) {
    console.log("id:" + val);
    document.getElementById("idbusconductoresmod").innerHTML = val;
}

function refresh() {
    window.open("viajes.html", "_self");
}

function terminarViaje(recolectado) {
    //var recolectado=document.getElementById("recolectado");
    var id = document.getElementById("idbusconductoresmod").innerHTML;
    var request = new XMLHttpRequest();
    var param = '{"idbusconductor":1,"recolectado":"250"}';
    request.open("POST", "TERMINARVIAJE", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alerta("Viaje terminado exitosamente",request.responseText);
        }
        actualizarviajescurso();
        actualizarviajeshistorial();
    }
    request.send(JSON.stringify({ "idbusconductor": id, "recolectado": recolectado }));
}

function eliminar() {
    var id = document.getElementById("idbusconductoresmod").innerHTML;
    var request = new XMLHttpRequest();
    request.open("POST", "ELIMINARVIAJE", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alerta("Eliminado correctamente",request.responseText);
        }
        actualizarviajescurso();
        actualizarviajeshistorial();
    }
    request.send(JSON.stringify({ id }));
}

//Validar datos del modal

function validarDatos(recolectado){
    //Validar numero decimal con dos digitos decimales de precision
    var dineroRegex=/^\d*(\.\d{1})?\d{0,1}$/;
    var dineroRecolectado = recolectado;
    if(dineroRecolectado == "" || dineroRecolectado== null){
        document.getElementById("mensajeEMod1").innerHTML = "Completa todos los campos.";
        $('#alertaErrorMod1').show();
        console.log("Hola");
    }else if(!dineroRegex.test(dineroRecolectado)){
        document.getElementById("mensajeEMod1").innerHTML = "Ingresa un número valido con maximo dos decimales";
        $('#alertaErrorMod1').show();
        console.log("Hola2");
    }else{
        terminarViaje(dineroRecolectado);
        $('#terminarviajeModal').modal('hide');
        limpiar();
        console.log("Hola3");
    }
}

function limpiar() {
    $('#alertaErrorMod1').hide();
    document.getElementById("recolectado").value="";
}

actualizarviajescurso();