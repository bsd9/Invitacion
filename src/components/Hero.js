import React from "react";
import "../css/Hero.css";

const Hero = ({ fecha = "26.04.2025", nombre = "María Fernanda\nSalazar Zuluaga", mensaje }) => {
  return (
    <div className="hero" data-testid="hero-container">
      <p className="date" data-testid="hero-fecha">
        _________________{fecha}_________________
      </p>
      <br />
      <h1 data-testid="hero-nombre">
        {nombre.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < nombre.split('\n').length - 1 && <br />}
          </React.Fragment>
        ))}
      </h1>
      <br />
      <p data-testid="hero-mensaje">
        {mensaje || `Hoy celebro no solo mis 15 años, sino también cada momento que la vida me ha regalado. 
        Gracias por las experiencias que me han formado, por los aprendizajes, las sonrisas y hasta por los desafíos que me han enseñado a ser más fuerte. 
        Estoy agradecida por todo lo vivido y emocionada por lo que aún está por venir. ¡Gracias, vida, por cada regalo que me has dado!`}
      </p>
    </div>
  );
};

export default Hero;