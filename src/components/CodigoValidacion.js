import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "../css/CodigoValidacion.css";

function CodigoValidacion({ onCodigoValido }) {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Limpieza cuando el componente se desmonta o cuando onCodigoValido cambia
  useEffect(() => {
    return () => {
      setCodigo("");
      setError("");
      setIsLoading(false);
    };
  }, [onCodigoValido]);

  async function validarCodigo() {
    if (!codigo.trim()) {
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
        // Limpiar el campo de código después de una validación exitosa
        setCodigo("");
      } else {
        setError("Código inválido. Inténtalo de nuevo.");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
      console.error("Error validando código:", err);
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
        <button 
          onClick={validarCodigo} 
          disabled={isLoading}
        >
          {isLoading ? "Validando..." : "Validar"}
        </button>
        {error && <p className="error-message">{error}</p>}
        
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