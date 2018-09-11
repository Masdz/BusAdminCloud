DROP DATABASE  IF EXISTS busontime2;
CREATE DATABASE busontime2;
USE busontime2;
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
	apellidoM VARCHAR(30),
	email varchar(40) NOT NULL UNIQUE,
	contrasena varchar(100)
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
INSERT INTO pasajeros VALUES
(1, 'Roberto', 'Zepeda', 'Constantino', 'rmail@mail.com', 'jfladfklj'),
(2, 'Pablo', 'Juarez', 'Perez', 'pab123@mail.com', 'ksajdflkj'),
(3, 'Luis', 'Gonzalez', 'Mejia', 'lgm250@mail.com', 'asjhdfkjhuie'),
(4, 'Ana', 'Mejia', 'Lopez', 'anita32@mail.com', 'hkvhhfd'),
(5, 'Maria', 'Lopez', 'Juarez', 'mari99@mail.com', 'asjfhhdsf');
INSERT INTO conductores VALUES
(1, 'Pablito', 'Rodrígez', 'Rodrígez', 'ajsfhja@ajlkfj.com', 'dfkjsahfjk'),
(2, 'Rodri', 'Rodrígez', 'Perez', 'sdafat@asdf.com', 'ajksdfbjbk'),
(3, 'Hugo', 'Plata', 'Romero', 'huhsua@hugh.com', 'jadksfk'),
(4, 'Pedro', 'Rodrígez', 'Rodrígez', 'gijiogj@jagji.com', 'asdfhiuoh'),
(5, 'Pedro', 'Goméz', 'Mejia', 'oiuiou@huaihre.com', 'ajfhhuhjhj'),
(6, 'Roberto', 'Mejia', 'Torres', 'ajsdf@jaklfj.com', NULL),
(7, 'joselito5', 'pancracio', 'ramirez', 'joselito@mail.com', NULL);
INSERT INTO rutas VALUES
(1, 'Tenango', 'Toluca'),
(2, 'Santiago', 'Toluca'),
(3, 'Calimaya', 'Toluca'),
(4, 'Santiago', 'Tenango'),
(5, 'DF', 'Cuernavaca'),
(6, 'Calimaya', 'Tenango'),
(7, 'Chapultdpdc', 'Toluca');
INSERT INTO paradas VALUES
(1, 1.3872, 2.34523, 'Tenango'),
(2, 1.32432, 2.59837, 'Toluca'),
(3, 1.34235, 2.41898, 'Mexicalzingo'),
(4, 1.75929, 2.41236, 'Santiago'),
(5, 1.24355, 2.41234, 'Desconocido');
INSERT INTO lineasautobuses VALUES
(1, 'Flecha roja'),
(2, 'Primero de mayo'),
(3, 'Teo'),
(4, 'Aguila'),
(5, 'Caminante');
INSERT INTO autobuses VALUES
(1, 'ahdf58d8', 1, 1),
(2, 'daf8456', 2, 1),
(3, 'jvu5789', 3, 1),
(4, 'fdx4356', 4, 1),
(5, 'qwi7854', 5, 1),
(6, 'asjf45', 1, 2),
(7, 'asjdfa', 1, 5);
INSERT INTO busconductores VALUES
(1, '2018-01-16 22:02:37', 1, 1, '2018-01-16 23:02:37', '150', 1),
(2, '2018-03-05 22:32:37', 2, 2, '2018-05-27 12:27:38', '200', 1),
(3, '2018-03-05 23:02:37', 3, 3, '2018-05-27 12:27:47', '150', 1),
(4, '2018-03-05 23:32:37', 4, 4, '2018-05-27 12:27:57', '170', 1),
(5, '2018-02-21 13:02:37', 5, 5, '2018-02-21 14:02:37', '400', 1),
(6, '2018-05-27 12:28:26', 2, 1, '2018-05-27 12:29:10', '240', 1),
(7, '2018-05-27 12:28:34', 1, 3, '2018-05-27 12:29:20', '315', 1),
(8, '2018-05-27 12:28:43', 4, 2, '2018-05-27 12:29:27', '300', 1),
(9, '2018-05-27 12:28:51', 5, 5, '2018-05-27 12:30:16', '170', 1),
(10, '2018-05-27 12:28:57', 3, 5, '2018-05-27 12:30:27', '33', 1),
(11, '2018-04-09 12:28:57', 3, 5, '2018-04-09 13:28:57', '170', 1),
(15, '2018-05-27 23:42:25', 3, 5, '2018-05-28 07:19:46', '700', 1),
(16, '2018-05-28 07:19:26', 6, 5, '2018-05-28 07:19:26', '100', 0),
(17, '2018-05-29 08:27:07', 3, 3, '2018-05-29 08:27:44', '10', 1),
(18, '2018-05-30 02:23:31', 4, 3, '2018-05-30 02:23:31', '100', 0);
INSERT INTO pagos VALUES
(12, 'Toluca', 'Tenango', 1, 1),
(12, 'Tenango', 'Toluca', 2, 2),
(8, 'Tenango', 'Toluca', 3, 3),
(9, 'Toluca', 'Tenango', 4, 4),
(9, 'Tenango', 'Toluca', 5, 5);
INSERT INTO horario VALUES
('Lunes', '07:00:00', '20:00:00', 1),
('Lunes', '07:00:00', '20:00:00', 2),
('Lunes', '07:00:00', '20:00:00', 3),
('Lunes', '07:00:00', '20:00:00', 4),
('Lunes', '07:00:00', '20:00:00', 5);
INSERT INTO rutasparadas VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1);
INSERT INTO reportes VALUES
('2018-03-05 22:02:37', 'El conductor conduce muy rapido', 1),
('2018-03-05 22:02:37', 'El conductor conduce muy lento', 1),
('2018-03-05 22:02:37', 'El conductor me trato mal', 1),
('2018-03-05 22:02:37', 'Los asientos estan rotos', 1),
('2018-03-05 22:02:37', 'La ventana esta rota', 1);
INSERT INTO administradores VALUES
(2, 'Mario', 'Serrano', 'Diaz', 'masdz2@hotmail.com', '123456789', 1),
(3, 'Jovani', 's', 'G', 'masdz@hotmail.com', '123456', NULL),
(4, 'Jovani', 's', 'G', 'masdz3@hotmail.com', '123456', NULL),
(5, 'ELMARIO', 's', 'G', 'masdz4@hotmail.com', '123456', NULL),
(6, 'ELMARIO', 's', 'G', 'masdz5@hotmail.com', '123456', NULL);
USE busontime2;
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
SELECT recolectado,MONTH(fechaHora) as mes 
	FROM busconductores 
	WHERE fechaHora>DATE_SUB(now(),INTERVAL 1 YEAR) 
	ORDER By fechaHora;
