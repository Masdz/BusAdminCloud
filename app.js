"use strict"
var sys = require('util')
var url = require('url')
var qs = require("querystring")
var  HashMap  =  require('hashmap')
var http = require('http')
var querystring = require('querystring')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var conexionBD = require(__dirname + '/mysql/bdConexion')

var  map =  new  HashMap()
var tmap = new HashMap()
var app = express()
var cache = false
var best = 'empty'
var IniDif = 'empty'
var n1, n2, suma

var conexion = conexionBD((error) => {
    console.log("No se pudo conectar a la bd" + error)
})


var Pasajero = require("./modelos/Pasajero.js")
var Conductor = require("./modelos/Conductor")

map.clear()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'Admin')))


setInterval(function() {
        var val = tmap.values()
        var key = tmap.keys()
        for (var i = 0; i < tmap.size; i++) {
            console.log("Validando " + i + "/" + tmap.size)
            if (val[i] === '1') {
                tmap.set(key[i], '0')
            } else if (val[i] === '0') {
                map.delete(key[i])
                tmap.delete(key[i])
            } else {
                console.log("prro kha?")
            }
        }
    }, 1200000)
    //},30000 )  
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Admin/login.html')
})

app.get('/OBTENERCORDENADAS/:id?', function(req, res, next) {
    var response = ""
    if (req.params.id) {
        response = map.get(req.params.id)
    } else {
        response = "NO_PARAMS"
    }
    res.status(200).send(response)
})

app.get('/OBTENERCORDENADAS2', function(req, res, next) {
    var response = ""
    var val = map.values()
    var key = map.keys()
    for (var i = 0; i < map.size; i++) {
        response = response + '"' + key[i] + '":{' + val[i] + '}'
        if (i + 1 < map.size) {
            response = response + ','
        }
    }
    res.status(200).send('{' + response + '}')
})

app.get('/PROBAR', function(req, res) {
    res.status(200).send("Hola 2")
})


app.get('/AUTOBUSES', function(req, res) {
    var query = 'SELECT  autobuses.Numeroautobus,placa,autobuses.idruta,idlinea,origen,destino,count(busconductores.Numeroautobus) as total '
    query += 'FROM autobuses,rutas,busconductores '
    query += 'where autobuses.idruta=rutas.idruta '
    query += 'and busconductores.Numeroautobus=autobuses.Numeroautobus '
    query += 'group by autobuses.Numeroautobus'
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
        } else {
            res.status(200).send(result)
        }
    })
})

app.get('/AUTOBUSES2', function(req, res) {
    var query = 'SELECT A.Numeroautobus,count(B.Numeroautobus) as total '
    query += 'FROM autobuses as A,busconductores as B '
    query += 'WHERE B.Numeroautobus=A.Numeroautobus '
    query += 'GROUP BY(A.Numeroautobus) '
    query += 'ORDER BY(total) DESC '
    query += 'Limit 5 '
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
        } else {
            res.status(200).send(result)
        }
    })
})

app.get('/REPORTES', function(req, res) {
    var query = 'SELECT nombre,apellidoP,apellidoM,motivo,'
    query += 'DATE_FORMAT(fecha,"%d/%m/%Y") as fecha '
    query += 'FROM conductores,Reportes '
    query += 'WHERE conductores.idconductor=Reportes.idconductor'
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta: " + error)
        } else {
            res.status(200).send(result)
        }
    })
})

app.get('/CONDUCTORES', function(req, res) {
    var query = 'SELECT * FROM conductores'
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
        } else {
            res.status(200).send(result)
        }
    })
})

app.get('/ADMINISTRADORES', function(req, res) {
    var query = 'SELECT * FROM Administradores'
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
        } else {
            res.status(200).send(result)
        }
    })
})

app.get('/RUTAS', function(req, res) {
    var query = 'SELECT * FROM rutas'
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
        } else {
            res.status(200).send(result)
        }
    })
})

app.get('/INGRESOS', function(req, res) {
    var query = 'SELECT recolectado,MONTH(fechaHora) as mes FROM busconductores WHERE fechaHora>DATE_SUB(now(),INTERVAL 1 YEAR) ORDER By fechaHora'
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
        } else {
            res.status(200).send(result)
        }
    })
})

