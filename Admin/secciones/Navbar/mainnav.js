var barra=new XMLHttpRequest();
barra.open("GET","secciones/Navbar/mainnav.html",false);
barra.send(null);
var nav=barra.responseText;
document.getElementById("mainNav").innerHTML=nav;
