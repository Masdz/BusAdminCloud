var barra=new XMLHttpRequest();
barra.open("GET","controladores/viajes/modal.html",false);
barra.send(null);
var nav=barra.responseText;
document.getElementById("modalterminar").innerHTML=nav;
