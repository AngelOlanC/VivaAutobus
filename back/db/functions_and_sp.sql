SET GLOBAL log_bin_trust_function_creators = 1;

DELIMITER $$
CREATE FUNCTION miMin(a INT, b INT) RETURNS INT
begin
	return if (a <= b, a, b);
end$$

DELIMITER ;

DELIMITER $$
CREATE FUNCTION miMax(a INT, b INT) RETURNS INT
begin
	return if (a >= b, a, b);
end$$
DELIMITER ;