CREATE DATABASE VivaAutobus;

USE VivaAutobus;

CREATE TABLE IF NOT EXISTS Usuario(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombreUsuario VARCHAR(35),
    contrasenaHasheada VARCHAR(75),
    nombres VARCHAR(30),
    apellidos VARCHAR(30),
    CONSTRAINT usuarioUnico UNIQUE(nombreUsuario)
);

CREATE TABLE IF NOT EXISTS Estado(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS Ciudad(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idEstado INT REFERENCES Estado(id),
    nombre VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS Estacion(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idCiudad INT REFERENCES Ciudad(id),
    nombre VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS Autobus(
    id INT PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(20) 
);

CREATE TABLE IF NOT EXISTS Conductor(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    email VARCHAR(50),
    telefono CHAR(10)
);

CREATE TABLE IF NOT EXISTS Viaje(
    id INT PRIMARY KEY AUTO_INCREMENT,
    idConductor INT REFERENCES Conductor(id),
    idAutobus INT REFERENCES Autobus(id)
);

CREATE TABLE IF NOT EXISTS Parada(
    idViaje INT REFERENCES Viaje(id),
    NumParada INT,
    idEstacion INT REFERENCES Estacion(id),
    fechaEstimadaLlegada DATETIME,
    constraint PRIMARY KEY (idViaje, NumParada),
    INDEX i1 (idEstacion, fechaEstimadaLlegada)
);

# Falta meter informacion relacionada con el pago de paypal
CREATE TABLE IF NOT EXISTS Orden(
    id INT PRIMARY KEY,
    idViaje INT,
    idUsuario INT,
    ParadaOrigen INT,
    ParadaDestino INT,
    metodoPago VARCHAR(10),
    costo INT,
    fechaExpiracion DATETIME,
    CONSTRAINT FOREIGN KEY (id) REFERENCES Usuario(id),
    CONSTRAINT FOREIGN KEY (idViaje, ParadaOrigen) REFERENCES Parada(idViaje, NumParada),
    CONSTRAINT FOREIGN KEY (idViaje, ParadaDestino) REFERENCES Parada(idViaje, NumParada),
    INDEX indexViaje (idViaje, ParadaOrigen, ParadaDestino),
    INDEX indexUsuario (idUsuario),
    INDEX indexFechaExpiracion(fechaExpiracion)
);

CREATE TABLE IF NOT EXISTS Boleto(
	idOrden INT,
    asiento INT,
	nombre VARCHAR(40),
    apellidoPaterno VARCHAR(40),
    apellidoMaterno VARCHAR(40),
    email VARCHAR(40),
    fechaNacimiento datetime,
    CONSTRAINT PRIMARY KEY (idOrden, asiento),
    CONSTRAINT FOREIGN KEY (idOrden) REFERENCES Orden(id)
);