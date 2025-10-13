import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import '../theme/login.css';

const LoginForm: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    history.push('/home'); // o la ruta que desees tras iniciar sesión
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
        <IonLabel className="login-label" position="floating">Correo electrónico</IonLabel>
        <IonInput
          type="email"
          value={email}
          onIonChange={e => setEmail(e.detail.value!)}
        />
      </IonItem>

      {/* Input contraseña */}
      <IonItem className="login-item">
        <IonLabel className="login-label" position="floating">Contraseña</IonLabel>
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
