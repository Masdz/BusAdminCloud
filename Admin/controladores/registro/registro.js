function registrarAdmins() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var apellidoP = document.getElementById("apPaterno").value;
    var apellidoM = document.getElementById("apMaterno").value;
    var contrasena = document.getElementById("contrasena").value;
    var request = new XMLHttpRequest();
    request.open("POST", "REGISTRARADMINISTRADOR", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ nombre, email, apellidoP, apellidoM, contrasena }));
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                alerta("Éxito", "Te has registrado exitosamente");
            } else {
                alerta("Error", "Ha ocurrido un error");
            }

        }
    }
}