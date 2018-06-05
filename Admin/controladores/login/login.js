function validarDatos() {
    var email = document.getElementById("email").value;
    var contrasena = document.getElementById("contrasena").value;
    var request = new XMLHttpRequest();
    request.open("POST", "LOGIN", true);
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
}