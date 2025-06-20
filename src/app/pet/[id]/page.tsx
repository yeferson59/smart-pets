"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./pet-info.module.css";

const Map = dynamic(() => import("../../components/Map-demo"), { ssr: false });

interface PetData {
  id: string;
  name: string;
  species: string;
  breed: string;
  microchip: string;
  alergia: string;
  photo: string;
  medicalInfo: string;
  lastSeen: string;
  status: "safe" | "missing" | "found";
  age: string;
  sterilized: string;
}

interface OwnerData {
  name: string;
  phone: string;
  email: string;
  address: string;
  emergencyContact: string;
  veterinarian: string;
  vetPhone: string;
}

export default function PetInfoPage() {
  const searchParams = useSearchParams();
  const [petData, setPetData] = useState<PetData | null>(null);
  const [ownerData, setOwnerData] = useState<OwnerData | null>(null);

  useEffect(() => {
    // Obtener datos del QR o usar datos de demo
    const qrData = searchParams.get("data");

    if (qrData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(qrData));
        setPetData(parsedData.pet);
        setOwnerData(parsedData.owner);
      } catch (error) {
        console.error("Error parsing QR data:", error);
        loadDemoData();
      }
    } else {
      loadDemoData();
    }
  }, [searchParams]);

  const loadDemoData = () => {
    setPetData({
      id: "SP001",
      name: "Alma",
      species: "Perro",
      breed: "Cocker Spaniel",
      alergia: "No presenta",
      microchip: "SP-COCKER-2024",
      photo: "/pet-demo.jpg",
      medicalInfo: "Sin condición médica",
      lastSeen: new Date().toLocaleString("es-ES"),
      status: "safe",
      age: "3 años",
      sterilized: "Esterilizada",
    });

    setOwnerData({
      name: "Ana Isabel Carrillo",
      phone: "+57 3183455554",
      email: "",
      address: "",
      emergencyContact: "",
      veterinarian: "",
      vetPhone: "",
    });
  };

  if (!petData || !ownerData) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando información de la mascota...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logoRow}>
          <div className={styles.logoBox}>
            <Image
              src="/smartpets-logo.jpg"
              alt="SmartPets Logo"
              width={40}
              height={40}
              className={styles.logoImg}
              priority
            />
          </div>
        </div>
        <div className={styles.status}>
          <span className={`${styles.statusBadge} ${styles[petData.status]}`}>
            {petData.status === "safe"
              ? "✅ Seguro"
              : petData.status === "missing"
                ? "🚨 Perdido"
                : "🎉 Encontrado"}
          </span>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.petSection}>
          <div className={styles.petHeader}>
            <div className={styles.petPhoto}>
              <Image
                src={petData.photo}
                alt={petData.name}
                width={120}
                height={120}
                className={styles.photo}
              />
            </div>
            <div className={styles.petBasicInfo}>
              <h2>{petData.name}</h2>
              <p className={styles.breed}>{petData.breed}</p>
              <p className={styles.lastSeen}>
                📍 Última ubicación: {petData.lastSeen}
              </p>
            </div>
          </div>

          <div className={styles.petDetails}>
            <h3>📋 Información de la Mascota</h3>
            <div className={styles.detailsGrid}>
              <div className={styles.detail}>
                <span className={styles.label}>Especie:</span>
                <span>{petData.species}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Raza:</span>
                <span>{petData.breed}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Edad:</span>
                <span>{petData.age}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Esterilizada:</span>
                <span>{petData.sterilized}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Microchip:</span>
                <span>{petData.microchip}</span>
              </div>
            </div>

            <div className={styles.medicalInfo}>
              <h4>🏥 Información Médica</h4>
              <p>{petData.medicalInfo}</p>
            </div>
          </div>
        </section>

        <section className={styles.mapSection}>
          <h3>📍 Ubicación Actual</h3>
          <Map />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Powered by SmartPets - Tecnología para el cuidado de mascotas</p>
      </footer>
    </div>
  );
}
