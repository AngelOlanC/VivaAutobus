import { useRef } from "react"

const LoginForm = () => {
  const inputRef = useRef()
  
  const login = (event) => {
    alert(inputRef.current.value)
    event.preventDefault()
  }

  return (
    <form onSubmit={login}>
      <p>Usuario</p>
      <input type="text" id="user" ref={inputRef} name="usuario" />
      <p>Contrasena</p>
      <input type="password" id="pw" ref={inputRef} name="contrasena" />
      <br></br>
      <button type="submit">Submit</button>
    </form>
  )
}

export default LoginForm