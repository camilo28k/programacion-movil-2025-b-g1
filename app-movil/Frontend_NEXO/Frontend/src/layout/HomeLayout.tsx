// src/components/HomeLayout.tsx
import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { IonPage } from "@ionic/react";
import { useHistory } from "react-router-dom";
import "../theme/home.css";

interface HomeLayoutProps {
  children: ReactNode;
  backTo?: string;
  heroImageSrc?: string;
  heroImages?: string[];
  heroIntervalMs?: number;
  logoSrc?: string;
  title?: string;
  titleHighlight?: string;
  titleAfter?: string;
  headerAction?: ReactNode;   // <-- 🔹 NUEVO: acción opcional bajo el hero
}

const HomeLayout: React.FC<HomeLayoutProps> = ({
  children,
  backTo,
  heroImageSrc = "/assets/hamburguesa.png",
  heroImages,
  heroIntervalMs = 4000,
  logoSrc,
  title,
  titleHighlight,
  titleAfter,
  headerAction,              // <-- 🔹
}) => {
  const history = useHistory();

  const images = useMemo(
    () => (heroImages && heroImages.length > 0 ? heroImages : [heroImageSrc]),
    [heroImages, heroImageSrc]
  );

  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      const timeout = setTimeout(() => {
        setIndex((p) => (p + 1) % images.length);
        setNextIndex((p) => (p + 1) % images.length);
        setFade(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }, heroIntervalMs);
    return () => clearInterval(interval);
  }, [images.length, heroIntervalMs]);

  const handleBack = () => (backTo ? history.push(backTo) : history.goBack());

  return (
    <IonPage className="home-page">
      <div className="home-shell">
        <div className="home-card">
          {/* HERO */}
          <div className="home-hero">
            <div className="home-heroLayer is-active" style={{ backgroundImage: `url('${images[index]}')` }} />

            <button className="home-backBtn" onClick={handleBack}>
              <svg width="44" height="44" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.35)" />
                <path d="M28 14L18 24L28 34" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={`home-heroLayer ${fade ? "fade-in" : ""}`} style={{ backgroundImage: `url('${images[nextIndex]}')` }} />
            <button className="home-backBtn" onClick={handleBack}>{/* svg aquí */}</button>
            {logoSrc && (
              <div className="home-logoWrap">
                <img className="home-logo" src={logoSrc} alt="Logo" />
              </div>
            )}
          </div>

          {/* 🔹 ACCIÓN OPCIONAL ENTRE HERO Y TÍTULO */}
          {headerAction && <div className="home-actionBar">{headerAction}</div>}

          {/* TÍTULO */}
          {(title || titleHighlight) && (
            <div className="home-titleWrap">
              <h2 className="home-title">
                “{title}{" "}
                {titleHighlight && <span className="home-titleHighlight">{titleHighlight}</span>}{" "}
                {titleAfter && titleAfter}”
              </h2>
            </div>
          )}

          {/* CONTENIDO */}
          <div className="home-content">{children}</div>

          <div className="home-footer" />
        </div>
      </div>
    </IonPage>
  );
};

export default HomeLayout;
