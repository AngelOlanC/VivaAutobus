(async function prueba() {
  const response = await fetch("http://localhost:3000/sesion/joseluis");
  const movies = await response.json();
  console.log(movies);
})()
