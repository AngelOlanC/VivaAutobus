DELIMITER $$
CREATE FUNCTION miMin(a INT, b INT) RETURNS INT
begin
	return if (a <= b, a, b);
end$$

DELIMITER $$
CREATE FUNCTION miMax(a INT, b INT) RETURNS INT
begin
	return if (a >= b, a, b);
end$$

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

# FUNCIONES Y PROCEDIMIENTOS ALMACENADOS
SET GLOBAL log_bin_trust_function_creators = 1;

DELIMITER $$
# FALTA HACERLA MEJOR, TAL VEZ UN CASE WHEN POR CADA POSIBLE CIUDAD DE ORIGEN Y CIUDAD DE DESTINO
CREATE FUNCTION obtenerPrecio(idViaje INT, ordenCiudadOrigen INT, ordenCiudadDestino INT) RETURNS INT
begin
	return 1000;
end$$

DELIMITER ;

# TODO: SP que inserte viajes, incluyendo cada una de las paradas
