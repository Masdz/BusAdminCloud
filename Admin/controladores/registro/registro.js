var ok = false;
var bandera = 0;

function validarEmail() {
    var email = document.getElementById("email").value;
    //Conexion BD
    var request = new XMLHttpRequest();
    request.open("POST", "VERIFYEMAIL", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({ email }));
    request.onreadystatechange = function() {
        console.log("State paps");
        if (request.readyState == 4) {
            console.log("Primer if");
            if (request.status == 418) {
                bandera = 1;
                console.log("Segundo if");
                document.getElementById("mensajeE").innerHTML = "El E-mail ya está registrado, intenta con otro.";
                $('#alertaError').show();
            } else if (request.status == 200) {
                validaciones();
            }
        }
    }
}

function validaciones() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var apellidoP = document.getElementById("apPaterno").value;
    var apellidoM = document.getElementById("apMaterno").value;
    var contrasena = document.getElementById("contrasena").value;
    var repetirContra = document.getElementById("repetirContra").value;
    console.log("aki pvto?");

    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (nombre == "" || nombre == null || email == "" || email == null || apellidoM == "" || apellidoM == null || apellidoP == "" || apellidoP == null || contrasena == "" || contrasena == null || repetirContra == "" || repetirContra == null) {
        document.getElementById("mensajeE").innerHTML = "Por favor, completa todos los campos.";
        $('#alertaError').show();
        console.log("Error");
    } else if (!emailRegex.test(email)) {
        document.getElementById("mensajeE").innerHTML = "Ingresa una dirección de E-mail correcta.";
        $('#alertaError').show();
        console.log("Error2");
    } else if (contrasena.length < 6 || contrasena.length > 20) {
        document.getElementById("mensajeE").innerHTML = "La contraseña debe tener de 6 a 20 caracteres.";
        $('#alertaError').show();
        console.log("Error3");
    } else if (contrasena != repetirContra) {
        document.getElementById("mensajeE").innerHTML = "Las contraseñas no coinciden.";
        $('#alertaError').show();
        console.log("Error4");
    } else {
        $('#alertaError').hide();
        console.log("Depurando: " + bandera);
        ok = true;
        guardarDatos();
    }
}

function guardarDatos() {
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var apellidoP = document.getElementById("apPaterno").value;
    var apellidoM = document.getElementById("apMaterno").value;
    var contrasena = document.getElementById("contrasena").value;
    var repetirContra = document.getElementById("repetirContra").value;
    if (ok) {
        var request = new XMLHttpRequest();
        request.open("POST", "REGISTRARADMINISTRADOR", true);
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({ nombre, email, apellidoP, apellidoM, contrasena }));
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    alerta("Éxito", "Te has registrado exitosamente.");
                    /*  document.getElementById("mensajeE").innerHTML = "Registrado con exito.";
                     $('#alertaError').show(); */
                    ok = false;
                } else {
                    alerta("Error", "Ha ocurrido un error, intentalo de nuevo.");
                    ok = false;
                }

            }
        }
    }

}

function registrarAdmins() {
    console.log("PApu: " + nombre);
    //validaciones();
    validarEmail();


}