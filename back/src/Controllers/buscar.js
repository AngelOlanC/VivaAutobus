const pool = require('../Model/dbPool')

const buscarViajes = async (req, res) => {
  console.log(`Viaje ${req.params.origen}-${req.params.destino} el dia ${req.params.fecha}`)
  const sqlQuery = `select * from 
                      (select P1.IDViaje as IDViaje from Parada P1 
                      inner join Parada P2 on P1.IDVIaje = P2.IDViaje and P1.NumParada < P2.NumParada
                      where P1.fechaEstimadaLlegada >= @cadenaFecha and 
                      P1.IDEstacion = @Origen and
                      P2.IDEstacion = @Destino) P
                    inner join Viaje V on P.IDViaje = V.ID
                    inner join Autobus A on V.IDAutobus = A.ID;`
  const [row, fields] = await pool.query(sqlQuery)
  // hacer algo con eso
}

module.exports = { buscarViajes }
