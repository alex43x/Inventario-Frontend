
import React from "react";
const Valform =() => {
    Validate =()=>{
        // Validar usuario y contraseña
        const id = document.getElementsByName('id')[0].value;
        const password = document.getElementsByName('password')[0].value;
    
        // Buscar el usuario en la lista
        const user = users.find((user) => user.id === id);
    
        if (user) {
          if (user.password === password) {
            alert('Inicio de sesión correcto');
          } else {
            alert('Contraseña incorrecta');
          }
        } else {
          alert('Usuario no encontrado');
        }
    };
    return (
        <div id="App">
            <h1>Inicio de sesión</h1>
            <form>
                <label>
                Usuario:
                <input type="text" name="id" />
                </label>
                <br />
                <label>
                Contraseña:
                <input type="password" name="password" />
                </label>
                <br />
                <button type="submit" onClick={Validate()}>Ingresar</button>
               
            </form>
        </div>
    );
}

export default Valform;