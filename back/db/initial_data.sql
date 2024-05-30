INSERT INTO Estado (nombre)
VALUES
  ('Aguascalientes'),
  ('Baja California'),
  ('Baja California Sur'),
  ('Campeche'),
  ('Chiapas'),
  ('Chihuahua'),
  ('Coahuila'),
  ('Colima'),
  ('Durango'),
  ('Guanajuato'),
  ('Guerrero'),
  ('Hidalgo'),
  ('Jalisco'),
  ('Estado de Mexico'),
  ('Michoacan'),
  ('Morelos'),
  ('Nayarit'),
  ('Nuevo Leon'),
  ('Oaxaca'),
  ('Puebla'),
  ('Queretaro'),
  ('Quintana Roo'),
  ('San Luis Potosi'),
  ('Sinaloa'),
  ('Sonora'),
  ('Tabasco'),
  ('Tamaulipas'),
  ('Tlaxcala'),
  ('Veracruz'),
  ('Yucatan'),
  ('Zacatecas'),
  ('Ciudad de Mexico');

INSERT INTO Ciudad (IDEstado, nombre)
VALUES
  (1, 'Aguascalientes'),
  (2, 'Mexicali'),
  (3, 'La Paz'),
  (4, 'Campeche'),
  (5, 'Tuxtla Gutierrez'),
  (6, 'Ciudad Juarez'),
  (7, 'Saltillo'),
  (8, 'Colima'),
  (9, 'Victoria Durango'),
  (10, 'Guanajuato'),
  (11, 'Chilpancingo'),
  (12, 'Pachuca'),
  (13, 'Guadalajara'),
  (14, 'Toluca Lerdo'),
  (15, 'Morelia'),
  (16, 'Cuernavaca'),
  (17, 'Tepic'),
  (18, 'Monterrey'),
  (19, 'Oaxaca Juarez'),
  (20, 'Puebla Angeles'),
  (21, 'Santiago Queretaro'),
  (22, 'Chetumal'),
  (23, 'San Luis Potosi'),
  (24, 'Culiacan Rosales'),
  (25, 'Hermosillo'),
  (26, 'Villahermosa'),
  (27, 'Ciudad Victoria'),
  (28, 'Tlaxcala Xicohtencatl'),
  (29, 'Xalapa'),
  (30, 'Merida'),
  (31, 'Zacatecas'),
  (32, 'Ciudad de Mexico');

INSERT INTO Estacion (IDCiudad, nombre)
VALUES
  (1, 'Estacion Central'),
  (2, 'Terminal del Norte'),
  (3, 'Estacion del Sur'),
  (4, 'Terminal de Autobuses Oriente'),
  (5, 'Estacion Central de Autobuses'),
  (6, 'Terminal de Autobuses del Este'),
  (7, 'Estacion de Autobuses Central'),
  (8, 'Terminal del Centro'),
  (9, 'Estacion de Autobuses del Norte'),
  (10, 'Terminal del Sur'),
  (11, 'Estacion Central de Autobuses'),
  (12, 'Terminal de Autobuses del Oeste'),
  (13, 'Estacion del Centro'),
  (14, 'Terminal de Autobuses Central'),
  (15, 'Estacion de Autobuses del Este'),
  (16, 'Terminal del Norte'),
  (17, 'Estacion Central del Sur'),
  (18, 'Terminal de Autobuses del Centro'),
  (19, 'Estacion de Autobuses Central'),
  (20, 'Terminal de Autobuses del Sur'),
  (21, 'Estacion Central del Norte'),
  (22, 'Terminal de Autobuses Este'),
  (23, 'Estacion Central de Autobuses'),
  (24, 'Terminal del Oeste'),
  (25, 'Estacion de Autobuses Centro'),
  (26, 'Terminal de Autobuses Central'),
  (27, 'Estacion del Sur'),
  (28, 'Terminal del Norte'),
  (29, 'Estacion Central'),
  (30, 'Terminal de Autobuses del Centro'),
  (31, 'Estacion de Autobuses Central'),
  (32, 'Terminal del Este');

INSERT INTO Conductor (nombre, email, telefono) VALUES
	('Joaquin Castro Sarmiento', 'genji@JGL.com', '6672607022'),
    ('Gilberto Montoya Lopez', 'gilberto@SDLG.com', '6670702269');

