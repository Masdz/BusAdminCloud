function actualizarRutas() {
    var datos = new XMLHttpRequest();
    datos.open("GET", "RUTAS", false);
    datos.send(null);
    var res = JSON.parse(datos.responseText);
    var tabla = "";
    for (var i in res) {
        tabla += "<tr>";
        tabla += "<td>" + res[i].idruta + "</td>";
        tabla += "<td>" + res[i].origen + "</td>";
        tabla += "<td>" + res[i].destino + "</td>";
        tabla += '<td><button class="btn btn-danger" data-toggle="modal" data-target="#confirmationModal" onclick="setidbusconductor('+res[i].idruta+')">'
        tabla += '<i class="fa fa-trash"></i>'
        tabla += '</button></td>';
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
function setidbusconductor(val){
    console.log("id:"+val);
    document.getElementById("idItem").innerHTML=val;
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
actualizarRutas();