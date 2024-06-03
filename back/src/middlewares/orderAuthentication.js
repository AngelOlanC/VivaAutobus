const pool = require('../Model/dbPool')

const validarPermisos = async (req, res, next) => {
  const { idOrden } = req.params;
  const { userId } = req.headers;
  console.log(idOrden, userId )
  const sql =
    `
    SELECT
      idUsuario,
      fechaExpiracion,
      (
        CASE
          WHEN fechaExpiracion = '20490101010101' THEN 1
          ELSE 0
        END
      ) AS pagado,
      ( CASE
          WHEN NOW() > fechaExpiracion THEN 1
          ELSE 0
        END
      ) AS vencido
    FROM
      Orden
    WHERE
      id = ${idOrden} and idUsuario = ${userId};
    `
  try {
    console.log("X");
    const [rows, cols] = await pool.promise().query(sql);
    console.log(rows);
    if (rows.length === 0) {
      return res.status(401).send({
        success: 'false',
        message: 'Acceso no autorizado'
      })
    }
    if (rows[0].pagado == 1) {
      return res.status(400).send({
        success: 'false',
        message: 'Orden ya pagada'
      })
    }
    if (rows[0].vencido == 1) {
      return res.status(400).send({
        success: 'false',
        message: 'Orden vencida'
      })
    }
    next();
  } catch(e) {
    return res.status(500).send({
      success: 'false',
      message: 'Server error'
    })
  }
}

module.exports = validarPermisos;