SELECT A.Numeroautobus,count(B.Numeroautobus) as total 
	FROM autobuses as A,busconductores as B 
	WHERE B.Numeroautobus=A.Numeroautobus 
	GROUP BY(A.Numeroautobus) 
	ORDER BY(total) DESC Limit 5;
SELECT BC.idbusconductor,
		aut.Numeroautobus,
		con.nombre,
		con.apellidoP,con.apellidoM,
		DATE_FORMAT(BC.fechaHora,"%d/%m/%Y %H:%i:%s") as fechaHora,
		rut.origen,rut.destino 
	FROM Rutas AS rut, 
		conductores AS con, 
		autobuses As aut, 
		BusConductores As BC 
	WHERE aut.Numeroautobus=BC.Numeroautobus 
	AND con.idconductor=BC.idconductor 
	AND rut.idruta=aut.idruta 
	AND BC.terminado=false;
SELECT aut.Numeroautobus,
		con.nombre,con.apellidoP,
		con.apellidoM,DATE_FORMAT(BC.fechaHora,"%d/%m/%Y %H:%i:%s") as fechaHora,
		DATE_FORMAT(BC.fechaHoraLlegada,"%d/%m/%Y %H:%i:%s") as fechaHorallegada,
		BC.recolectado,rut.origen,rut.destino FROM Rutas AS rut, conductores AS con, 
		autobuses As aut, 
		BusConductores As BC 
	WHERE aut.Numeroautobus=BC.Numeroautobus 
	AND con.idconductor=BC.idconductor 
	AND rut.idruta=aut.idruta 
	AND BC.terminado=true;
	
