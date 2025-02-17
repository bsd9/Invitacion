import React, { useState } from "react";

function Entradas() {
  const [cantidadEntradas, setCantidadEntradas] = useState(2); // Número predeterminado de entradas

  return (
    <div style={{ textAlign: "center", padding: "20px", fontSize: "18px", fontWeight: "bold" }}>
      <p>Número de entradas asignadas: {cantidadEntradas}</p>
    </div>
  );
}

export default Entradas;