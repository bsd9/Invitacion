import React from "react";
import "../css/Confirmacion.css";

const Confirmacion = () => {
  return (
    <div className="confirmacion">
      <h2>Confirma tu asistencia</h2>
      <a href="https://wa.me/3206684825">
        <button className="whatsapp-btn">Confirmar por WhatsApp</button>
      </a>
    </div>
  );
};

export default Confirmacion;