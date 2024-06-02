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
    
      SELECT
          p1.idViaje AS id_viaje,
          A.marca AS marca_autobus,
          hour(P1.fechaEstimadaLlegada) AS hora_estimada_llegada,
          (P2.numParada - P1.numParada - 1) AS numero_escalas,
          hour(TIMEDIFF(P2.fechaEstimadaLlegada, P1.fechaEstimadaLlegada)) AS horas_estimadas_viaje
      FROM
          Parada P1
          INNER JOIN Parada P2 on P1.idViaje = P2.idViaje AND P1.numParada < P2.numParada
          INNER JOIN Viaje V on P1.idViaje = V.ID
          INNER JOIN Autobus A on V.IdAutobus = A.ID
      WHERE
          date(P1.fechaEstimadaLlegada) = '20240603' AND
          P1.idEstacion = 24 AND 
          P2.idEstacion = 13;