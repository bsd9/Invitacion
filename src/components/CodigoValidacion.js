import React, { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../css/CodigoValidacion.css";

function CodigoValidacion({ onCodigoValido }) {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  async function validarCodigo() {
    if (!codigo) {
      setError("Por favor, ingresa un código.");
      return;
    }

    const docRef = doc(db, "invitados", codigo);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      onCodigoValido(docSnap.data().numeroEntradas);
    } else {
      setError("Código inválido. Inténtalo de nuevo.");
    }
  }

  return (
    <div className="codigo-container">
      <div className="codigo-form">
        <h2>Ingresa tu código de invitación</h2>
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código"
        />
        <button onClick={validarCodigo}>Validar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default CodigoValidacion;