"use strict";
var sys = require('util');
var url = require('url');
var qs = require("querystring");
var HashMap = require('hashmap');
var http = require('http');
var querystring = require('querystring');
var express = require('express');
var bodyParser = require('body-parser');
var path=require('path');
var conexionBD=require(__dirname+'/mysql/bdConexion');

var map = new HashMap();
var tmap = new HashMap();
var app = express();
var cache = false;
var best = 'empty';
var IniDif = 'empty';
var n1, n2, suma;

var conexion=conexionBD((error)=>{
    console.log("No se pudo conectar a la bd"+error);
});


var Pasajero = require("./modelos/Pasajero.js");
var Conductor = require("./modelos/Conductor");

map.clear();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'Admin')));


setInterval(function () {
    var val = tmap.values();
    var key = tmap.keys();
    console.log("Iniciando validacion");
    for (var i = 0; i < tmap.size; i++) {
        console.log("Validando " + i + "/" + tmap.size);
        if (val[i] === '1') {
            tmap.set(key[i], '0');
            console.log("un elemento podria ser eliminado");
        } else if (val[i] === '0') {
            map.delete(key[i]);
            tmap.delete(key[i]);
            console.log("se elimino un elemento");
        } else {
            console.log("prro kha");
        }
    }
    console.log("validacion finalizada");
}, 1200000);
//},30000 );
app.get('/',function(req,res){
	res.sendFile(__dirname+'/Admin/index.html');
});

app.get('/OBTENERCORDENADAS/:id?', function (req, res, next) {
    var response = "";
    if (req.params.id) {
        response = map.get(req.params.id);
    } else {
        response = "NO_PARAMS";
    }
    res.status(200).send(response);
});

app.get('/OBTENERCORDENADAS2', function (req, res, next) {
    var response = "";
    var val = map.values();
    var key = map.keys();
    for (var i = 0; i < map.size; i++) {
        response = response + '"' + key[i] + '":{' + val[i] + '}';
        if (i + 1 < map.size) {
            response = response + ',';
        }
    }
    res.status(200).send('{' + response + '}');
});

app.get('/PROBAR', function (req, res) {
    res.status(200).send("Hola 2");
});


app.get('/AUTOBUSES',function(req,res){
    var query='SELECT  Numeroautobus,placa,idlinea,origen,destino FROM autobuses,rutas where autobuses.idruta=rutas.idruta';
    console.log(query);
    conexion.query(query,(error,result)=>{
        if(error!=undefined&&error!=null){
            res.status(500).send("Error en la consulta:"+error);
        }else{
            res.status(200).send(result);
        }1
    });
});

app.get('/CONDUCTORES',function(req,res){
    var query='SELECT * FROM conductores';
    console.log(query);
    conexion.query(query,(error,result)=>{
        if(error!=undefined&&error!=null){
            res.status(500).send("Error en la consulta:"+error);
        }else{
            res.status(200).send(result);
        }1
    });
});

app.get('/ADMINISTRADORES',function(req,res){
    var query='SELECT * FROM Administradores';
    console.log(query);
    conexion.query(query,(error,result)=>{
        if(error!=undefined&&error!=null){
            res.status(500).send("Error en la consulta:"+error);
        }else{
            res.status(200).send(result);
        }1
    });
});

app.get('/VIAJESHISTORIAL',function(req,res){
    var query='SELECT aut.Numeroautobus,';
    query+= 'con.nombre,con.apellidoP,con.apellidoM,';
    query+= 'DATE_FORMAT(BC.fechaHora,"%d/%m/%Y %H:%i:%s") as fechaHora,';
    query+= 'DATE_FORMAT(BC.fechaHoraLlegada,"%d/%m/%Y %H:%i:%s") as fechaHorallegada,';
    query+= 'BC.recolectado,';
    query+= 'rut.origen,rut.destino ';
    query+= 'FROM Rutas AS rut, conductores AS con, autobuses As aut, BusConductores As BC ';
    query+= 'WHERE aut.Numeroautobus=BC.Numeroautobus ';
    query+= 'AND con.idconductor=BC.idconductor ';
    query+= 'AND rut.idruta=aut.idruta ';
    query+= 'AND BC.terminado=true'; 
    console.log(query);
    conexion.query(query,(error,result)=>{
        if(error!=undefined&&error!=null){
            res.status(500).send("Error en la consulta:"+error);
        }else{
            res.status(200).send(result);
        }
    });
});
app.get('/VIAJESCURSO',function(req,res){
    var query='SELECT BC.idbusconductor,';
    query+= 'aut.Numeroautobus,';
    query+= 'con.nombre,con.apellidoP,con.apellidoM,';
    query+= 'DATE_FORMAT(BC.fechaHora,"%d/%m/%Y %H:%i:%s") as fechaHora,';
    query+= 'rut.origen,rut.destino ';
    query+= 'FROM Rutas AS rut, conductores AS con, autobuses As aut, BusConductores As BC ';
    query+= 'WHERE aut.Numeroautobus=BC.Numeroautobus ';
    query+= 'AND con.idconductor=BC.idconductor ';
    query+= 'AND rut.idruta=aut.idruta ';
    query+= 'AND BC.terminado=false ';
    console.log(query);
    conexion.query(query,(error,result)=>{
        if(error!=undefined&&error!=null){
            res.status(500).send("Error en la consulta:"+error);
        }else{
            res.status(200).send(result);
        }
    });
});

