// src/components/RegisterForm.tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonInput, IonItem, IonLabel, IonToast, IonLoading } from '@ionic/react';
import '../theme/register.css';
import { User_Account } from '../models/user_account.model';
import { authService } from '../api/AuthService';

const RegisterForm: React.FC = () => {
  const history = useHistory();

  const [form, setForm] = useState<User_Account>({
    first_names: '',
    last_names: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    name_rol: 'Emprendedor',
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof User_Account, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setLoading(true);
    try {
      const response = await authService.register(form);
      console.log('✅ Registro exitoso:', response.data);

      // 🧠 Guardar el teléfono del usuario registrado
      if (form.phone) {
        localStorage.setItem('user_phone', form.phone);
      }

      setToastMessage('Usuario registrado con éxito');
      setShowToast(true);

      setTimeout(() => {
        history.push({
          pathname: '/token',
          state: { email: form.email },
        });
      }, 2000);
    } catch (error: any) {
      console.error('❌ Error en el registro:', error);
      const msg =
        error.response?.data?.message ||
        'No se pudo completar el registro. Verifica los datos e intenta de nuevo.';
      setToastMessage(msg);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="container-registro" onSubmit={handleRegister}>
      <img
        src="/assets/Logo-corhuila.png"
        alt="Logo Corhuila"
        className="logo-registrar"
      />

      <IonItem className="item-register">
        <IonLabel className="label-register" position="floating">
          Nombres
        </IonLabel>
        <IonInput
          className="input-izquierda"
          type="text"
          autocomplete="off"
          value={form.first_names}
          onIonInput={(e) => handleChange('first_names', e.detail.value ?? '')}
        />
      </IonItem>

      <IonItem className="item-register">
        <IonLabel className="label-register" position="floating">
          Apellidos
        </IonLabel>
        <IonInput
          type="text"
          autocomplete="off"
          value={form.last_names}
          onIonInput={(e) => handleChange('last_names', e.detail.value ?? '')}
        />
      </IonItem>

      <IonItem className="item-register">
        <IonLabel className="label-register" position="floating">
          Correo electrónico
        </IonLabel>
        <IonInput
          type="email"
          autocomplete="off"
          value={form.email}
          onIonInput={(e) => handleChange('email', e.detail.value ?? '')}
        />
      </IonItem>

      <IonItem className="item-register">
        <IonLabel className="label-register" position="floating">
          Teléfono
        </IonLabel>
        <IonInput
          type="tel"
          autocomplete="off"
          value={form.phone}
          onIonInput={(e) => handleChange('phone', e.detail.value ?? '')}
        />
      </IonItem>

      <IonItem className="item-register">
        <IonLabel className="label-register" position="floating">
          Nombre usuario
        </IonLabel>
        <IonInput
          autocomplete="off"
          value={form.username}
          onIonInput={(e) => handleChange('username', e.detail.value ?? '')}
        />
      </IonItem>

      <IonItem className="item-register">
        <IonLabel className="label-register" position="floating">
          Contraseña
        </IonLabel>
        <IonInput
          type="password"
          autocomplete="off"
          value={form.password}
          onIonInput={(e) => handleChange('password', e.detail.value ?? '')}
        />
      </IonItem>

      <IonItem className="item-register">
        <IonLabel className="label-register" position="floating">
          Rol
        </IonLabel>

        <select
          className="role-select"
          value={form.name_rol}
          onChange={(e) =>
            handleChange('name_rol', e.target.value as 'Emprendedor' | 'Comprador')
          }
        >
          <option value="Comprador">Comprador</option>
          <option value="Emprendedor">Emprendedor</option>
        </select>
      </IonItem>

      <button type="submit" className="boton-verde-registro">
        Registrar
      </button>

      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2500}
        color={toastMessage.includes('éxito') ? 'success' : 'danger'}
        onDidDismiss={() => setShowToast(false)}
      />

      <IonLoading
        isOpen={loading}
        message="Registrando usuario..."
        spinner="crescent"
      />
    </form>
  );
};

export default RegisterForm;
