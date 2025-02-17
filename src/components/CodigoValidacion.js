import React, { useState } from "react";
import "../css/CodigoValidacion.css"

function CodigoValidacion({ onCodigoValido }) {
  const [codigo, setCodigo] = useState("");

  function handleCodigoSubmit(e) {
    e.preventDefault();
    onCodigoValido(codigo); // Llama a la función de la prop para validar el código
  }

  return (
    <div className="codigo-container">
      <div className="codigo-form">
        <h2>Ingrese su código de invitación</h2>
        <form onSubmit={handleCodigoSubmit}>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Código de invitación"
          />
          <button type="submit">Validar</button>
        </form>
      </div>
    </div>
  );
}

export default CodigoValidacion;