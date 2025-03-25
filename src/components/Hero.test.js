import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from './Hero';

describe('Componente Hero', () => {
  const propsBasicos = {
    fecha: "26.04.2025",
    nombre: "María Fernanda\nSalazar Zuluaga",
    mensaje: "Mensaje de prueba para el hero"
  };

  test('renderiza correctamente con props', () => {
    render(<Hero {...propsBasicos} />);
    
    const fechaElement = screen.getByTestId('hero-fecha');
    expect(fechaElement.textContent).toContain(propsBasicos.fecha);
    
    const nombreElement = screen.getByTestId('hero-nombre');
    expect(nombreElement.textContent).toMatch(/María Fernanda[\s\S]*Salazar Zuluaga/);
    
    expect(screen.getByTestId('hero-mensaje')).toHaveTextContent(propsBasicos.mensaje);
  });

  test('usa valores por defecto cuando no se proporcionan props', () => {
    render(<Hero />);
    
    const fechaElement = screen.getByTestId('hero-fecha');
    expect(fechaElement.textContent).toContain("26.04.2025");
    
    const nombreElement = screen.getByTestId('hero-nombre');
    expect(nombreElement.textContent).toMatch(/María Fernanda[\s\S]*Salazar Zuluaga/);
    
    expect(screen.getByTestId('hero-mensaje')).toBeInTheDocument();
  });

  test('tiene las clases CSS correctas', () => {
    const { container } = render(<Hero {...propsBasicos} />);
    expect(container.querySelector('.hero')).toBeInTheDocument();
    expect(container.querySelector('.date')).toBeInTheDocument();
  });

  test('maneja correctamente el salto de línea en el nombre', () => {
    render(<Hero nombre="Nombre\nApellido" />);
    const nombreElement = screen.getByTestId('hero-nombre');
    expect(nombreElement.textContent).toMatch(/Nombre[\s\S]*Apellido/);
  });

  test('coincide con el snapshot', () => {
    const { asFragment } = render(<Hero {...propsBasicos} />);
    expect(asFragment()).toMatchSnapshot();
  });
});