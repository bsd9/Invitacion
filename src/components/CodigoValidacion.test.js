import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CodigoValidacion from './CodigoValidacion';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

jest.mock('../firebase', () => ({
  db: {}
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn()
}));

describe('Componente CodigoValidacion', () => {
  const mockOnCodigoValido = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza correctamente', () => {
    render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
    
    expect(screen.getByText('Ingresa tu código de invitación')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Código')).toBeInTheDocument();
    expect(screen.getByText('Validar')).toBeInTheDocument();
  });

  test('muestra error cuando el código está vacío', async () => {
    render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
    
    fireEvent.click(screen.getByText('Validar'));
    
    expect(await screen.findByText('Por favor, ingresa un código.')).toBeInTheDocument();
    expect(mockOnCodigoValido).not.toHaveBeenCalled();
  });

  test('muestra error cuando el código es inválido', async () => {
    getDoc.mockResolvedValueOnce({ exists: () => false });
    
    render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
    
    fireEvent.change(screen.getByPlaceholderText('Código'), {
      target: { value: 'codigo-invalido' }
    });
    fireEvent.click(screen.getByText('Validar'));
    
    expect(await screen.findByText('Código inválido. Inténtalo de nuevo.')).toBeInTheDocument();
    expect(mockOnCodigoValido).not.toHaveBeenCalled();
    expect(doc).toHaveBeenCalledWith(db, 'invitados', 'codigo-invalido');
    expect(getDoc).toHaveBeenCalled();
  });

  test('llama a onCodigoValido cuando el código es válido', async () => {
    const mockData = { numeroEntradas: 2 };
    getDoc.mockResolvedValueOnce({ 
      exists: () => true,
      data: () => mockData
    });
    
    render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
    
    fireEvent.change(screen.getByPlaceholderText('Código'), {
      target: { value: 'codigo-valido' }
    });
    fireEvent.click(screen.getByText('Validar'));
    
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(mockOnCodigoValido).toHaveBeenCalledWith(2);
    expect(doc).toHaveBeenCalledWith(db, 'invitados', 'codigo-valido');
    expect(getDoc).toHaveBeenCalled();
    expect(screen.queryByText(/inválido/)).not.toBeInTheDocument();
  });

  test('flujo completo de validación con interacción de usuario', async () => {
    render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
    
    await userEvent.type(screen.getByPlaceholderText('Código'), 'codigo-valido');
    
    getDoc.mockResolvedValueOnce({ 
      exists: () => true,
      data: () => ({ numeroEntradas: 2 })
    });
    
    await userEvent.click(screen.getByText('Validar'));
    
    await waitFor(() => {
      expect(mockOnCodigoValido).toHaveBeenCalledWith(2);
    });
    
    expect(screen.queryByText(/inválido/)).not.toBeInTheDocument();
  });

  test('muestra estado de carga durante validación', async () => {
    getDoc.mockImplementationOnce(() => new Promise(() => {})); 
    
    render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
    fireEvent.change(screen.getByPlaceholderText('Código'), {
      target: { value: 'codigo' }
    });
    fireEvent.click(screen.getByText('Validar'));
    
    expect(await screen.findByText('Validando...')).toBeInTheDocument();
  });
});