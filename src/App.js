import React, { useState } from "react";
import Hero from "./components/Hero";
import Detalles from "./components/Detalles";
import Confirmacion from "./components/Confirmacion";
import Entradas from "./components/Entradas";
import CodigoValidacion from "./components/CodigoValidacion";
import MusicaFondo from "./components/MusicaFondo";
import Fiesta from "./images/toast_14300331.svg";
import Eucaristia from "./images/cup_8722085.svg";
import "./App.css";

function App() {
  const [codigoValido, setCodigoValido] = useState(false);
  const [transitionVisible, setTransitionVisible] = useState(false);
  const [cantidadEntradas, setCantidadEntradas] = useState(0);

  function handleCodigoValido(entradas) {
    setCodigoValido(true);
    setCantidadEntradas(entradas);
    setTimeout(() => {
      setTransitionVisible(true);
    }, 150);
  }

  if (!codigoValido) {
    return (
      <div className="codigo-container">
        <CodigoValidacion onCodigoValido={handleCodigoValido} />
      </div>
    );
  }

  return (
    <div className={`App ${transitionVisible ? "visible" : ""}`}>
      <MusicaFondo iniciar={codigoValido} />
      <Hero />
      <div className="cards-container">
        <Detalles
          titulo="Eucaristia"
          icono={Eucaristia}
          esVideo={false}
          fecha="Sabado 26 de abril de 2025"
          hora="2:00 PM"
          ubicacion="Capilla Sagrada Familia"
          link="https://maps.app.goo.gl/nZuRTwJb5Jjg3Guz5"
        />
        <Detalles
          titulo="Recepción"
          icono={Fiesta}
          esVideo={false}
          fecha="Sabado 26 de abril de 2025"
          hora="6:00 PM"
          ubicacion="Salón de Eventos Casa Samay"
          link="https://maps.app.goo.gl/Zmr7f5WSxAwQBfVM6"
        />
      </div>
      <Confirmacion />
      <Entradas cantidadEntradas={cantidadEntradas} />
    </div>
  );
}

export default App;