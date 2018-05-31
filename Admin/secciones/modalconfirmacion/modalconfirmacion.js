var barra=new XMLHttpRequest();
barra.open("GET","secciones/modalconfirmacion/modalconfirmacion.html",false);
barra.send(null);
var nav=barra.responseText;
document.getElementById("confirmacion").innerHTML=nav;
