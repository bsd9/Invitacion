import React from "react";

function Entradas({ cantidadEntradas }) {
  // Conversión segura a número con valor por defecto 0
  const entradas = isNaN(Number(cantidadEntradas)) ? 0 : Number(cantidadEntradas);

  return (
    <div style={{ textAlign: "center", padding: "20px", fontSize: "18px", fontWeight: "bold" }}>
      <p data-testid="entradas-texto">Número de entradas asignadas: {entradas}</p>
    </div>
  );
}

// Valor por defecto explícito
Entradas.defaultProps = {
  cantidadEntradas: 0
};

export default Entradas;