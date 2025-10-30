import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../theme/token.css';
import { authService } from '../api/AuthService';

const TokenForm: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ email?: string }>();

  // ✅ Obtener el correo desde el registro
  const email = location.state?.email || '';

  const [token, setToken] = useState<string[]>(Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // solo números

    const newToken = [...token];
    newToken[index] = value.slice(-1); // solo un dígito
    setToken(newToken);

    if (value && index < 5) {
      const nextInput = document.getElementById(`token-${index + 1}`) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !token[index] && index > 0) {
      const prevInput = document.getElementById(`token-${index - 1}`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleConfirm = async () => {
    const enteredToken = token.join('');

    try {
      // ✅ Llamar al backend
      const response = await authService.verifyToken({
        email,
        token: enteredToken,
      });

      setSuccessMessage(response.data.message || 'Cuenta verificada con éxito 🎉');
      setErrorMessage(null);

      // Redirigir al login tras 2 segundos
      setTimeout(() => history.push('/login'), 2000);
    } catch (err: any) {
      console.error('❌ Error al verificar token:', err);
      const backendMsg =
        err.response?.data?.message || 'No se pudo verificar el token. Intente de nuevo.';
      setErrorMessage(backendMsg);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="container-token">
      <img src="/assets/Logo-corhuila.png" alt="Logo Corhuila" className="logo-token" />
      <p className="token-text">POR FAVOR, INGRESE EL TOKEN DE VERIFICACIÓN</p>

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

      {errorMessage && <p className="error-text">{errorMessage}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}

      <button className="boton-verde-token" onClick={handleConfirm}>
        Confirmar
      </button>
    </div>
  );
};

export default TokenForm;


