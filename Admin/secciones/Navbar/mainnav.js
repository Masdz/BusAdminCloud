var barra=new XMLHttpRequest();
barra.open("GET","secciones/Navbar/mainnav.html",false);
barra.send(null);
var nav=barra.responseText;
document.getElementById("mainNav").innerHTML=nav;

function logout(){
    var request=new XMLHttpRequest();
    request.open("POST","LOGOUT",false);
    request.onreadystatechange=()=>{
        if(request.readyState==4 && request.status==200){
            window.open("login.html", "_self");
        }
    }
    request.send();
}