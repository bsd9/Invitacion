import React from 'react';
import { render, screen } from '@testing-library/react';
import Detalles from './Detalles';
import { axe } from 'jest-axe';
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

describe('Componente Detalles', () => {
  const propsBasicos = {
    titulo: 'Mi Evento',
    fecha: '01 de Enero 2023',
    hora: '10:00 AM',
    ubicacion: 'Mi Casa',
    link: 'https://maps.google.com',
    icono: 'icono.png'
  };

  test('renderiza correctamente con props básicos', () => {
    render(<Detalles {...propsBasicos} />);
    
    expect(screen.getByText(propsBasicos.titulo)).toBeInTheDocument();
    expect(screen.getByText(propsBasicos.fecha)).toBeInTheDocument();
    expect(screen.getByText(`Hora: ${propsBasicos.hora}`)).toBeInTheDocument();
    expect(screen.getByText(propsBasicos.ubicacion)).toBeInTheDocument();
    
    const button = screen.getByText('Ver Ubicación');
    expect(button).toBeInTheDocument();
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', propsBasicos.link);
  });

  test('muestra la imagen cuando se proporciona icono', () => {
    render(<Detalles {...propsBasicos} />);
    
    const img = screen.getByAltText('Icono del evento');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', propsBasicos.icono);
  });

  test('no muestra la imagen cuando no se proporciona icono', () => {
    render(<Detalles 
      titulo="Evento Simple" 
      fecha="Hoy" 
      hora="Ahora" 
      ubicacion="Aquí" 
      link="#"
    />);
    
    expect(screen.getByText('Evento Simple')).toBeInTheDocument();
    expect(screen.queryByAltText('Icono del evento')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('tiene la estructura HTML correcta', () => {
    const { container } = render(<Detalles {...propsBasicos} />);
    
    expect(container.firstChild).toHaveClass('detalles');
    
    const headings = container.querySelectorAll('h1, h2, h3');
    expect(headings).toHaveLength(6);
    
    expect(container.querySelector('img')).toBeInTheDocument();
    expect(container.querySelector('a')).toBeInTheDocument();
    expect(container.querySelector('button')).toBeInTheDocument();
  });

  test('es accesible', async () => {
    const { container } = render(<Detalles {...propsBasicos} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});