app.get('/VIAJESHISTORIAL', function(req, res) {
    var query = 'SELECT aut.Numeroautobus,'
    query += 'con.nombre,con.apellidoP,con.apellidoM,'
    query += 'DATE_FORMAT(BC.fechaHora,"%d/%m/%Y %H:%i:%s") as fechaHora,'
    query += 'DATE_FORMAT(BC.fechaHoraLlegada,"%d/%m/%Y %H:%i:%s") as fechaHorallegada,'
    query += 'BC.recolectado,'
    query += 'rut.origen,rut.destino '
    query += 'FROM Rutas AS rut, conductores AS con, autobuses As aut, BusConductores As BC '
    query += 'WHERE aut.Numeroautobus=BC.Numeroautobus '
    query += 'AND con.idconductor=BC.idconductor '
    query += 'AND rut.idruta=aut.idruta '
    query += 'AND BC.terminado=true'
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
        } else {
            res.status(200).send(result)
        }
    })
})
app.get('/VIAJESCURSO', function(req, res) {
    var query = 'SELECT BC.idbusconductor,'
    query += 'aut.Numeroautobus,'
    query += 'con.nombre,con.apellidoP,con.apellidoM,'
    query += 'DATE_FORMAT(BC.fechaHora,"%d/%m/%Y %H:%i:%s") as fechaHora,'
    query += 'rut.origen,rut.destino '
    query += 'FROM Rutas AS rut, conductores AS con, autobuses As aut, BusConductores As BC '
    query += 'WHERE aut.Numeroautobus=BC.Numeroautobus '
    query += 'AND con.idconductor=BC.idconductor '
    query += 'AND rut.idruta=aut.idruta '
    query += 'AND BC.terminado=false '
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
        } else {
            res.status(200).send(result)
        }
    })
})

app.post('/LOGINPASAJERO', function(req, res) {
    const { email, pass } = req.body
    var query = 'SELECT * FROM pasajeros WHERE email=\"' + email + '\" && contrasena=\"' + pass + '\"'
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
        } else {
            if (result[0] == undefined) {
                res.status(404).send('Usuario o contraseña incorrectos')
            } else {
                res.status(200).send(result[0])
            }
            console.log(result[0])
        }
    })
})
app.post('/LOGINCONDUCTOR', function(req, res) {
    const { email, pass } = req.body
    var query = 'SELECT * FROM conductores WHERE email=\"' + email + '\" && contrasena=\"' + pass + '\"'
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
        } else {
            if (result[0] == undefined) {
                res.status(404).send('Usuario o contraseña incorrectos')
            } else {
                res.status(200).send(result[0])
            }
            console.log(result[0])
        }
    })
})

app.post('/ENVIARCORDENADAS', function(req, res) {
    map.set(
        req.body.id, '"latitud":' + req.body.latitud + ',' +
        '"longitud": ' + req.body.longitud + ',' +
        '"velocidad": ' + req.body.velocidad)
    tmap.set(req.body.id, '1')
    res.status(200).send('Exito')
})

app.post('/ELIMINARCORDENADAS', function(req, res) {
    console.log('eliminar' + req.body.id)
    map.delete(req.body.id)
    tmap.delete(req.body.id)
    res.status(200).send('Exito')
})
app.post('/REGISTRARAUTOBUS', function(req, res) {
    const { Numeroautobus, placa, idlinea, idruta } = req.body
    conexion.query('INSERT INTO autobuses SET?', {
        Numeroautobus,
        placa,
        idlinea,
        idruta
    }, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al registrar autobus:' + error)
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/REGISTRARRUTA', function(req, res) {
    const { origen, destino } = req.body
    conexion.query('INSERT INTO Rutas SET?', {
        origen,
        destino
    }, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al registrar ruta')
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/INICIARVIAJE', function(req, res) {
    const { Numeroautobus, idconductor } = req.body
    conexion.query('INSERT INTO busconductores SET?', {
        Numeroautobus,
        idconductor,
        fechaHoraLlegada: null
    }, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al iniciar viaje')
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/TERMINARVIAJE', function(req, res) {
    const { idbusconductor, recolectado } = req.body
    var query = 'UPDATE BusConductores SET fechaHoraLlegada=DEFAULT, recolectado=' + recolectado + ', terminado=TRUE WHERE idbusconductor=' + idbusconductor
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al terminar viaje')
            console.log('id ' + idbusconductor)
            console.log('recc ' + recolectado)
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/REGISTRARPASAJERO', function(req, res) {
    const { nombre, apaterno, amaterno, email, contraseña } = req.body
    conexion.query('INSERT INTO pasajeros SET?', {
        nombre: nombre,
        apellidoP: apaterno,
        apellidoM: amaterno,
        email: email,
        contrasena: contraseña
    }, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al registrar Usuario')
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/REGISTRARCONDUCTOR', function(req, res) {
    const { nombre, apaterno, amaterno, email, contraseña } = req.body
    conexion.query('INSERT INTO conductores SET?', {
        nombre: nombre,
        apellidoP: apaterno,
        apellidoM: amaterno,
        email: email,
        contrasena: contraseña
    }, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al registrar Usuario')
        } else {
            res.status(200).send('Conductor registrado existosamente')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/REGISTRARADMINISTRADOR', function(req, res) {
    const { nombre, apellidoP, apellidoM, email, contrasena } = req.body
    conexion.query('INSERT INTO administradores SET?', {
        nombre,
        apellidoP,
        apellidoM,
        email,
        contrasena,
        idlinea: null
    }, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al registrar Administrador' + error)
        } else {
            res.status(200).send('Exito')
        }
        console.log('nommaes we: ' + result)
        console.log('>:v : ' + error)
    })
})

app.post('/VERIFYEMAIL', function(req, res) {
    const { email } = req.body
    var query = "SELECT email FROM administradores WHERE email='" + email + "'"
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
            console.log("Error: " + error)
        } else {
            if (result[0] == undefined) {
                res.status(200).send('exitoo')
            } else {
                res.status(418).send('El E-mail ya esta registrado')
            }
            console.log('resultado11: ' + result)
            console.log('error11: ' + error)
                //console.log(result[0])
        }
    })
})

