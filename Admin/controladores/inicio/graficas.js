
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var etiquetas=[];
var datos=[];
var maxi=0;
function getDatos(){
  var request=new XMLHttpRequest();
  request.open('GET','INGRESOS',false);
  request.send(null);
  var res=JSON.parse(request.responseText);
  var vals=[0,0,0,0,0,0,0,0,0,0,0,0,0];
  var meses=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  for(var i in res){
    vals[res[i].mes-1]+=res[i].recolectado;
  }
  var mes=new Date().getMonth();
  for(var i=0;i<12;i++){
    mes++;
    if(mes>11){
      mes=0;
    }
    datos.push(vals[mes]);
    etiquetas.push(meses[mes]);
    maxi=getMaxi(datos);
  }
}

function getMaxi(datos){
  var maxi=0;
  for(var i in datos){
    if(datos[i]>maxi){
      maxi=datos[i];
    }
  }
  return maxi;
}

function getLabels(){
  var meses=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var mes=new Date().getMonth();
  var labels=[];
  for(var i=0;i<12;i++){
    mes++;
    if(mes>=12){
      mes=0;
    }
    labels.push(meses[mes]);
  }
  return labels;
}
function inigrafica() {
  getDatos();
  var ctx = document.getElementById("myAreaChart");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: etiquetas,
      datasets: [{
        label: "Ingresos",
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: "rgba(2,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 20,
        pointBorderWidth: 2,
        data: datos,
      }],
    },
    options: {
      scales: {
        xAxes: [{
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        }],
        yAxes: [{
          ticks: {
            min: 0,
            max: maxi,
            maxTicksLimit: 5
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        }],
      },
      legend: {
        display: false
      }
    }
  });
}
inigrafica();