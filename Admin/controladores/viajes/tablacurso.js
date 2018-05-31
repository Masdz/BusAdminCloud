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
        tabla += '<td><button class="btn btn-danger" data-toggle="modal" data-target="#confirmationModal" onclick="setidbusconductor('+res[i].idbusconductor+')">'
        tabla += '<i class="fa fa-trash"></i>'
        tabla += '</button></td>';
        tabla += '<td><button class="btn btn-primary" data-toggle="modal" data-target="#terminarviajeModal" onclick="setidbusconductor('+res[i].idbusconductor+')">'
        tabla += '<i class="fa fa-check"></i>'
        tabla += '</button></td>';
        tabla += '</tr>';
    }
    document.getElementById("tablaviajescurso").innerHTML = tabla;
}
function setidbusconductor(val){
    console.log("id:"+val);
    document.getElementById("idbusconductoresmod").innerHTML=val;
}

function terminarViaje(recolectado){
    //var recolectado=document.getElementById("recolectado");
    var id=document.getElementById("idbusconductoresmod").innerHTML;
    var request=new XMLHttpRequest();
    var param='{"idbusconductor":1,"recolectado":"250"}';
    request.open("POST", "TERMINARVIAJE", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
           alert(request.responseText);
        }
        actualizarviajescurso();
        actualizarviajeshistorial();
    }
    request.send(JSON.stringify({"idbusconductor":id,"recolectado":recolectado}));
}
function eliminar(){
    var id=document.getElementById("idbusconductoresmod").innerHTML;
    var request=new XMLHttpRequest();
    request.open("POST", "ELIMINARVIAJE", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState == 4) {
           alert(request.responseText);
        }
        actualizarviajescurso();
        actualizarviajeshistorial();
    }
    request.send(JSON.stringify({id}));
}

actualizarviajescurso();