app.post('/VERIFYEMAIL2', function(req, res) {
    const { tabla, email } = req.body
    var query = "SELECT email FROM " + tabla + " WHERE email='" + email + "'"
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(500).send("Error en la consulta:" + error)
            console.log("Error: " + error)
        } else {
            if (result[0] == undefined) {
                res.status(200).send('exitoo')
            } else {
                res.status(418).send('El E-mail ya esta registrado')
            }
            console.log('resultado11: ' + result)
            console.log('error11: ' + error)
                //console.log(result[0])
        }
    })
})

app.post('/LOGIN', function(req, res) {
    const { contrasena, email } = req.body
    var query = "SELECT email,contrasena FROM administradores WHERE email='" + email + "' AND contrasena='" + contrasena + "'"
    console.log(query);
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error de consulta ' + error)
        } else {
            if (result[0] == undefined) {
                res.status(404).send('Usuario o contraseña incorrectos')
            } else {
                res.status(200).send(result[0])
            }
            console.log(result[0])
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})


app.post('/ELIMINARVIAJE', function(req, res) {
    const { id } = req.body
    var query = "Delete from busconductores where idbusconductor=" + id
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al eliminar viaje' + error)
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/ELIMINARCONDUCTOR', function(req, res) {
    const { id } = req.body
    var query = "Delete from conductores where idconductor=" + id
    console.log(query)
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al eliminar conductor' + error)
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})


app.post('/ELIMINARAUTOBUS', function(req, res) {
    const { id } = req.body
    var query = "Delete from autobuses where Numeroautobus=" + id
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al eliminar autobus, solo puedes eliminar autobuses que no tengan viajes realizados')
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/ELIMINARUTA', function(req, res) {
    const { id } = req.body
    var query = "Delete from rutas where idruta=" + id
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al eliminar ruta ' + error)
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/REGISTRO', function(req, res) {
    const { nombre, apellidoP, apellidoM, email, contrasena } = req.body
    conexion.query('INSERT INTO administradores SET?', {
        nombre,
        apellidoP,
        apellidoM,
        email,
        contrasena
    }, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al registrar Administrador' + error)
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/MODIFICARCONDUCTOR', function(req, res) {
    const { idconductor, nombre, apellidoP, apellidoM, email } = req.body
    var query = "UPDATE conductores SET "
    query += "idconductor=" + idconductor + ","
    query += "nombre='" + nombre + "',"
    query += "apellidoP='" + apellidoP + "',"
    query += "apellidoM='" + apellidoM + "' "
    if (email != "none") {
        query += ",email='" + email + "' "
    }
    query += "WHERE idconductor=" + idconductor
    console.log(query);
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al modificar conductor')
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/MODIFICARAUTOBUS', function(req, res) {
    const { Numeroautobus, placa, idruta } = req.body
    var query = "UPDATE Autobuses SET placa='" + placa + "', idruta=" + idruta + " WHERE Numeroautobus=" + Numeroautobus
    console.log(query);
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al modificar autobus')
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})

app.post('/MODIFICARRUTA', function(req, res) {
    const { idruta, origen, destino } = req.body
    var query = "UPDATE rutas SET "
    query += "origen='" + origen + "',"
    query += "destino='" + destino + "' "
    query += "WHERE idruta=" + idruta
    console.log(query);
    conexion.query(query, (error, result) => {
        if (error != undefined && error != null) {
            res.status(409).send('Error al modificar ruta')
        } else {
            res.status(200).send('Exito')
        }
        console.log('resultado: ' + result)
        console.log('error: ' + error)
    })
})


//app.listen(3000)  
var server = app.listen((process.env.PORT || 5000), function() {
    console.log('listening on *:5000')
})