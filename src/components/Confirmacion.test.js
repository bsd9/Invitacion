import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Confirmacion from './Confirmacion';

describe('Componente Confirmacion', () => {
  test('renderiza correctamente el título y el botón', () => {
    render(<Confirmacion />);
    
    expect(screen.getByText('Confirma tu asistencia')).toBeInTheDocument();
    
    const button = screen.getByText('Confirmar por WhatsApp');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('whatsapp-btn');
  });

  test('el botón redirige al enlace de WhatsApp correcto', () => {
    render(<Confirmacion />);
    
    const link = screen.getByRole('link');
    
    expect(link).toHaveAttribute('href', 'https://wa.me/573206684825');
    
    const button = screen.getByText('Confirmar por WhatsApp');
    expect(link).toContainElement(button);
  });

  test('tiene la estructura de clases CSS correcta', () => {
    const { container } = render(<Confirmacion />);
    
    const confirmacionDiv = container.firstChild;
    expect(confirmacionDiv).toHaveClass('confirmacion');
    
    expect(confirmacionDiv.querySelector('h2')).toBeInTheDocument();
    expect(confirmacionDiv.querySelector('a')).toBeInTheDocument();
  });

  test('el botón es clickeable', async () => {
    const originalOpen = window.open;
    window.open = jest.fn();
    
    render(<Confirmacion />);
    const button = screen.getByText('Confirmar por WhatsApp');
    
    await userEvent.click(button);
    
    expect(window.open).not.toHaveBeenCalled();
    
    window.open = originalOpen;
  });

  test('no hace llamadas de red no esperadas', () => {
    const spy = jest.spyOn(global, 'fetch');
    render(<Confirmacion />);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});