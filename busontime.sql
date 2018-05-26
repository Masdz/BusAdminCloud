-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-05-2018 a las 23:32:25
-- Versión del servidor: 10.1.25-MariaDB
-- Versión de PHP: 7.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `busontime`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `autobuses`
--

CREATE TABLE `autobuses` (
  `Numeroautobus` int(11) NOT NULL,
  `placa` varchar(10) NOT NULL,
  `idlinea` int(11) NOT NULL,
  `idruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `autobuses`
--

INSERT INTO `autobuses` (`Numeroautobus`, `placa`, `idlinea`, `idruta`) VALUES
(1, 'ag84521', 1, 1),
(2, 'daf8456', 2, 1),
(3, 'jvu5789', 3, 1),
(4, 'fdx4356', 4, 1),
(5, 'qwi7854', 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `busconductores`
--

CREATE TABLE `busconductores` (
  `idbusconductor` int(11) NOT NULL,
  `fechaHora` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Numeroautobus` int(11) NOT NULL,
  `idconductor` int(11) NOT NULL,
  `fechaHoraLlegada` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `recolectado` decimal(10,0) DEFAULT '100',
  `terminado` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `busconductores`
--

INSERT INTO `busconductores` (`idbusconductor`, `fechaHora`, `Numeroautobus`, `idconductor`, `fechaHoraLlegada`, `recolectado`, `terminado`) VALUES
(1, '2018-03-06 04:02:37', 1, 1, '2018-05-26 02:14:16', '250', 1),
(2, '2018-03-06 04:32:37', 2, 2, '2018-05-26 01:34:25', '0', 0),
(3, '2018-03-06 05:02:37', 3, 3, '2018-05-26 01:34:25', '0', 0),
(4, '2018-03-06 05:32:37', 4, 4, '2018-05-26 01:34:25', '0', 0),
(5, '2018-03-05 19:02:37', 5, 5, '2018-05-26 01:34:25', '0', 0),
(6, '2018-05-26 01:39:39', 1, 1, '2018-05-26 01:39:39', '100', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductores`
--

CREATE TABLE `conductores` (
  `idconductor` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellidoP` varchar(30) DEFAULT NULL,
  `apellidoM` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `conductores`
--

INSERT INTO `conductores` (`idconductor`, `nombre`, `apellidoP`, `apellidoM`) VALUES
(1, 'Pablo', 'Rodrígez', 'Rodrígez'),
(2, 'Marta', 'Rodrígez', 'Rodrígez'),
(3, 'Hugo', 'Plata', 'Romero'),
(4, 'Pedro', 'Rodrígez', 'Rodrígez'),
(5, 'Pedro', 'Goméz', 'Mejia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `dia` varchar(10) NOT NULL,
  `horainicio` time NOT NULL,
  `horafin` time NOT NULL,
  `idlinea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`dia`, `horainicio`, `horafin`, `idlinea`) VALUES
('Lunes', '07:00:00', '20:00:00', 1),
('Lunes', '07:00:00', '20:00:00', 2),
('Lunes', '07:00:00', '20:00:00', 3),
('Lunes', '07:00:00', '20:00:00', 4),
('Lunes', '07:00:00', '20:00:00', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lineasautobuses`
--

CREATE TABLE `lineasautobuses` (
  `idlinea` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `lineasautobuses`
--

INSERT INTO `lineasautobuses` (`idlinea`, `nombre`) VALUES
(1, 'Flecha roja'),
(2, 'Primero de mayo'),
(3, 'Teo'),
(4, 'Aguila'),
(5, 'Caminante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `costo` float NOT NULL DEFAULT '12',
  `origen` varchar(30) NOT NULL,
  `destino` varchar(30) NOT NULL,
  `idpasajero` int(11) NOT NULL,
  `idbusconductor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`costo`, `origen`, `destino`, `idpasajero`, `idbusconductor`) VALUES
(12, 'Toluca', 'Tenango', 1, 1),
(12, 'Tenango', 'Toluca', 2, 2),
(8, 'Tenango', 'Toluca', 3, 3),
(9, 'Toluca', 'Tenango', 4, 4),
(9, 'Tenango', 'Toluca', 5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paradas`
--

CREATE TABLE `paradas` (
  `idparadas` int(11) NOT NULL,
  `longitud` float NOT NULL,
  `latitud` float NOT NULL,
  `direccion` varchar(60) NOT NULL DEFAULT 'Desconocido'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `paradas`
--

INSERT INTO `paradas` (`idparadas`, `longitud`, `latitud`, `direccion`) VALUES
(1, 1.3872, 2.34523, 'Tenango'),
(2, 1.32432, 2.59837, 'Toluca'),
(3, 1.34235, 2.41898, 'Mexicalzingo'),
(4, 1.75929, 2.41236, 'Santiago'),
(5, 1.24355, 2.41234, 'Desconocido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pasajeros`
--

CREATE TABLE `pasajeros` (
  `idpasajero` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellidoP` varchar(30) DEFAULT NULL,
  `apellidoM` varchar(30) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `contrasena` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `pasajeros`
--

INSERT INTO `pasajeros` (`idpasajero`, `nombre`, `apellidoP`, `apellidoM`, `email`, `contrasena`) VALUES
(1, 'Roberto', 'Zepeda', 'Constantino', 'rmail@mail.com', 'jfladfklj'),
(2, 'Pablo', 'Juarez', 'Perez', 'pab123@mail.com', 'ksajdflkj'),
(3, 'Luis', 'Gonzalez', 'Mejia', 'lgm250@mail.com', 'asjhdfkjhuie'),
(4, 'Ana', 'Mejia', 'Lopez', 'anita32@mail.com', 'hkvhhfd'),
(5, 'Maria', 'Lopez', 'Juarez', 'mari99@mail.com', 'asjfhhdsf');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reportes`
--

CREATE TABLE `reportes` (
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `motivo` varchar(120) NOT NULL,
  `idconductor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `reportes`
--

INSERT INTO `reportes` (`fecha`, `motivo`, `idconductor`) VALUES
('2018-03-06 04:02:37', 'El conductor conduce muy rapido', 1),
('2018-03-06 04:02:37', 'El conductor conduce muy lento', 1),
('2018-03-06 04:02:37', 'El conductor me trato mal', 1),
('2018-03-06 04:02:37', 'Los asientos estan rotos', 1),
('2018-03-06 04:02:37', 'La ventana esta rota', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas`
--

CREATE TABLE `rutas` (
  `idruta` int(11) NOT NULL,
  `origen` varchar(30) NOT NULL,
  `destino` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rutas`
--

INSERT INTO `rutas` (`idruta`, `origen`, `destino`) VALUES
(1, 'Tenango', 'Toluca'),
(2, 'Santiago', 'Toluca'),
(3, 'Calimaya', 'Toluca'),
(4, 'Santiago', 'Tenango'),
(5, 'Df', 'Cuernavaca');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutasparadas`
--

CREATE TABLE `rutasparadas` (
  `idparadas` int(11) NOT NULL,
  `idruta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rutasparadas`
--

INSERT INTO `rutasparadas` (`idparadas`, `idruta`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `autobuses`
--
ALTER TABLE `autobuses`
  ADD PRIMARY KEY (`Numeroautobus`),
  ADD KEY `idlinea` (`idlinea`),
  ADD KEY `idruta` (`idruta`);

--
-- Indices de la tabla `busconductores`
--
ALTER TABLE `busconductores`
  ADD PRIMARY KEY (`idbusconductor`),
  ADD KEY `Numeroautobus` (`Numeroautobus`),
  ADD KEY `idconductor` (`idconductor`);

--
-- Indices de la tabla `conductores`
--
ALTER TABLE `conductores`
  ADD PRIMARY KEY (`idconductor`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD KEY `idlinea` (`idlinea`);

--
-- Indices de la tabla `lineasautobuses`
--
ALTER TABLE `lineasautobuses`
  ADD PRIMARY KEY (`idlinea`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD KEY `idpasajero` (`idpasajero`),
  ADD KEY `idbusconductor` (`idbusconductor`);

--
-- Indices de la tabla `paradas`
--
ALTER TABLE `paradas`
  ADD PRIMARY KEY (`idparadas`);

--
-- Indices de la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  ADD PRIMARY KEY (`idpasajero`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD KEY `idconductor` (`idconductor`);

--
-- Indices de la tabla `rutas`
--
ALTER TABLE `rutas`
  ADD PRIMARY KEY (`idruta`);

--
-- Indices de la tabla `rutasparadas`
--
ALTER TABLE `rutasparadas`
  ADD KEY `idparadas` (`idparadas`),
  ADD KEY `idruta` (`idruta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `autobuses`
--
ALTER TABLE `autobuses`
  MODIFY `Numeroautobus` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `busconductores`
--
ALTER TABLE `busconductores`
  MODIFY `idbusconductor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `conductores`
--
ALTER TABLE `conductores`
  MODIFY `idconductor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `lineasautobuses`
--
ALTER TABLE `lineasautobuses`
  MODIFY `idlinea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `paradas`
--
ALTER TABLE `paradas`
  MODIFY `idparadas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `pasajeros`
--
ALTER TABLE `pasajeros`
  MODIFY `idpasajero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `rutas`
--
ALTER TABLE `rutas`
  MODIFY `idruta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `autobuses`
--
ALTER TABLE `autobuses`
  ADD CONSTRAINT `autobuses_ibfk_1` FOREIGN KEY (`idlinea`) REFERENCES `lineasautobuses` (`idlinea`),
  ADD CONSTRAINT `autobuses_ibfk_2` FOREIGN KEY (`idruta`) REFERENCES `rutas` (`idruta`);

--
-- Filtros para la tabla `busconductores`
--
ALTER TABLE `busconductores`
  ADD CONSTRAINT `busconductores_ibfk_1` FOREIGN KEY (`Numeroautobus`) REFERENCES `autobuses` (`Numeroautobus`),
  ADD CONSTRAINT `busconductores_ibfk_2` FOREIGN KEY (`idconductor`) REFERENCES `conductores` (`idconductor`);

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`idlinea`) REFERENCES `lineasautobuses` (`idlinea`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`idpasajero`) REFERENCES `pasajeros` (`idpasajero`),
  ADD CONSTRAINT `pagos_ibfk_2` FOREIGN KEY (`idbusconductor`) REFERENCES `busconductores` (`idbusconductor`);

--
-- Filtros para la tabla `reportes`
--
ALTER TABLE `reportes`
  ADD CONSTRAINT `reportes_ibfk_1` FOREIGN KEY (`idconductor`) REFERENCES `conductores` (`idconductor`);

--
-- Filtros para la tabla `rutasparadas`
--
ALTER TABLE `rutasparadas`
  ADD CONSTRAINT `rutasparadas_ibfk_1` FOREIGN KEY (`idparadas`) REFERENCES `paradas` (`idparadas`),
  ADD CONSTRAINT `rutasparadas_ibfk_2` FOREIGN KEY (`idruta`) REFERENCES `rutas` (`idruta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
