// TODO

const pagar = async (req, res) => {
  const { username, userId } = req.headers;
  console.log(username, userId)


}

const reservar = async (req, res) => {
  const { username, userId } = req.headers;
  const { idViaje, idOrigen, idDestino } = req.params;
  
  

  console.log(username, userId, idViaje, idOrigen, idDestino)

  res.send({ success: true })
}

module.exports = {
  pagar,
  reservar
}