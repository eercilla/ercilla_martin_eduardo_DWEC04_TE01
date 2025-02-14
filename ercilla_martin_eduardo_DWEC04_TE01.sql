--
-- Creamos la base de datos: `videojuegos_bd` y la usamos
--


CREATE DATABASE IF NOT EXISTS videojuegos_bd;
USE videojuegos_bd;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videojuego`
--

CREATE TABLE `videojuego` (
  `idjuego` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL UNIQUE,
  `idcompania` int(11) NOT NULL,
  `sistema` varchar(255) NOT NULL,
  `genero` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `videojuego`
--

INSERT INTO `videojuego` (`idjuego`, `titulo`, `idcompania`, `sistema`, `genero`) VALUES
(1, 'Super Mario World', 1, 'Super Nintendo', 'plataformas'),
(2, 'The Legend of Zelda: Ocarina of Time', 1, 'Nintendo 64', 'aventura'),
(3, 'Final Fantasy VII', 9, 'PlayStation', 'RPG'),
(4, 'Sonic the Hedgehog', 4, 'Sega Genesis', 'plataformas'),
(5, 'Metal Gear Solid', 8, 'PlayStation', 'accion'),
(6, 'Street Fighter II', 7, 'Super Nintendo', 'lucha'),
(7, 'Resident Evil 2', 7, 'PlayStation', 'survival horror');


--
-- Estructura de tabla para la tabla `compania`
--

CREATE TABLE `compania` (
  `idcompania` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL UNIQUE,
  `fundacion` DATE NOT NULL,
  `pais` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `compania`
--

INSERT INTO `compania` (`idcompania`, `nombre`, `fundacion`, `pais`) VALUES
(1, 'Nintendo', '1889-09-23', 'Japon'),
(2, 'Sony Interactive Entertainment', '1993-11-16', 'Japón'),
(3, 'Microsoft', '2001-03-13', 'Estados Unidos'),
(4, 'Sega', '1960-06-03', 'Japon'),
(5, 'Electronic Arts', '1982-05-28', 'Estados Unidos'),
(6, 'Ubisoft', '1986-12-15', 'Francia'),
(7, 'Capcom', '1979-06-11', 'Japon'),
(8, 'Konami', '1969-03-21', 'Japon'),
(9, 'Square Enix', '1986-04-01', 'Japón');

--
-- Estructura de tabla para la tabla `consola`
--

CREATE TABLE `consola` (
  `idconsola` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL UNIQUE,
  `lanzamiento` DATE NOT NULL,
  `idcompania` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `consola`
--

INSERT INTO `consola` (`idconsola`, `nombre`, `lanzamiento`, `idcompania`) VALUES
(1, 'Nintendo Entertainment System', '1983-07-15', 1),
(2, 'PlayStation', '1994-12-03', 2),
(3, 'Xbox', '2001-11-15', 3),
(4, 'Sega Genesis', '1988-10-29', 4),
(5, 'Super Nintendo Entertainment System', '1990-11-21', 1),
(6, 'PlayStation 2', '2000-03-04', 2),
(7, 'Nintendo Switch', '2017-03-03', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `videojuego`
--
ALTER TABLE `videojuego`
	ADD PRIMARY KEY (`idjuego`),
	ADD KEY `fk_juego_comp` (`idcompania`);
  
--
-- Indices de la tabla `participante`
--
ALTER TABLE `compania`
	ADD PRIMARY KEY (`idcompania`);
    
-- Indices de la tabla `consola`
--
ALTER TABLE `consola`
	ADD PRIMARY KEY (`idconsola`),
	ADD KEY `fk_cons_comp` (`idcompania`);
    
--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `videojuego`
--
ALTER TABLE `videojuego`
  MODIFY `idjuego` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `compania`
--
ALTER TABLE `compania`
  MODIFY `idcompania` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `consola`
--
ALTER TABLE `consola`
  MODIFY `idconsola` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
  
  --
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `videojuego`
--
ALTER TABLE `videojuego`
  ADD CONSTRAINT `fk_juego_comp` FOREIGN KEY (`idcompania`) REFERENCES `compania` (`idcompania`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `videojuego`
--
ALTER TABLE `consola`
  ADD CONSTRAINT `fk_cons_comp` FOREIGN KEY (`idcompania`) REFERENCES `compania` (`idcompania`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;


