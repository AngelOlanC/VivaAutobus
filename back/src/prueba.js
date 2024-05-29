const validarSesion = async () => {
  const url = 'http:localhost:4000/sesion/auth'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: 'adsad'
    }
  })

  const jsonResponse = await response.json()
  console.log(jsonResponse)

  // pegar la solicitud al endpoint del backend
}
validarSesion()
