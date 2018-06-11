SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
DROP DATABASE IF EXISTS busontime2;
CREATE DATABASE `busontime2` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `busontime2`;

CREATE TABLE `administradores` (
  `idAdministrador` int(11) NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `apellidoP` varchar(30) DEFAULT NULL,
  `apellidoM` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `contrasena` varchar(50) DEFAULT NULL,
  `idLinea` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `administradores` VALUES
(2, 'Mario', 'Serrano', 'Diaz', 'masdz2@hotmail.com', '123456789', 1);

CREATE TABLE `autobuses` (
  `Numeroautobus` int(11) NOT NULL,
  `placa` varchar(10) NOT NULL,
  `idlinea` int(11) NOT NULL,
  `idruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `autobuses` VALUES
(1, 'ahdf58d8', 1, 1),
(2, 'daf8456', 2, 1),
(3, 'jvu5789', 3, 1),
(4, 'fdx4356', 4, 1),
(5, 'qwi7854', 5, 1),
(6, 'asjf45', 1, 2);

CREATE TABLE `busconductores` (
  `idbusconductor` int(11) NOT NULL,
  `fechaHora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Numeroautobus` int(11) NOT NULL,
  `idconductor` int(11) NOT NULL,
  `fechaHoraLlegada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `recolectado` decimal(10,0) DEFAULT '100',
  `terminado` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `busconductores` VALUES
(1, '2018-01-17 04:02:37', 1, 1, '2018-01-17 05:02:37', '150', 1),
(2, '2018-03-06 04:32:37', 2, 2, '2018-05-27 17:27:38', '200', 1),
(3, '2018-03-06 05:02:37', 3, 3, '2018-05-27 17:27:47', '150', 1),
(4, '2018-03-06 05:32:37', 4, 4, '2018-05-27 17:27:57', '170', 1),
(5, '2018-02-21 19:02:37', 5, 5, '2018-02-21 20:02:37', '400', 1),
(6, '2018-05-27 17:28:26', 2, 1, '2018-05-27 17:29:10', '240', 1),
(7, '2018-05-27 17:28:34', 1, 3, '2018-05-27 17:29:20', '315', 1),
(8, '2018-05-27 17:28:43', 4, 2, '2018-05-27 17:29:27', '300', 1),
(9, '2018-05-27 17:28:51', 5, 5, '2018-05-27 17:30:16', '170', 1),
(10, '2018-05-27 17:28:57', 3, 5, '2018-05-27 17:30:27', '33', 1),
(11, '2018-04-09 17:28:57', 3, 5, '2018-04-09 18:28:57', '170', 1),
(15, '2018-05-28 04:42:25', 3, 5, '2018-05-28 12:19:46', '700', 1),
(16, '2018-05-28 12:19:26', 6, 5, '2018-05-28 12:19:26', '100', 0),
(17, '2018-05-29 13:27:07', 3, 3, '2018-05-29 13:27:44', '10', 1),
(18, '2018-05-30 07:23:31', 4, 3, '2018-05-30 07:23:31', '100', 0);

CREATE TABLE `conductores` (
  `idconductor` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellidoP` varchar(30) DEFAULT NULL,
  `apellidoM` varchar(30) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `contrasena` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `conductores` VALUES
(1, 'Pablito', 'Rodrígez', 'Rodrígez', 'ajsfhja@ajlkfj.com', 'dfkjsahfjk'),
(2, 'Rodri', 'Rodrígez', 'Perez', 'sdafat@asdf.com', 'ajksdfbjbk'),
(3, 'Hugo', 'Plata', 'Romero', 'huhsua@hugh.com', 'jadksfk'),
(4, 'Pedro', 'Rodrígez', 'Rodrígez', 'gijiogj@jagji.com', 'asdfhiuoh'),
(5, 'Pedro', 'Goméz', 'Mejia', 'oiuiou@huaihre.com', 'ajfhhuhjhj'),
(6, 'Roberto', 'Mejia', 'Torres', 'ajsdf@jaklfj.com', NULL);

CREATE TABLE `horario` (
  `dia` varchar(10) NOT NULL,
  `horainicio` time NOT NULL,
  `horafin` time NOT NULL,
  `idlinea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `horario` VALUES
('Lunes', '07:00:00', '20:00:00', 1),
('Lunes', '07:00:00', '20:00:00', 2),
('Lunes', '07:00:00', '20:00:00', 3),
('Lunes', '07:00:00', '20:00:00', 4),
('Lunes', '07:00:00', '20:00:00', 5);

CREATE TABLE `lineasautobuses` (
  `idlinea` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `lineasautobuses` VALUES
(1, 'Flecha roja'),
(2, 'Primero de mayo'),
(3, 'Teo'),
(4, 'Aguila'),
(5, 'Caminante');

CREATE TABLE `pagos` (
  `costo` float NOT NULL DEFAULT '12',
  `origen` varchar(30) NOT NULL,
  `destino` varchar(30) NOT NULL,
  `idpasajero` int(11) NOT NULL,
  `idbusconductor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `pagos` VALUES
(12, 'Toluca', 'Tenango', 1, 1),
(12, 'Tenango', 'Toluca', 2, 2),
(8, 'Tenango', 'Toluca', 3, 3),
(9, 'Toluca', 'Tenango', 4, 4),
(9, 'Tenango', 'Toluca', 5, 5);

CREATE TABLE `paradas` (
  `idparadas` int(11) NOT NULL,
  `longitud` float NOT NULL,
  `latitud` float NOT NULL,
  `direccion` varchar(60) NOT NULL DEFAULT 'Desconocido'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `paradas` VALUES
(1, 1.3872, 2.34523, 'Tenango'),
(2, 1.32432, 2.59837, 'Toluca'),
(3, 1.34235, 2.41898, 'Mexicalzingo'),
(4, 1.75929, 2.41236, 'Santiago'),
(5, 1.24355, 2.41234, 'Desconocido');

CREATE TABLE `pasajeros` (
  `idpasajero` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellidoP` varchar(30) DEFAULT NULL,
  `apellidoM` varchar(30) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `contrasena` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `pasajeros` VALUES
(1, 'Roberto', 'Zepeda', 'Constantino', 'rmail@mail.com', 'jfladfklj'),
(2, 'Pablo', 'Juarez', 'Perez', 'pab123@mail.com', 'ksajdflkj'),
(3, 'Luis', 'Gonzalez', 'Mejia', 'lgm250@mail.com', 'asjhdfkjhuie'),
(4, 'Ana', 'Mejia', 'Lopez', 'anita32@mail.com', 'hkvhhfd'),
(5, 'Maria', 'Lopez', 'Juarez', 'mari99@mail.com', 'asjfhhdsf');

CREATE TABLE `reportes` (
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `motivo` varchar(120) NOT NULL,
  `idconductor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `reportes` VALUES
('2018-03-06 04:02:37', 'El conductor conduce muy rapido', 1),
('2018-03-06 04:02:37', 'El conductor conduce muy lento', 1),
('2018-03-06 04:02:37', 'El conductor me trato mal', 1),
('2018-03-06 04:02:37', 'Los asientos estan rotos', 1),
('2018-03-06 04:02:37', 'La ventana esta rota', 1);

CREATE TABLE `rutas` (
  `idruta` int(11) NOT NULL,
  `origen` varchar(30) NOT NULL,
  `destino` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rutas` VALUES
(1, 'Tenango', 'Toluca'),
(2, 'Santiago', 'Toluca'),
(3, 'Calimaya', 'Toluca'),
(4, 'Santiago', 'Tenango'),
(5, 'DF', 'Cuernavaca'),
(6, 'Calimaya', 'Tenango'),
(7, 'Chapultdpdc', 'Toluca');

CREATE TABLE `rutasparadas` (
  `idparadas` int(11) NOT NULL,
  `idruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `rutasparadas` VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1);


ALTER TABLE `administradores`
  ADD PRIMARY KEY (`idAdministrador`),
  ADD KEY `idLinea` (`idLinea`);

ALTER TABLE `autobuses`
  ADD PRIMARY KEY (`Numeroautobus`),
  ADD KEY `idlinea` (`idlinea`),
  ADD KEY `idruta` (`idruta`);

ALTER TABLE `busconductores`
  ADD PRIMARY KEY (`idbusconductor`),
  ADD KEY `Numeroautobus` (`Numeroautobus`),
  ADD KEY `idconductor` (`idconductor`);

ALTER TABLE `conductores`
  ADD PRIMARY KEY (`idconductor`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `horario`
  ADD KEY `idlinea` (`idlinea`);

ALTER TABLE `lineasautobuses`
  ADD PRIMARY KEY (`idlinea`);

ALTER TABLE `pagos`
  ADD KEY `idpasajero` (`idpasajero`),
  ADD KEY `idbusconductor` (`idbusconductor`);

ALTER TABLE `paradas`
  ADD PRIMARY KEY (`idparadas`);

ALTER TABLE `pasajeros`
  ADD PRIMARY KEY (`idpasajero`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `reportes`
  ADD KEY `idconductor` (`idconductor`);

ALTER TABLE `rutas`
  ADD PRIMARY KEY (`idruta`);

ALTER TABLE `rutasparadas`
  ADD KEY `idparadas` (`idparadas`),
  ADD KEY `idruta` (`idruta`);


ALTER TABLE `administradores`
  MODIFY `idAdministrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `autobuses`
  MODIFY `Numeroautobus` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
ALTER TABLE `busconductores`
  MODIFY `idbusconductor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
ALTER TABLE `conductores`
  MODIFY `idconductor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
ALTER TABLE `lineasautobuses`
  MODIFY `idlinea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `paradas`
  MODIFY `idparadas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `pasajeros`
  MODIFY `idpasajero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
ALTER TABLE `rutas`
  MODIFY `idruta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE `administradores`
  ADD CONSTRAINT `administradores_ibfk_1` FOREIGN KEY (`idLinea`) REFERENCES `lineasautobuses` (`idlinea`);

ALTER TABLE `autobuses`
  ADD CONSTRAINT `autobuses_ibfk_1` FOREIGN KEY (`idlinea`) REFERENCES `lineasautobuses` (`idlinea`),
  ADD CONSTRAINT `autobuses_ibfk_2` FOREIGN KEY (`idruta`) REFERENCES `rutas` (`idruta`);

ALTER TABLE `busconductores`
  ADD CONSTRAINT `busconductores_ibfk_1` FOREIGN KEY (`Numeroautobus`) REFERENCES `autobuses` (`Numeroautobus`),
  ADD CONSTRAINT `busconductores_ibfk_2` FOREIGN KEY (`idconductor`) REFERENCES `conductores` (`idconductor`);

ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`idlinea`) REFERENCES `lineasautobuses` (`idlinea`);

ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`idpasajero`) REFERENCES `pasajeros` (`idpasajero`),
  ADD CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`idbusconductor`) REFERENCES `busconductores` (`idbusconductor`);

ALTER TABLE `reportes`
  ADD CONSTRAINT `reportes_ibfk_1` FOREIGN KEY (`idconductor`) REFERENCES `conductores` (`idconductor`);

ALTER TABLE `rutasparadas`
  ADD CONSTRAINT `rutasparadas_ibfk_1` FOREIGN KEY (`idparadas`) REFERENCES `paradas` (`idparadas`),
  ADD CONSTRAINT `rutasparadas_ibfk_2` FOREIGN KEY (`idruta`) REFERENCES `rutas` (`idruta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
