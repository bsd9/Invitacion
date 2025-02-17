import React from "react";
import "../css/Detalles.css";

const Detalles = ({ fecha, ubicacion, link, icono, titulo, hora }) => {
  return (
    <div className="detalles">
      <div className="icono">
        <img src={icono} alt="Icono" />
      </div>
      <h1>{titulo}</h1>
      <h2>Día</h2>
      <h3>{fecha}</h3>
      <h3>Hora: {hora}</h3>
      <h2>Lugar</h2>
      <h3>{ubicacion}</h3>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button>Ver Ubicación</button>
      </a>
    </div>
  );
};

export default Detalles;