import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import '../theme/login.css';
import { authService } from '../api/AuthService';


const LoginForm: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 🔥 Lógica de login conectada al backend
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviar credenciales al backend
      const response = await authService.login({ email, password });

      // El backend debe responder con { access_token: '...' }
      const token = response.data.access_token;

      if (token) {
        // Guarda el token para mantener la sesión
        localStorage.setItem('access_token', token);

        console.log('✅ Login exitoso. Token recibido:', token);

        // Redirige a la pantalla principal
        history.push('/home_entrepreneurs');
      } else {
        console.error('❌ No se recibió ningún token del servidor.');
        alert('No se recibió token. Revisa el backend.');
      }
    } catch (error: any) {
      console.error('❌ Error al iniciar sesión:', error.response?.data || error);
      alert('Credenciales incorrectas o error del servidor.');
    }
  };

  const goToRegister = () => {
    history.push('/register');
  };

  return (
    <form className="container-login" onSubmit={handleLogin}>
      {/* Botón Registrarse arriba a la derecha */}
      <div className="register-text-button" onClick={goToRegister}>
        Registrarse
      </div>

      {/* Logo */}
      <img
        src="/assets/Logo-corhuila.png"
        alt="Logo Corhuila"
        className="logo-login"
      />

      {/* Input correo */}
      <IonItem className="login-item">
        <IonLabel className="login-label" position="floating">
          Correo electrónico
        </IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonChange={e => setEmail(e.detail.value!)}
        />
      </IonItem>

      {/* Input contraseña */}
      <IonItem className="login-item">
        <IonLabel className="login-label" position="floating">
          Contraseña
        </IonLabel>
        <IonInput
          type="password"
          value={password}
          onIonChange={e => setPassword(e.detail.value!)}
        />
      </IonItem>

      {/* Botón iniciar sesión */}
      <div className="boton-verde-login" onClick={handleLogin}>
        Iniciar sesión
      </div>
    </form>
  );
};

export default LoginForm;
