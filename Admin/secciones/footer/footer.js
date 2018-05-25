var barra=new XMLHttpRequest();
barra.open("GET","secciones/footer/footer.html",false);
barra.send(null);
var nav=barra.responseText;
document.getElementById("footer").innerHTML=nav;
