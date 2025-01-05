
import React from "react";

const Valform =() => {
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
                <button type="submit" >Ingresar</button>
               
            </form>
        </div>
    );
}

export default Valform;