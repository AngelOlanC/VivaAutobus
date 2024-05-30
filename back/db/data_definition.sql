CREATE DATABASE VivaAutobus;

USE VivaAutobus;

CREATE TABLE IF NOT EXISTS Autobus(
    ID INT PRIMARY KEY,
    marca VARCHAR(20) 
);

CREATE TABLE IF NOT EXISTS Conductor(
    ID INT PRIMARY KEY,
    nombre VARCHAR(50),
    email VARCHAR(50),
    telefono CHAR(10)
);

CREATE TABLE IF NOT EXISTS Viaje(
    ID INT PRIMARY KEY,
    IDConductor INT REFERENCES Conductor(ID),
    IDAutobus INT REFERENCES Autobus(ID)
);

CREATE TABLE IF NOT EXISTS Estado(
    ID INT PRIMARY KEY,
    nombre VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS Ciudad(
    ID INT PRIMARY KEY,
    IDEstado INT REFERENCES Estado(ID),
    nombre VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS Estacion(
    ID INT PRIMARY KEY,
    IDCiudad INT REFERENCES Ciudad(ID),
    nombre VARCHAR(60)
);

CREATE TABLE IF NOT EXISTS Parada(
    IDViaje INT REFERENCES Viaje(ID),
    NumParada INT,
    IDEstacion INT REFERENCES Estacion(ID),
    fechaEstimadaLlegada DATETIME,
    constraINT PRIMARY KEY (IDViaje, NumParada),
    INDEX i1 (IDEstacion, fechaEstimadaLlegada)
);

CREATE TABLE IF NOT EXISTS Usuario(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombreUsuario VARCHAR(35),
    contrasenaHasheada VARCHAR(75),
    nombres VARCHAR(30),
    apellidos VARCHAR(30),
    CONSTRAINT usuarioUnico UNIQUE(nombreUsuario)
);

CREATE TABLE IF NOT EXISTS Boleto(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    IDUsuario INT,
    IDViaje INT,
    ParadaOrigen INT,
    ParadaDestino INT,
    numAsiento CHAR,
    metodoPago VARCHAR(10),
    costo DECIMAL(10, 2),
    fechaVencimiento DATETIME,
    CONSTRAINT FOREIGN KEY (ID) REFERENCES Usuario(ID),
    CONSTRAINT FOREIGN KEY (IDViaje, ParadaOrigen) REFERENCES Parada(IDViaje, NumParada),
    CONSTRAINT FOREIGN KEY (IDViaje, ParadaDestino) REFERENCES Parada(IDViaje, NumParada),
    INDEX i (IDViaje, ParadaOrigen, ParadaDestino)
);