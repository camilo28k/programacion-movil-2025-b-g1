import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../theme/token.css';

const TokenForm: React.FC = () => {
  const history = useHistory();

  const [token, setToken] = useState<string[]>(Array(6).fill(''));

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // solo números

    const newToken = [...token];
    newToken[index] = value.slice(-1); // solo un dígito
    setToken(newToken);

    // foco al siguiente input
    if (value && index < 5) {
      const nextInput = document.getElementById(`token-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !token[index] && index > 0) {
      // borrar y mover foco al input anterior
      const prevInput = document.getElementById(`token-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleConfirm = () => {
    const enteredToken = token.join('');
    console.log('Token ingresado:', enteredToken);
    history.push('/login'); // redirigir
  };

  return (
    <div className="container-token">
      {/* Logo */}
      <img src="/assets/Logo-corhuila.png" alt="Logo Corhuila" className="logo-token" />

      {/* Texto */}
      <p className="token-text">POR FAVOR, INGRESE EL TOKEN DE VERIFICACIÓN</p>

      {/* Inputs */}
      <div className="token-inputs">
        {token.map((value, index) => (
          <div key={index} className="token-oval">
            <input
              id={`token-${index}`}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="token-input"
              autoComplete="off"  
            />
          </div>
        ))}
      </div>

      {/* Botón confirmar */}
      <button className="boton-verde-token" onClick={handleConfirm}>
        Confirmar
      </button>
    </div>
  );
};

export default TokenForm;
