// EnterLayout.tsx
import React, { ReactNode } from 'react';
import { IonPage } from '@ionic/react';

interface EnterLayoutProps {
  children: ReactNode;
  background?: string; // para cambiar dinámicamente la imagen de fondo
}

const EnterLayout: React.FC<EnterLayoutProps> = ({ children, background }) => {
  return (
    <IonPage style={{ background: '#ededed' }}>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        background: '#ededed',
        padding: '16px'
      }}>
        <div style={{
          width: '450px',
          maxWidth: 430,
          minHeight: '99vh',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `url(${background || '/assets/hamburguesa.png'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'rgba(3, 3, 3, 0.3)',
          backgroundBlendMode: 'darken',
          transition: 'background-image 0.5s ease-in-out'
        }}>
          {children}
        </div>
      </div>
    </IonPage>
  );
};

export default EnterLayout;
