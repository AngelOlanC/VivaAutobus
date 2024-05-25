create database VivaAutobus;

use VivaAutobus;

create table if not exists Autobus(
ID int primary key,
numeroPisos int
);

create table if not exists Conductor(
ID int primary key,
nombre varchar(50),
email nvarchar(50),
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
NumParada int,
IDEstacion int references Estacion(ID),
fechaEstimadaLlegada datetime,
constraint primary key (IDViaje, NumParada),
index i1 (IDEstacion, fechaEstimadaLlegada)
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
ParadaOrigen int,
ParadaDestino int,
numAsiento char,
metodoPago varchar(10),
costo decimal(10, 2),
constraint foreign key (IDViaje, ParadaOrigen) references Parada(IDViaje, NumParada),
constraint foreign key (IDViaje, ParadaDestino) references Parada(IDViaje, NumParada),
index i (IDViaje, ParadaOrigen, ParadaDestino)
);