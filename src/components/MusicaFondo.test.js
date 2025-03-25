import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import MusicaFondo from './MusicaFondo';

describe('MusicaFondo', () => {
  let originalConsoleError;
  let mockPlay;
  let mockPause;

  beforeEach(() => {
    originalConsoleError = console.error;
    console.error = jest.fn();
    
    mockPlay = jest.fn().mockImplementation(() => Promise.resolve());
    mockPause = jest.fn();
    
    window.HTMLMediaElement.prototype.play = mockPlay;
    window.HTMLMediaElement.prototype.pause = mockPause;
  });

  afterEach(() => {
    console.error = originalConsoleError;
    jest.clearAllMocks();
  });

  it('renderiza correctamente el botón de música', () => {
    const { getByRole } = render(<MusicaFondo />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('▶');
  });

  it('cambia el ícono del botón al hacer clic', async () => {
    const { getByRole } = render(<MusicaFondo />);
    const button = getByRole('button');
    
    await act(async () => {
      fireEvent.click(button);
    });
    expect(button.textContent).toBe('⏸');
    
    await act(async () => {
      fireEvent.click(button);
    });
    expect(button.textContent).toBe('▶');
  });

  it('llama a play y pause del audio correctamente', async () => {
    const { getByRole } = render(<MusicaFondo />);
    const button = getByRole('button');
    
    await act(async () => {
      fireEvent.click(button);
    });
    expect(mockPlay).toHaveBeenCalledTimes(1);
    
    await act(async () => {
      fireEvent.click(button);
    });
    expect(mockPause).toHaveBeenCalledTimes(1);
  });

  it('inicia la reproducción al hacer clic en el body', async () => {
    render(<MusicaFondo />);
    
    await act(async () => {
      fireEvent.click(document.body);
    });
    
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('no reproduce música si ya está reproduciendo', async () => {
    render(<MusicaFondo />);
    
    await act(async () => {
      fireEvent.click(document.body);
    });
    expect(mockPlay).toHaveBeenCalledTimes(1);
    
    await act(async () => {
      fireEvent.click(document.body);
    });
    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  it('maneja errores de reproducción correctamente', async () => {
    mockPlay.mockImplementation(() => Promise.reject(new Error('Error de reproducción')));
    
    render(<MusicaFondo />);
    
    await act(async () => {
      fireEvent.click(document.body);
    });
    
    expect(console.error).toHaveBeenCalledWith('Error al reproducir el audio:', expect.any(Error));
  });

  it('configura el audio con loop activado', () => {
    const { container } = render(<MusicaFondo />);
    const audio = container.querySelector('audio');
    expect(audio).toHaveAttribute('loop');
  });
});