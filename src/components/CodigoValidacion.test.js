import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CodigoValidacion from './CodigoValidacion';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// Mocks para Firebase
jest.mock('../firebase', () => ({
  db: {}
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn()
}));

describe('Componente CodigoValidacion', () => {
  const mockOnCodigoValido = jest.fn();
  let user;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnCodigoValido.mockClear();
    user = userEvent.setup();
  });

  describe('Renderizado inicial', () => {
    it('renderiza correctamente los elementos principales', () => {
      render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
      
      expect(screen.getByText('Ingresa tu código de invitación')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Código')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Validar' })).toBeInTheDocument();
    });

    it('no muestra mensajes de error inicialmente', () => {
      render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
      expect(screen.queryByText(/Por favor|inválido|Error/i)).not.toBeInTheDocument();
    });
  });

  describe('Validación de formulario', () => {
    it('muestra error cuando se intenta validar sin código', async () => {
      render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
      
      await act(async () => {
        await user.click(screen.getByRole('button', { name: 'Validar' }));
      });
      
      expect(await screen.findByText('Por favor, ingresa un código.')).toBeInTheDocument();
      expect(mockOnCodigoValido).not.toHaveBeenCalled();
    });

    it('permite escribir en el input', async () => {
      render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
      const input = screen.getByPlaceholderText('Código');
      
      await act(async () => {
        await user.type(input, 'ABC123');
      });
      
      expect(input).toHaveValue('ABC123');
    });
  });

  describe('Comportamiento durante la validación', () => {
    it('muestra estado de carga al validar', async () => {
      getDoc.mockImplementationOnce(() => new Promise(() => {})); // Simula carga prolongada
      
      render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
      
      await act(async () => {
        await user.type(screen.getByPlaceholderText('Código'), 'codigo-valido');
        await user.click(screen.getByRole('button', { name: 'Validar' }));
      });
      
      expect(screen.getByRole('button', { name: 'Validando...' })).toBeDisabled();
    });

    it('deshabilita el input durante la validación', async () => {
      getDoc.mockImplementationOnce(() => new Promise(() => {}));
      
      render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
      const input = screen.getByPlaceholderText('Código');
      
      await act(async () => {
        await user.type(input, 'codigo-valido');
        await user.click(screen.getByRole('button', { name: 'Validar' }));
      });
      
      expect(input).toBeDisabled();
    });
  });

  describe('Resultados de validación', () => {
    it('llama a onCodigoValido con el número de entradas cuando el código es válido', async () => {
      const mockData = { numeroEntradas: 2 };
      getDoc.mockResolvedValueOnce({ 
        exists: () => true,
        data: () => mockData
      });
      
      render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
      
      await act(async () => {
        await user.type(screen.getByPlaceholderText('Código'), 'codigo-valido');
        await user.click(screen.getByRole('button', { name: 'Validar' }));
      });
      
      await waitFor(() => {
        expect(mockOnCodigoValido).toHaveBeenCalledWith(2);
      });
      expect(screen.queryByText(/inválido/)).not.toBeInTheDocument();
    });

    it('muestra error cuando el código es inválido', async () => {
      getDoc.mockResolvedValueOnce({ exists: () => false });
      
      render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
      
      await act(async () => {
        await user.type(screen.getByPlaceholderText('Código'), 'codigo-invalido');
        await user.click(screen.getByRole('button', { name: 'Validar' }));
      });
      
      expect(await screen.findByText('Código inválido. Inténtalo de nuevo.')).toBeInTheDocument();
      expect(mockOnCodigoValido).not.toHaveBeenCalled();
    });

    it('muestra error de conexión cuando falla la petición', async () => {
      getDoc.mockRejectedValueOnce(new Error('Error de red'));
      
      render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
      
      await user.type(screen.getByPlaceholderText('Código'), 'codigo-error');
      await user.click(screen.getByRole('button', { name: 'Validar' }));
      
      expect(await screen.findByText('Error al conectar con el servidor')).toBeInTheDocument();
    });
  });

  describe('Limpieza después de la validación', () => {
    it('restaura el estado inicial después de una validación exitosa', async () => {
      getDoc.mockResolvedValueOnce({ exists: () => true, data: () => ({ numeroEntradas: 2 }) });
      
      const { rerender } = render(<CodigoValidacion onCodigoValido={mockOnCodigoValido} />);
      const input = screen.getByPlaceholderText('Código');
      const button = screen.getByRole('button', { name: 'Validar' });
      
      await user.type(input, 'codigo-valido');
      await user.click(button);
      
      await waitFor(() => {
        expect(mockOnCodigoValido).toHaveBeenCalled();
      });
      
      rerender(<CodigoValidacion onCodigoValido={mockOnCodigoValido} key={Date.now()} />);
      
      expect(input).toHaveValue('');
      expect(button).not.toBeDisabled();
    });
  });
});