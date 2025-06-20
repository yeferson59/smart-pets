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
    name: "Alma",
    species: "Perro",
    breed: "Cocker Spaniel",
    age: "3 años",
    color: "Dorado",
    weight: "12 kg",
    microchip: "SP-COCKER-2024",
    photo: "/pet-demo.jpg",
    medicalInfo: "Sin condición médica",
    alergia: "No presenta",
    sterilized: "Esterilizada",
    lastSeen: new Date().toLocaleString("es-ES"),
    status: "safe",
  };

  const ownerData = {
    name: "Ana Isabel Carrillo",
    phone: "+57 3183455554",
    email: "",
    address: "",
    emergencyContact: "",
    veterinarian: "",
    vetPhone: "",
  };

  // URL para la página de información de la mascota
  const quickViewUrl = `${
    typeof window !== "undefined" ? window.location.origin : ""
  }/quick/${petData.id}?data=${encodeURIComponent(
    JSON.stringify({ pet: petData, owner: ownerData }),
  )}`;

  // Para compatibilidad con el componente PetInfo existente
  const legacyPetData = {
    nombre: petData.name,
    especie: petData.species,
    raza: petData.breed,
    edad: petData.age,
    color: petData.color,
    foto: petData.photo,
    esterilizada: petData.sterilized,
    alergia: petData.alergia,
    medicalInfo: petData.medicalInfo,
  };
  const legacyOwnerData = {
    nombre: ownerData.name,
    telefono: ownerData.phone,
    direccion: ownerData.address,
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: "16px",
              padding: "8px",
              boxShadow: "0 2px 12px rgba(30,203,225,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 80,
              width: 80,
            }}
          >
            <Image
              src="/smartpets-logo.jpg"
              alt="SmartPets Logo"
              width={64}
              height={64}
              style={{ objectFit: "contain", borderRadius: "12px" }}
              priority
            />
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                color: "#1ecbe1",
                fontWeight: 800,
                fontSize: "2.2rem",
                letterSpacing: "-1px",
              }}
            >
              SmartPets
            </h1>
            <p
              style={{
                margin: 0,
                color: "#666",
                fontWeight: 500,
                fontSize: "1.1rem",
              }}
            >
              La forma más inteligente de cuidar a tu mascota
            </p>
          </div>
        </div>
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
            id="demo-qr-canvas"
            value={quickViewUrl}
            size={140}
            bgColor="#fff"
            fgColor="#1ecbe1"
          />
          <button
            className={styles.qrDownloadButton}
            onClick={async () => {
              // Cargar dinámicamente QRCodeCanvas y ReactDOM para evitar problemas SSR
              const { QRCodeCanvas } = await import("qrcode.react");
              const { createRoot } = await import("react-dom/client");
              const tempDiv = document.createElement("div");
              document.body.appendChild(tempDiv);

              const root = createRoot(tempDiv);
              root.render(
                <QRCodeCanvas
                  value={quickViewUrl}
                  size={560}
                  bgColor="#000"
                  fgColor="#fff"
                  includeMargin={true}
                  id="download-qr-canvas"
                />,
              );

              // Esperar a que el QR se renderice en el DOM antes de capturarlo
              setTimeout(() => {
                const canvas = tempDiv.querySelector(
                  "canvas",
                ) as HTMLCanvasElement;
                if (canvas) {
                  const url = canvas.toDataURL("image/png");
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "smartpets-demo-qr.png";
                  link.click();
                }
                root.unmount();
                document.body.removeChild(tempDiv);
              }, 100); // 100ms para asegurar renderizado
            }}
          >
            Descargar QR en alta resolución (blanco sobre negro)
          </button>
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
