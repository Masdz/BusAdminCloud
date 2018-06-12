DROP DATABASE  IF EXISTS busontime;
CREATE DATABASE busontime;
USE busontime;
CREATE TABLE pasajeros(
	idpasajero INT PRIMARY KEY AUTO_INCREMENT,
	nombre varchar(60) NOT NULL,
	apellidoP varchar(30),
	apellidoM varchar(30),
	email varchar(40) NOT NULL UNIQUE,
	contrasena varchar(100) NOT NULL
);
CREATE TABLE conductores(
	idconductor INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(60) NOT NULL,
	apellidoP VARCHAR(30),
	apellidoM VARCHAR(30)
	email varchar(40) NOT NULL UNIQUE,
	contrasena varchar(100) NOT NULL
);
CREATE TABLE rutas(
	idruta INT PRIMARY KEY AUTO_INCREMENT,
	origen VARCHAR(30) NOT NULL,
	destino VARCHAR(30) NOT NULL
);
CREATE TABLE paradas(
	idparadas INT PRIMARY KEY AUTO_INCREMENT,
	longitud FLOAT NOT NULL,
	latitud FLOAT NOT NULL,
	direccion VARCHAR(60) NOT NULL DEFAULT 'Desconocido'
);
CREATE TABLE LineasAutobuses(
	idlinea INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(20) NOT NULL
);
CREATE TABLE autobuses(
	Numeroautobus INT PRIMARY KEY AUTO_INCREMENT,
	placa varchar(10) NOT NULL,
	idlinea INT NOT NULL,
	idruta INT NOT NULL,
	FOREIGN KEY(idlinea) REFERENCES LineasAutobuses(idlinea),
	FOREIGN KEY(idruta) REFERENCES rutas(idruta)
);
CREATE TABLE BusConductores(
	idbusconductor INT PRIMARY KEY AUTO_INCREMENT,
	fechaHora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	Numeroautobus INT NOT NULL,
	idconductor INT NOT NULL,
	fechaHoraLlegada TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
	recolectado DECIMAL DEFAULT 100,
	terminado BOOLEAN DEFAULT FALSE,
	FOREIGN KEY(Numeroautobus) REFERENCES autobuses(Numeroautobus),
	FOREIGN KEY(idconductor) REFERENCES conductores(idconductor)
);
CREATE TABLE Pagos(
	costo FLOAT NOT NULL DEFAULT 12,
	origen VARCHAR(30) NOT NULL,
	destino VARCHAR(30) NOT NULL,
	idpasajero INT NOT NULL,
	idbusconductor INT NOT NULL,
	FOREIGN KEY(idpasajero) REFERENCES pasajeros(idpasajero),
	FOREIGN KEY(idbusconductor) REFERENCES BusConductores(idbusconductor)
);
CREATE TABLE Horario(
	dia VARCHAR(10) NOT NULL,
	horainicio TIME NOT NULL,
	horafin TIME NOT NULL,
	idlinea INT NOT NULL,
	FOREIGN KEY(idlinea) REFERENCES LineasAutobuses(idlinea)
);
CREATE TABLE RutasParadas(
	idparadas INT NOT NULL,
	idruta INT NOT NULL,
	FOREIGN KEY(idparadas) REFERENCES paradas(idparadas),
	FOREIGN KEY(idruta) REFERENCES rutas(idruta)
);
CREATE TABLE Reportes(
	fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
	motivo VARCHAR(120) NOT NULL,
	idconductor INT NOT NULL,
	FOREIGN KEY(idconductor) REFERENCES conductores(idconductor)
);
CREATE TABLE Administradores(
	idAdministrador INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(60),
	apellidoP VARCHAR(30),
	apellidoM VARCHAR(30),
	email VARCHAR(50),
	contrasena VARCHAR(50),
	idLinea INT,
	FOREIGN KEY(idLinea) REFERENCES lineasautobuses(idLinea)
);
INSERT INTO Administradores VALUES(null,"Mario","Serrano","Diaz","masdz2@hotmail.com","123456789",1);
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/pasajeros.txt' INTO TABLE pasajeros FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM pasajeros;
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/conductores.txt' INTO TABLE conductores FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM conductores;
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/rutas.txt' INTO TABLE rutas FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM rutas;
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/paradas.txt' INTO TABLE paradas FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM paradas;
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/LineasAutobuses.txt' INTO TABLE LineasAutobuses FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM LineasAutobuses;
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/autobuses.txt' INTO TABLE autobuses FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM autobuses;
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/BusConductores.txt' INTO TABLE BusConductores FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM BusConductores;
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/Pagos.txt' INTO TABLE Pagos FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM Pagos;
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/Horario.txt' INTO TABLE Horario FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM Horario;
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/RutasParadas.txt' INTO TABLE RutasParadas FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM RutasParadas;
LOAD DATA INFILE 'C:/Users/masdz/Desktop/UAPT/BDA/data/Reportes.txt' INTO TABLE Reportes FIELDS TERMINATED BY '\t' LINES TERMINATED BY '\r\n';
SELECT * FROM Reportes;
USE busontime
SELECT Pas.Nombre,Pas.apellidop as ApellidoPaterno,Pas.apellidoM as ApellidoMaterno,Pag.costo as Monto,bus.Numeroautobus,Con.Nombre as Conductor,Bus.fechaHora as FechaYHora
	FROM pasajeros AS Pas,Pagos AS Pag, BusConductores AS Bus,conductores AS Con
	WHERE  Pas.idpasajero=Pag.idpasajero
	AND Pag.idbusconductor=Bus.idbusconductor
	AND Bus.idconductor=Con.idconductor
	AND Pas.email='rmail@mail.com'
	ORDER BY Bus.fecha;
