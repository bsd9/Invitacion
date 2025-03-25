import React, { useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../css/CodigoValidacion.css";

function CodigoValidacion({ onCodigoValido }) {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function validarCodigo() {
    if (!codigo) {
      setError("Por favor, ingresa un código.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const docRef = doc(db, "invitados", codigo);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        onCodigoValido(docSnap.data().numeroEntradas);
      } else {
        setError("Código inválido. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Error al validar el código");
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        />
        <button onClick={validarCodigo} disabled={isLoading}>
          {isLoading ? "Validando..." : "Validar"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        {isLoading && (
          <div className="loading-modal" data-testid="loading-modal">
            <div className="loading-spinner"></div>
            <p>Validando código...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodigoValidacion;