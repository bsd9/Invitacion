import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

jest.mock('./firebase');
jest.mock('firebase/firestore');

describe('Integración entre componentes', () => {
  test('flujo completo: validación → entradas → confirmación', async () => {
    getDoc.mockResolvedValueOnce({ 
      exists: () => true,
      data: () => ({ numeroEntradas: 2 })
    });

    render(<App />);
    
    fireEvent.change(screen.getByPlaceholderText('Código'), {
      target: { value: 'codigo-valido' }
    });
    fireEvent.click(screen.getByText('Validar'));
    
    expect(await screen.findByText('Número de entradas asignadas: 2')).toBeInTheDocument();
    
    const confirmButton = screen.getByText('Confirmar por WhatsApp');
    expect(confirmButton).toBeInTheDocument();
  });

  test('flujo con código inválido', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => false });
  
    render(<App />);
    
    fireEvent.change(screen.getByPlaceholderText('Código'), {
      target: { value: 'codigo-invalido' }
    });
    fireEvent.click(screen.getByText('Validar'));
    
    expect(await screen.findByText(/Código inválido/i)).toBeInTheDocument();
    expect(screen.queryByText('Confirmar por WhatsApp')).not.toBeInTheDocument();
  });
});