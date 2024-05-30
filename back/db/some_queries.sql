# Buscar viajes
select EN.nombre as nombre_estacion, C.nombre as nombre_ciudad, E.nombre as nombre_estado 
from Estacion EN 
inner join Ciudad C on C.Id = EN.IdCiudad 
inner join Estado E on E.id = C.IdEstado;

select 
    P1.IDViaje as idViaje, 
    A.marca as marca_autobus, 
    hour(P1.fechaEstimadaLlegada) as hora_estimada_llegada,
    P2.numParada - P1.numParada as numero_escalas,
    timestampdiff(hour, P2.fechaEstimadaLlegada, P1.fechaEstimadaLlegada) as tiempo_estimado_viaje
from 
    Parada P1
    inner join Parada P2 on P1.idviaje = P2.idviaje and P1.numParada < P2.numParada
    inner join Viaje V on P1.idViaje = V.ID
    inner join Autobus A on V.IdAutobus = A.ID;