import React, { useState, useRef, useEffect } from "react";
import Hero from "./components/Hero";
import Detalles from "./components/Detalles";
import Confirmacion from "./components/Confirmacion";
import Vestimenta from "./components/Vestimenta";
import Entradas from "./components/Entradas";
import CodigoValidacion from "./components/CodigoValidacion";
import "./App.css";

function App() {
  const [seccionActiva, setSeccionActiva] = useState(null);
  const [codigoValido, setCodigoValido] = useState(false);
  const [transitionVisible, setTransitionVisible] = useState(false);
  const menuRef = useRef(null);
  const contenidoRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        contenidoRef.current && !contenidoRef.current.contains(event.target)
      ) {
        setSeccionActiva(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleCodigoValido(codigo) {
    setCodigoValido(true);
    setTimeout(() => {
      setTransitionVisible(true);
    }, 150); 
  }

  if (!codigoValido) {
    return (
      <div className={`codigo-container ${codigoValido ? "hidden" : ""}`}>
        <CodigoValidacion onCodigoValido={handleCodigoValido} />
      </div>
    );
  }

  return (
    <div className={`App ${transitionVisible ? "visible" : ""}`}>
      <Hero />
      
      <div className="cards-container">        
        <Detalles 
          titulo="Eucaristia"
          icono="/images/"
          fecha="Sabado 26 de abril de 2025"
          hora="1:00 PM"
          ubicacion="Salón VIP - Casa Samay" 
          link="https://maps.app.goo.gl/otherlink" 
        />

        <Detalles 
          titulo="Recepción"
          icono="/images/"
          fecha="Sabado 26 de abril de 2025"
          hora="8:00 PM"
          ubicacion="Salón de Eventos Casa Samay" 
          link="https://maps.app.goo.gl/Zmr7f5WSxAwQBfVM6" 
        />
      </div>

      <nav ref={menuRef} className="menu">
        <span onClick={() => setSeccionActiva(seccionActiva === "ubicacion" ? null : "ubicacion")}>Ubicación</span>
        <span onClick={() => setSeccionActiva(seccionActiva === "vestimenta" ? null : "vestimenta")}>Vestimenta</span>
        <span onClick={() => setSeccionActiva(seccionActiva === "confirmacion" ? null : "confirmacion")}>Confirmación</span>
      </nav>

      <div 
        ref={contenidoRef} 
        className={`contenido-invitacion ${transitionVisible ? "visible" : ""}`}
      >
        <div className="contenido">
          {seccionActiva === "ubicacion" && <Detalles />}
          {seccionActiva === "vestimenta" && <Vestimenta />}
          {seccionActiva === "confirmacion" && <Confirmacion />}
        </div>
      </div>

      <Entradas />
    </div>
  );
}

export default App;