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
function registrarConductor(){
    var nombre=document.getElementById("ftnombre").value;
    var apaterno=document.getElementById("ftapellidop").value;
    var amaterno=document.getElementById("ftapellidom").value;
    var email=document.getElementById("ftcorreo").value;
    var request=new XMLHttpRequest();
    request.open("POST", "REGISTRARCONDUCTOR", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
           alert(request.responseText);
        }
        actualizarConductores();
    }
    request.send(JSON.stringify({nombre,apaterno,amaterno,email,contrasena:null}));
}
actualizarConductores();