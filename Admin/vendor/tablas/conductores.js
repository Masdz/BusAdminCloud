var datos={
    1:{
        "nombre":"Marco",
        "apaterno":"Alfonso",
        "amaterno":"Ortiz"
    },2:{
        "nombre":"Jose",
        "apaterno":"Gonzalez",
        "amaterno":"Dominguez"
    },3:{
        "nombre":"Luis",
        "apaterno":"Zepeda",
        "amaterno":"Jordan"
    },4:{
        "nombre":"Eder",
        "apaterno":"Mejia",
        "amaterno":"Ortiz"
    },5:{
        "nombre":"Marco",
        "apaterno":"Ortiz",
        "amaterno":"Dominguez"
    },6:{
        "nombre":"Juan",
        "apaterno":"Diaz",
        "amaterno":"Mejia"
    },7:{
        "nombre":"Pepe",
        "apaterno":"Rodriguez",
        "amaterno":"Ortiz"
    }
}
var tabla=document.getElementById("tabla");
var code="";
for(var i in datos){
    code+="<tr>";
    code+="<td>"+i+"</td>";
    code+="<td>"+datos[i].nombre+"</td>";
    code+="<td>"+datos[i].apaterno+"</td>";
    code+="<td>"+datos[i].amaterno+"</td>";
    code+="</tr>";
}
tabla.innerHTML=code;