var datos={
    1:{
        "placa":"afjklasf",
        "nbus":"100",
        "nacientos":"20"
    },2:{
        "placa":"skgjiljsi",
        "nbus":"102",
        "nacientos":"20"
    },3:{
        "placa":"iuifaj",
        "nbus":"105",
        "nacientos":"20"
    },4:{
        "placa":"iouanv",
        "nbus":"108",
        "nacientos":"20"
    }
}
window.onload=function(){
    var tabla=document.getElementById("tabla");
    var code="";
    for(var i in datos){
        code+="<tr>";
        code+="<td>"+i+"</td>";
        code+="<td>"+datos[i].placa+"</td>";
        code+="<td>"+datos[i].nbus+"</td>";
        code+="<td>"+datos[i].nacientos+"</td>";
        code+="</tr>";
    }
    tabla.innerHTML=code;
}
