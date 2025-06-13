"use client";
import { useState } from "react";
import styles from "./CTA.module.css";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí podrías integrar con un servicio de email marketing
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>¿Listo para proteger a tu mascota?</h2>
        <p className={styles.subtitle}>
          Únete a miles de dueños que ya confían en SmartPets para mantener a
          sus mascotas seguras.
        </p>

        <div className={styles.priceSection}>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>99</span>
            <span className={styles.period}>/mes</span>
          </div>
          <p className={styles.priceDescription}>
            Incluye collar GPS, app móvil y soporte 24/7
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Ingresa tu email para más información"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailInput}
              required
            />
            <button type="submit" className={styles.ctaButton}>
              Obtener SmartPets
            </button>
          </form>
        ) : (
          <div className={styles.successMessage}>
            <span className={styles.checkIcon}>✓</span>
            ¡Gracias! Te contactaremos pronto con más información.
          </div>
        )}

        <div className={styles.benefits}>
          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>🚚</span>
            <span>Envío gratis</span>
          </div>
          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>↩️</span>
            <span>30 días de garantía</span>
          </div>
          <div className={styles.benefit}>
            <span className={styles.benefitIcon}>🔧</span>
            <span>Soporte técnico 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
