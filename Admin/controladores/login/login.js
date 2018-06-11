function validarDatos() {
    var email = document.getElementById("email").value;
    var contrasena = document.getElementById("contrasena").value;
    if (email == "" || email == null || contrasena == "" || contrasena == null) {
        document.getElementById("mensajeE").innerHTML = "Completa todos los campos.";
        $('#alertaError').show();
    } else {
        var request = new XMLHttpRequest();
        request.open("POST", "LOGIN", true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({ contrasena, email }));
        request.onreadystatechange = function() {
            console.log("State paps");
            if (request.readyState == 4) {
                console.log("Primer if");
                if (request.status == 404) {
                    bandera = 1;
                    console.log("Segundo if");
                    document.getElementById("mensajeE").innerHTML = "El E-mail o la contraseña no coinciden, intenta nuevamente.";
                    $('#alertaError').show();
                } else if (request.status == 200) {
                    window.open("inicio.html", "_self");
                }
            }
        }
    }

}