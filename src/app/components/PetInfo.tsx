"use client";
import { useState } from "react";
import styles from "./PetInfo.module.css";

interface PetData {
  nombre: string;
  especie: string;
  raza: string;
  edad: string;
  color: string;
  foto: string;
}

interface OwnerData {
  nombre: string;
  telefono: string;
  direccion: string;
}

interface PetInfoProps {
  petData: PetData;
  ownerData: OwnerData;
}

export default function PetInfo({ petData, ownerData }: PetInfoProps) {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.petSection}>
        <h3>🐾 Información de la Mascota</h3>
        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Nombre:</span>
            <span className={styles.value}>{petData.nombre}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Especie:</span>
            <span className={styles.value}>{petData.especie}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Raza:</span>
            <span className={styles.value}>{petData.raza}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Edad:</span>
            <span className={styles.value}>{petData.edad}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Color:</span>
            <span className={styles.value}>{petData.color}</span>
          </div>
        </div>
      </div>

      <div className={styles.ownerSection}>
        <h3>👤 Contactar al Dueño</h3>
        {!showContact ? (
          <button
            className={styles.contactButton}
            onClick={() => setShowContact(true)}
          >
            Mostrar Información de Contacto
          </button>
        ) : (
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Nombre:</span>
              <span className={styles.value}>{ownerData.nombre}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Teléfono:</span>
              <a
                href={`tel:${ownerData.telefono}`}
                className={styles.phoneLink}
              >
                {ownerData.telefono}
              </a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Dirección:</span>
              <span className={styles.value}>{ownerData.direccion}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
