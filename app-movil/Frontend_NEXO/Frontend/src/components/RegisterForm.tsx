import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import '../theme/register.css';
import { User_Account } from '../models/user_account.model';

const RegisterForm: React.FC = () => {
    const history = useHistory();

    const [form, setForm] = useState<User_Account>({
        names: '',
        last_names: '',
        email: '',
        phone: 0,
        username: '',
        password_hash: '',
        role: '',
    });

    const handleChange = (field: keyof User_Account, value: string | number) => {
        setForm({ ...form, [field]: value });
    };

    const handleNavigate = () => {
        history.push('/token');
    };



    return (
        <form className="container-registro">
            <img
                src="/assets/Logo-corhuila.png"
                alt="Logo Corhuila"
                className="logo-registrar"
            />

            <IonItem className="item-register">
                <IonLabel className="label-register" position="floating">Nombres</IonLabel>
                <IonInput
                    className="input-izquierda"
                    type="text"
                    autocomplete="off"
                    value={form.names}
                    onIonChange={e => handleChange('names', e.detail.value!)}
                />
            </IonItem>
            <IonItem className="item-register">
                <IonLabel className="label-register" position="floating">Apellidos</IonLabel>
                <IonInput
                    type="text"
                    autocomplete="off"
                    value={form.last_names}
                    onIonChange={e => handleChange('last_names', e.detail.value!)}
                />
            </IonItem>
            <IonItem className="item-register">
                <IonLabel className="label-register" position="floating">Correo electrónico</IonLabel>
                <IonInput
                    type="email"
                    autocomplete="off"
                    value={form.email}
                    onIonChange={e => handleChange('email', e.detail.value!)}
                />
            </IonItem>
            <IonItem className="item-register">
                <IonLabel className="label-register" position="floating">Teléfono</IonLabel>
                <IonInput
                    type="tel"
                    autocomplete="off"
                    value={form.phone || '+57'}
                    onIonChange={e => handleChange('phone', e.detail.value || '')}
                />
            </IonItem>
            <IonItem className="item-register">
                <IonLabel className="label-register" position="floating">Nombre usuario</IonLabel>
                <IonInput
                    autocomplete="off"
                    value={form.username}
                    onIonChange={e => handleChange('username', e.detail.value!)}
                />
            </IonItem>
            <IonItem className="item-register">
                <IonLabel className="label-register" position="floating">Contraseña</IonLabel>
                <IonInput
                    type="password"
                    autocomplete="off"
                    value={form.password_hash}
                    onIonChange={e => handleChange('password_hash', e.detail.value!)}
                />
            </IonItem>
            <IonItem className="item-register">
                <IonLabel className="label-register" position="floating">Rol</IonLabel>
                <IonInput
                    autocomplete="off"
                    value={form.role}
                    onIonChange={e => handleChange('role', e.detail.value!)}
                />
            </IonItem>
            <div className="boton-verde-registro" onClick={handleNavigate}>
                Registrar
            </div>

        </form>
    );
};

export default RegisterForm;