"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import ShareLocation from "../../components/ShareLocation";
import styles from "./pet-info.module.css";

const Map = dynamic(() => import("../../components/Map"), { ssr: false });

interface PetData {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  color: string;
  weight: string;
  microchip: string;
  photo: string;
  medicalInfo: string;
  lastSeen: string;
  status: "safe" | "missing" | "found";
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
  const [showContact, setShowContact] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

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
    });

    setOwnerData({
      name: "Juan Pérez",
      phone: "+54 11 1234-5678",
      email: "juan.perez@email.com",
      address: "Av. Corrientes 1234, CABA, Argentina",
      emergencyContact: "+54 11 8765-4321 (María Pérez)",
      veterinarian: "Dr. García - Clínica Veterinaria Central",
      vetPhone: "+54 11 5555-0123",
    });
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    const message = `Hola! Encontré a ${petData?.name}. ¿Es tu mascota?`;
    const whatsappUrl = `https://wa.me/${phone.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const reportFound = () => {
    setEmergencyMode(true);
    // Aquí se enviaría una notificación al dueño
    alert(
      "¡Notificación enviada al dueño! Gracias por ayudar a reunir a Max con su familia."
    );
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
        <Image
          src="/smartpets-logo.svg"
          alt="SmartPets"
          width={40}
          height={40}
        />
        <h1>SmartPets</h1>
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

      {emergencyMode && (
        <div className={styles.emergencyBanner}>
          🚨 ¡Modo Emergencia Activado! El dueño ha sido notificado.
        </div>
      )}

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
                <span className={styles.label}>Color:</span>
                <span>{petData.color}</span>
              </div>
              <div className={styles.detail}>
                <span className={styles.label}>Peso:</span>
                <span>{petData.weight}</span>
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

        <section className={styles.actionSection}>
          <h3>¿Encontraste a {petData.name}?</h3>
          <p>Usa cualquiera de estas opciones para contactar al dueño:</p>

          <div className={styles.actionButtons}>
            <button className={styles.emergencyButton} onClick={reportFound}>
              🚨 ¡La encontré!
            </button>

            <button
              className={styles.contactButton}
              onClick={() => setShowContact(!showContact)}
            >
              📞 Ver Contacto
            </button>
          </div>

          {showContact && (
            <div className={styles.contactInfo}>
              <h4>👤 Información del Dueño</h4>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <span className={styles.label}>Nombre:</span>
                  <span>{ownerData.name}</span>
                </div>
                <div className={styles.contactActions}>
                  <button
                    className={styles.callButton}
                    onClick={() => handleCall(ownerData.phone)}
                  >
                    📞 Llamar: {ownerData.phone}
                  </button>
                  <button
                    className={styles.whatsappButton}
                    onClick={() => handleWhatsApp(ownerData.phone)}
                  >
                    💬 WhatsApp
                  </button>
                  <ShareLocation
                    petName={petData.name}
                    ownerPhone={ownerData.phone}
                    coordinates={[-34.6037, -58.3816]}
                  />
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.label}>Email:</span>
                  <a href={`mailto:${ownerData.email}`}>{ownerData.email}</a>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.label}>Dirección:</span>
                  <span>{ownerData.address}</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.label}>Contacto de emergencia:</span>
                  <span>{ownerData.emergencyContact}</span>
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.label}>Veterinario:</span>
                  <span>{ownerData.veterinarian}</span>
                  <button
                    className={styles.vetButton}
                    onClick={() => handleCall(ownerData.vetPhone)}
                  >
                    📞 {ownerData.vetPhone}
                  </button>
                </div>
              </div>
            </div>
          )}
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
