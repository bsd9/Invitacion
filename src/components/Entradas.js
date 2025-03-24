import React from "react";

function Entradas({ cantidadEntradas }) {
  return (
    <div style={{ textAlign: "center", padding: "20px", fontSize: "18px", fontWeight: "bold" }}>
      <p>Número de entradas asignadas: {cantidadEntradas}</p>
    </div>
  );
}

export default Entradas;