import {validate} from "./database/validationUser.js"
import React from "react";

const Valform =() => {
    return (
        <div id="App">
            <h1>Validación de usuarios</h1>
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
                <button type="button" onClick={() => validate("users", 3772865, "s")}>
                Validar
                </button>
            </form>
        </div>
    );
}

export default Valform();