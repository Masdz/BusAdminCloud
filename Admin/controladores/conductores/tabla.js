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
        tabla += '<button class="btn btn-danger" data-toggle="modal" data-target="#confirmationModal" onclick="setid('+res[i].idconductor+')">'
        tabla += '<i class="fa fa-trash"></i>'
        tabla += '</button>';
        tabla += '   <button class="btn btn-primary" data-toggle="modal" data-target="#mmodificar" onclick="inimod('+i+')">'
        tabla += '<i class="fa fa-edit"></i>'
        tabla += '</button>';
        tabla += '</td>';
        tabla += "</tr>";
    }
    document.getElementById("tabla").innerHTML = tabla;
}

function registrarConductor() {
    var nombre = document.getElementById("ftnombre").value;
    var apaterno = document.getElementById("ftapellidop").value;
    var amaterno = document.getElementById("ftapellidom").value;
    var email = document.getElementById("ftcorreo").value;
    var request = new XMLHttpRequest();
    request.open("POST", "REGISTRARCONDUCTOR", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            alerta("Registrando...", request.responseText);
        }
        actualizarConductores();
    }
    request.send(JSON.stringify({ nombre, apaterno, amaterno, email, contrasena: null }));
}

function setid(val){
    console.log("id:"+val);
    document.getElementById("idItem").innerHTML=val;
}
function getid(){
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
function inimod(id){
    console.log(res[id]);
    document.getElementById("modnombre").value=res[id].nombre;
    document.getElementById("modapellidop").value=res[id].apellidoP;
    document.getElementById("modapellidom").value=res[id].apellidoM;
    document.getElementById("modcorreo").value=res[id].email;
    setid(id);
}
function modificar(){
    var id=getid();
    var idconductor=res[id].idconductor;
    var nombre=document.getElementById("modnombre").value;
    var apellidoP=document.getElementById("modapellidop").value;
    var apellidoM=document.getElementById("modapellidom").value;
    var email=document.getElementById("modcorreo").value;
    var request=new XMLHttpRequest();
    request.open("POST", "MODIFICARCONDUCTOR", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
           alert(request.responseText);
        }
        actualizarConductores();
    }
    request.send(JSON.stringify({
        idconductor,
        nombre,
        apellidoP,
        apellidoM,
        email,
    }));
}
actualizarConductores();