"use client";
import { useState } from "react";
import styles from "./Features.module.css";

const features = [
  {
    icon: "📍",
    title: "Ubicación en Tiempo Real",
    description:
      "Rastrea a tu mascota en tiempo real con GPS de alta precisión.",
  },
  {
    icon: "📱",
    title: "Código QR Inteligente",
    description:
      "Cualquier persona puede escanear el QR para contactarte si encuentra a tu mascota.",
  },
  {
    icon: "🔋",
    title: "Batería de Larga Duración",
    description: "Hasta 7 días de duración con una sola carga.",
  },
  {
    icon: "🌧️",
    title: "Resistente al Agua",
    description:
      "Diseño resistente al agua IPX7, perfecto para cualquier aventura.",
  },
  {
    icon: "📞",
    title: "Contacto Directo",
    description:
      "Información de contacto segura y protegida para reuniones rápidas.",
  },
  {
    icon: "🛡️",
    title: "Seguro y Confiable",
    description:
      "Tecnología confiable con encriptación de datos para proteger tu privacidad.",
  },
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>¿Por qué elegir SmartPets?</h2>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${styles.featureCard} ${
              activeFeature === index ? styles.active : ""
            }`}
            onMouseEnter={() => setActiveFeature(index)}
          >
            <div className={styles.iconContainer}>
              <span className={styles.icon}>{feature.icon}</span>
            </div>
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureDescription}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