app.post('/LOGINPASAJERO', function (req, res) {
    const {email,pass}=req.body;
    var query='SELECT * FROM pasajeros WHERE email=\"'+email+'\" && contrasena=\"'+pass+'\"';
    console.log(query);
    conexion.query(query,(error,result)=>{
        if(error!=undefined && error!=null){
            res.status(500).send("Error en la consulta:"+error);
        }else{
            if(result[0]==undefined){
                res.status(404).send('Usuario o contraseña incorrectos');
            }else{
                res.status(200).send(result[0]);
            }
            console.log(result[0]);
        }
    });
});
app.post('/LOGINCONDUCTOR', function (req, res) {
    const {email,pass}=req.body;
    var query='SELECT * FROM conductores WHERE email=\"'+email+'\" && contrasena=\"'+pass+'\"';
    console.log(query);
    conexion.query(query,(error,result)=>{
        if(error!=undefined && error!=null){
            res.status(500).send("Error en la consulta:"+error);
        }else{
            if(result[0]==undefined){
                res.status(404).send('Usuario o contraseña incorrectos');
            }else{
                res.status(200).send(result[0]);
            }
            console.log(result[0]);
        }
    });
});

app.post('/ENVIARCORDENADAS', function (req, res) {
    map.set(
            req.body.id, '"latitud":' + req.body.latitud + ','
            + '"longitud": ' + req.body.longitud + ','
            + '"velocidad": ' + req.body.velocidad);
    tmap.set(req.body.id, '1');
    res.status(200).send('Exito');
});

app.post('/ELIMINARCORDENADAS', function (req, res) {
    console.log('eliminar' + req.body.id);
    map.delete(req.body.id);
    tmap.delete(req.body.id);
    res.status(200).send('Exito');
});

app.post('/INICIARVIAJE', function (req, res) {
    const {Numeroautobus,idconductor}=req.body;
    conexion.query('INSERT INTO busconductores SET?',{
        Numeroautobus,
        idconductor,
        fechaHoraLlegada:null
    },(error,result)=>{
        if(error!=undefined&&error!=null){
            res.status(409).send('Error al iniciar viaje');
        }else{
            res.status(200).send('Exito');
        }
        console.log('resultado: '+result);
        console.log('error: '+error);
    });
});

app.post('/TERMINARVIAJE', function (req, res) {
    const {idbusconductor,recolectado}=req.body;
    var query='UPDATE BusConductores SET fechaHoraLlegada=DEFAULT, recolectado='+recolectado+', terminado=TRUE WHERE idbusconductor='+idbusconductor;
    conexion.query(query,(error,result)=>{
        if(error!=undefined&&error!=null){
            res.status(409).send('Error al terminar viaje');
            console.log('id '+idbusconductor);
            console.log('recc '+recolectado);
        }else{
            res.status(200).send('Exito');
        }
        console.log('resultado: '+result);
        console.log('error: '+error);
    });
});

app.post('/REGISTRARPASAJERO', function (req, res) {
    const {nombre,apaterno,amaterno,email,contraseña}=req.body;
    conexion.query('INSERT INTO pasajeros SET?',{
        nombre:nombre,
        apellidoP:apaterno,
        apellidoM:amaterno,
        email:email,
        contrasena:contraseña
    },(error,result)=>{
        if(error!=undefined&&error!=null){
            res.status(409).send('Error al registrar Usuario');
        }else{
            res.status(200).send('Exito');
        }
        console.log('resultado: '+result);
        console.log('error: '+error);
    });
});

app.post('/REGISTRARCONDUCTOR', function (req, res) {
    const {nombre,apaterno,amaterno,email,contraseña}=req.body;
    conexion.query('INSERT INTO conductores SET?',{
        nombre:nombre,
        apellidoP:apaterno,
        apellidoM:amaterno,
        email:email,
        contrasena:contraseña
    },(error,result)=>{
        if(error!=undefined&&error!=null){
            res.status(409).send('Error al registrar Usuario');
        }else{
            res.status(200).send('Exito');
        }
        console.log('resultado: '+result);
        console.log('error: '+error);
    });
});



//app.listen(3000);
var server = app.listen((process.env.PORT || 5000), function () {
    console.log('listening on *:5000');
});
//tonsquemike