INSERT INTO Autobus (marca) VALUES
	('Pacifico'),
    ('Pacifico'),
    ('Pacifico'),
    ('Pacifico');
    
INSERT INTO Viaje (idConductor, idAutobus) VALUES
	(1, 1),
    (1, 2),
    (2, 1),
    (2, 2);
    
SELECT 
  EN.ID AS estacion_id, 
  E.nombre AS nombre_estado,
  C.nombre AS nombre_ciudad, 
  EN.nombre AS nombre_estacion
FROM 
  Estacion EN 
  INNER JOIN Ciudad C on C.Id = EN.IdCiudad 
  INNER JOIN Estado E on E.id = C.IdEstado;
  select * from Estacion;
#	
select hour('20240603060000');
/*
																									YYYYMMDDHHMMSS
    Columnas
			ID	Estado				Ciudad						Estacion							Hora estimada llegada
            
    Viaje con ID = 1
		1	2 	Baja California 	Mexicali 					Terminal del Norte					20240603060000
		2	24	Sinaloa				Culiacan Rosales			Terminal del Oeste					20240603090000
		3	8 	Colima 				Colima 						Terminal del Centro					20240603120000
		4	13	Jalisco				Guadalajara					Estacion del Centro					20240604050000
		5	12	Hidalgo				Pachuca						Terminal de Autobuses del Oeste		20240604100000
		6	20	Puebla				Puebla Angeles				Terminal de Autobuses del Sur		20240604180000

    Viaje con ID = 2
		1	8	Colima				Colima						Terminal del Centro					20240603080000
		2	12	Hidalgo				Pachuca						Terminal de Autobuses del Oeste		20240603100000
		3	23	San Luis Potosi		San Luis Potosi				Estacion Central de Autobuses		20240603110000
		4	24	Sinaloa				Culiacan Rosales			Terminal del Oeste					20240603130000
		5	28	Tlaxcala			Tlaxcala Xicohtencatl		Terminal del Norte					20240603150000
		6	13	Jalisco				Guadalajara					Estacion del Centro					20240604100000
		7	2 	Baja California 	Mexicali 					Terminal del Norte					20240604180000
	
    Viaje con ID = 3
		1	32	Ciudad de Mexico	Ciudad de Mexico			Terminal del Este					20240603150000
		2	31	Zacatecas			Zacatecas					Estacion de Autobuses Central		20240603190000
		3	19	Oaxaca				Oaxaca Juarez				Estacion de Autobuses Central		20240603230000
		4	24	Sinaloa				Culiacan Rosales			Terminal del Oeste					20240604060000
		5	1	Aguascalientes		Aguascalientes				Estacion Central					20240604100000
		6	18	Nuevo Leon			Monterrey					Terminal de Autobuses del Centro	20240604180000
		7	13	Jalisco				Guadalajara					Estacion del Centro					20240604230000
*/
	
INSERT INTO Parada (idViaje, numParada, idEstacion, fechaEstimadaLlegada) VALUES
	(1, 1, 2, 20240603060000),
    (1, 2, 24, 20240603090000),
    (1, 3, 8, 20240603120000),
    (1, 4, 13, 20240604050000),
	(1, 5, 12, 20240604100000),
	(1, 6, 20, 20240604180000);

INSERT INTO Parada (idViaje, numParada, idEstacion, fechaEstimadaLlegada) VALUES
	(2, 1, 8, 20240603080000),
    (2, 2, 12, 20240603100000),
    (2, 3, 23, 20240603110000),
    (2, 4, 24, 20240603130000),
	(2, 5, 28, 20240603150000),
	(2, 6, 13, 20240604100000),
	(2, 7, 2, 20240604180000);
    
INSERT INTO Parada (idViaje, numParada, idEstacion, fechaEstimadaLlegada) VALUES
	(3, 1, 32, 20240603150000),
    (3, 2, 31, 20240603190000),
    (3, 3, 19, 20240603230000),
    (3, 4, 24, 20240604060000),
	(3, 5, 1, 20240604100000),
	(3, 6, 18, 20240604180000),
	(3, 7, 13, 20240604230000);