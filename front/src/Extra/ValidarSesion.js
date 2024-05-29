const validarSesion = async () => {
  if (!('authentication' in localStorage)) {
    alert('a iniciar sesion mamahuevo')
    return false;
  }
  const url = 'http:localhost:4000/sesion/auth'
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      authorization: localStorage.getItem('authentication')
    }
  })

  const jsonResponse = await response.json()
  alert(jsonResponse)

  // pegar la solicitud al endpoint del backend
}

export default validarSesion