import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../theme/token.css';
import { authService } from '../api/AuthService';

const TokenForm: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ email?: string }>();

  const email = location.state?.email || '';

  const [token, setToken] = useState<string[]>(Array(6).fill(''));
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Cronómetro
  const [timeLeft, setTimeLeft] = useState<number>(60); // 1 minuto
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Inicia o reinicia el cronómetro
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(60);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // solo números

    const newToken = [...token];
    newToken[index] = value.slice(-1);
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
      const response = await authService.verifyToken({ email, token: enteredToken });
      setSuccessMessage(response.data.message || 'Cuenta verificada con éxito 🎉');
      setErrorMessage(null);

      setTimeout(() => history.push('/login'), 2000);
    } catch (err: any) {
      console.error('❌ Error al verificar token:', err);
      const backendMsg =
        err.response?.data?.message || 'No se pudo verificar el token. Intente de nuevo.';
      setErrorMessage(backendMsg);
      setSuccessMessage(null);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setErrorMessage('No se pudo reenviar el token. Email no disponible.');
      return;
    }

    try {
      await authService.resendToken(email);
      setSuccessMessage('Se ha reenviado un nuevo token 🎉');
      setErrorMessage(null);
      startTimer(); // reinicia cronómetro
    } catch (err: any) {
      console.error('❌ Error al reenviar token:', err);
      const backendMsg =
        err.response?.data?.message || 'No se pudo reenviar el token. Intente nuevamente.';
      setErrorMessage(backendMsg);
      setSuccessMessage(null);
    }
  };

  // Formato mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
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

      {/* Cronómetro */}
      <p className="timer-text">Tiempo restante: {formatTime(timeLeft)}</p>

      {errorMessage && <p className="error-text">{errorMessage}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}

      <button className="boton-verde-token" onClick={handleConfirm}>
        Confirmar
      </button>

      <p className="resend-text" onClick={handleResend} style={{ cursor: 'pointer' }}>
        ¿Reenviar código de verificación?
      </p>
    </div>
  );
};

export default TokenForm;
