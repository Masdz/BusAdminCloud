var barra=new XMLHttpRequest();
barra.open("GET","secciones/modal/modal.html",false);
barra.send(null);
var nav=barra.responseText;
document.getElementById("modal").innerHTML=nav;
