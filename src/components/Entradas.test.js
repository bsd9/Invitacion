import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Entradas from './Entradas';

describe('Componente Entradas', () => {
  test('muestra el número correcto cuando se proporciona un número', () => {
    render(<Entradas cantidadEntradas={5} />);
    const texto = screen.getByTestId('entradas-texto');
    expect(texto.textContent).toBe('Número de entradas asignadas: 5');
  });

  test('muestra 0 cuando no se proporciona la prop', () => {
    render(<Entradas />);
    const texto = screen.getByTestId('entradas-texto');
    expect(texto.textContent).toBe('Número de entradas asignadas: 0');
  });

  test('muestra 0 cuando la prop es undefined', () => {
    render(<Entradas cantidadEntradas={undefined} />);
    const texto = screen.getByTestId('entradas-texto');
    expect(texto.textContent).toBe('Número de entradas asignadas: 0');
  });

  test('muestra 0 cuando la prop es null', () => {
    render(<Entradas cantidadEntradas={null} />);
    const texto = screen.getByTestId('entradas-texto');
    expect(texto.textContent).toBe('Número de entradas asignadas: 0');
  });

  test('muestra 0 cuando la prop es un string no numérico', () => {
    render(<Entradas cantidadEntradas="abc" />);
    const texto = screen.getByTestId('entradas-texto');
    expect(texto.textContent).toBe('Número de entradas asignadas: 0');
  });

  test('muestra el número cuando la prop es string numérico', () => {
    render(<Entradas cantidadEntradas="7" />);
    const texto = screen.getByTestId('entradas-texto');
    expect(texto.textContent).toBe('Número de entradas asignadas: 7');
  });

  test('aplica los estilos correctamente', () => {
    const { container } = render(<Entradas cantidadEntradas={2} />);
    const divContenedor = container.firstChild;
    
    expect(divContenedor).toHaveStyle({
      textAlign: 'center',
      padding: '20px',
      fontSize: '18px',
      fontWeight: 'bold'
    });
  });
});