SELECT R.origen as Origen, R.destino as Destino 
	FROM rutas as R, autobuses as A
	WHERE R.idruta=A.idruta
	AND Numeroautobus=123;
SELECT L.nombre as Linea,H.horainicio as Inicio,H.horafin as Fin
	FROM LineasAutobuses AS L,Horario AS H
	WHERE L.idlinea=H.idlinea
	AND H.dia='lunes'
	ORDER BY Linea;
SELECT C.nombre as Conductor,AC.fechaHora as FechaYHora,A.Numeroautobus as NumeroDeAutobus,R.origen,R.destino
	FROM conductores AS C,BusConductores AS AC,autobuses AS A,rutas AS R
	WHERE AC.idconductor=C.idconductor
	AND AC.Numeroautobus=A.Numeroautobus
	AND A.idruta=R.idruta
	ORDER BY FechaYHora;
SELECT email,contrasena FROM pasajeros WHERE email='rmail@mail.com';
SELECT H.dia,L.nombre as Linea,H.horainicio as Inicio,H.horafin as Fin
	FROM LineasAutobuses AS L,Horario AS H
	WHERE L.idlinea=H.idlinea
	ORDER BY H.dia,Linea;

SELECT aut.Numeroautobus,con.nombre,con.apellidoP,con.apellidoM,BC.fechaHora,rut.origen,rut.destino
FROM Rutas AS rut, conductores AS con, autobuses As aut, BusConductores As BC
WHERE aut.Numeroautobus=BC.Numeroautobus
AND con.idconductor=BC.idconductor
AND rut.idruta=aut.idruta;

SELECT aut.Numeroautobus,
	con.nombre,con.apellidoP,con.apellidoM,
	DATE_FORMAT(BC.fechaHora,"%d/%m/%Y %H:%i:%s") as fechaHora,
	DATE_FORMAT(BC.fechaHoraLlegada,"%d/%m/%Y %H:%i:%s") as fechaHorallegada,
	BC.recolectado,rut.origen,rut.destinoFROM Rutas AS rut,
	conductores AS con, autobuses As aut, BusConductores As BC WHERE aut.Numeroautobus=BC.Numeroautobus AND con.idconductor=BC.idconductor AND rut.idruta=aut.idruta;
INSERT INTO BusConductores VALUES(6,'2018/03/05 13:02:37',5,5,'2018/03/05 14:02:37',300.0);

UPDATE BusConductores SET fechaHoraLlegada=DEFAULT, recolectado=200, terminado=TRUE WHERE idbusconductor=1 ;

SELECT recolectado,MONTH(fechaHora) AS mes FROM busconductores ORDER BY fechaHora WHERE fechaHora>DATE_SUB(now(),INTERVAL 1 YEAR);

INSERT INTO busconductores VALUES (null,'2015/08/01',1,1,'2015/08/01',100,1);
SELECT recolectado,MONTH(fechaHora) FROM busconductores WHERE fechaHora>DATE_SUB(now(),INTERVAL 1 YEAR) ORDER By fechaHora;

SELECT A.Numeroautobus,count(B.Numeroautobus) as total 
FROM autobuses as A,busconductores as B
WHERE B.Numeroautobus=A.Numeroautobus
GROUP BY(A.Numeroautobus)
ORDER BY(total) DESC
Limit 5;

SELECT nombre,apellidoP,apellidoM,motivo,fecha
FROM conductores,Reportes
WHERE conductores.idconductor=Reportes.idconductor;

SELECT 
