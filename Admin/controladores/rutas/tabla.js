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
        tabla += '<button class="btn btn-danger" data-toggle="modal" data-target="#confirmationModal" onclick="setid('+res[i].idruta+')">'
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
function registrarRuta(){
    var origen=document.getElementById("ftorigen").value;
    var destino=document.getElementById("ftdestino").value;
    var request=new XMLHttpRequest();
    request.open("POST", "REGISTRARRUTA", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
           alert(request.responseText);
        }
        actualizarRutas();
    }
    request.send(JSON.stringify({origen,destino}));
}
function setid(val){
    console.log("id:"+val);
    document.getElementById("idItem").innerHTML=val;
}
function getid(){
    return document.getElementById("idItem").innerHTML;
}
function eliminar(){
    var id=document.getElementById("idItem").innerHTML;
    var request=new XMLHttpRequest();
    request.open("POST", "ELIMINARUTA", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
           alert(request.responseText);
        }
        actualizarRutas();
    }
    request.send(JSON.stringify({id}));
}
function inimod(id){
    console.log(res[id]);
    document.getElementById("modorigen").value=res[id].origen;
    document.getElementById("moddestino").value=res[id].destino;
    setid(id);
}
function modificar(){
    var id=getid();
    var idruta=res[id].idruta;
    var origen=document.getElementById("modorigen").value;
    var destino=document.getElementById("moddestino").value;
    var request=new XMLHttpRequest();
    request.open("POST", "MODIFICARRUTA", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
           alert(request.responseText);
        }
        actualizarRutas();
    }
    request.send(JSON.stringify({idruta,origen,destino}));
}
actualizarRutas();