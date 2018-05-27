function actualizarnoautobuses() {
    var request = new XMLHttpRequest();
    request.open("GET", "AUTOBUSES", false);
    request.send(null);
    var res = JSON.parse(request.responseText);
    var opc = "";
    for (var i in res) {
        opc += "<option>";
        opc += res[i].Numeroautobus;
        opc += "</option>";
    }
    document.getElementById("Numeroautobus").innerHTML = opc;
}
function actualizarconductores() {
    var request = new XMLHttpRequest();
    request.open("GET", "CONDUCTORES", false);
    request.send(null);
    var res = JSON.parse(request.responseText);
    var opc = "";
    for (var i in res) {
        opc += "<option>";
        opc += res[i].nombre + " " + res[i].apellidoP + " " + res[i].apellidoM;
        opc += "</option>";
    }
    document.getElementById("idconductor").innerHTML = opc;
}
function iniciarViaje(){
    idconductor=document.getElementById("idconductor").value;
    Numeroautobus=document.getElementById("Numeroautobus").value;
    var request=new XMLHttpRequest();
    request.open("POST", "INICIARVIAJE", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            alert(request.responseText);
        }
        actualizarviajescurso();
        actualizarviajeshistorial();
        request.send(JSON.stringify({idconductor,Numeroautobus}));
    }
}
actualizarnoautobuses();
actualizarconductores();