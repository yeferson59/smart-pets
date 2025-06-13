"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { QRCodeCanvas } from "qrcode.react";
import PetInfo from "./components/PetInfo";
import Features from "./components/Features";
import CTA from "./components/CTA";
import styles from "./landing.module.css";

const Map = dynamic(() => import("./components/Map"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "300px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#1ecbe1",
      }}
    >
      Cargando mapa...
    </div>
  ),
});

export default function LandingPage() {
  // Datos completos para la demo del QR
  const petData = {
    id: "SP001",
    name: "Max",
    species: "Perro",
    breed: "Labrador Retriever",
    age: "3 años",
    color: "Negro",
    weight: "28 kg",
    microchip: "MX123456789",
    photo: "/pet-profile.jpg",
    medicalInfo: "Vacunas al día. Alérgico al chocolate.",
    lastSeen: new Date().toLocaleString("es-ES"),
    status: "safe",
  };

  const ownerData = {
    name: "Juan Pérez",
    phone: "+54 11 1234-5678",
    email: "juan.perez@email.com",
    address: "Av. Corrientes 1234, CABA, Argentina",
    emergencyContact: "+54 11 8765-4321 (María Pérez)",
    veterinarian: "Dr. García - Clínica Veterinaria Central",
    vetPhone: "+54 11 5555-0123",
  };

  // URL para la página de información de la mascota
  const quickViewUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/quick/${petData.id}?data=${encodeURIComponent(
    JSON.stringify({ pet: petData, owner: ownerData })
  )}`;

  // Para compatibilidad con el componente PetInfo existente
  const legacyPetData = {
    nombre: petData.name,
    especie: petData.species,
    raza: petData.breed,
    edad: petData.age,
    color: petData.color,
    foto: petData.photo,
  };
  const legacyOwnerData = {
    nombre: ownerData.name,
    telefono: ownerData.phone,
    direccion: ownerData.address,
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Image
          src="/smartpets-logo.svg"
          alt="SmartPets Logo"
          width={80}
          height={80}
        />
        <h1>SmartPets</h1>
        <p>La forma más inteligente de cuidar a tu mascota</p>
      </header>
      <section className={styles.productSection}>
        <div className={styles.productInfo}>
          <h2>Collar GPS para Mascotas</h2>
          <p>
            Ubica a tu mascota en tiempo real, accede a su información y
            contáctate con el dueño fácilmente escaneando el código QR del
            collar.
          </p>
        </div>
        <div className={styles.qrSection}>
          <h3>Escanea el QR de Demo</h3>
          <QRCodeCanvas
            value={quickViewUrl}
            size={140}
            bgColor="#fff"
            fgColor="#1ecbe1"
          />
          <p
            style={{
              fontSize: "12px",
              color: "#666",
              marginTop: "0.5rem",
              textAlign: "center",
            }}
          >
            👆 Escanea para ver la demo completa
          </p>
          <button
            onClick={() => window.open(quickViewUrl, "_blank")}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              background: "linear-gradient(135deg, #1ecbe1, #16a085)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            🔗 Ver Demo Online
          </button>
        </div>
      </section>
      <Features />
      <section className={styles.mapSection}>
        <h3>Ubicación en tiempo real</h3>
        <Map />
      </section>
      <section className={styles.dataSection}>
        <h3>Información cuando escaneas el QR</h3>
        <PetInfo petData={legacyPetData} ownerData={legacyOwnerData} />
      </section>
      <CTA />
      <footer className={styles.footer}>
        <p>© 2025 SmartPets. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
