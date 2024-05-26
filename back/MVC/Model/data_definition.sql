create database VivaAutobus;

use VivaAutobus;

create table if not exists Autobus(
ID int primary key,
numeroPisos int
);

create table if not exists Conductor(
ID int primary key,
nombre varchar(50),
email varchar(50),
telefono char(10)
);

create table if not exists Viaje(
ID int primary key,
IDConductor int references Conductor(ID),
IDAutobus int references Autobus(ID)
);

create table if not exists Estado(
ID int primary key,
nombre varchar(30)
);

create table if not exists Ciudad(
ID int primary key,
IDEstado int references Estado(ID),
nombre varchar(30)
);

create table if not exists Estacion(
ID int primary key,
IDCiudad int references Ciudad(ID),
nombre varchar(30)
);

create table if not exists Parada(
IDViaje int references Viaje(ID),
NumParada tinyint,
IDEstacion int references Estacion(ID),
fechaEstimadaLlegada datetime,
constraint primary key (IDViaje, NumParada)
);

create table if not exists Usuario(
ID int primary key,
nombre varchar(30),
apellidos varchar(30),
fechaNacimiento date
);

create table if not exists Boleto(
ID int primary key,
IDUsuario int references Usuario(ID),
IDViaje int,
ParadaOrigen tinyint,
ParadaDestino tinyint,
asiento tinyint,
metodoPago varchar(10),
costo int,
fechaVencimiento datetime,
constraint foreign key (IDViaje, ParadaOrigen) references Parada(IDViaje, NumParada),
constraint foreign key (IDViaje, ParadaDestino) references Parada(IDViaje, NumParada),
index (fechaVencimiento)
);

-- TODO: Procedimientos almacenados para insertar datos. O, una solución más sencilla es
-- generar datos por medio de una IA, necesarios para realizar pruebas


SET GLOBAL event_scheduler = ON;

DELIMITER //
CREATE PROCEDURE eliminarBoletosVencidos()
BEGIN
	delete from Boleto
    where fechaVencimiento >= NOW();
	
END //
DELIMITER ;

DELIMITER //
CREATE EVENT eventoEliminarBoletosVencidos
ON SCHEDULE EVERY 5 MINUTE
DO
    CALL eliminarBoletosVencidos();
DELIMITER ;

