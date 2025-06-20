"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./quick-view.module.css";

interface PetData {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  status: "safe" | "missing" | "found";
  photo: string;
}

interface OwnerData {
  name: string;
  phone: string;
}

export default function QuickPetView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [petData, setPetData] = useState<PetData | null>(null);
  const [ownerData, setOwnerData] = useState<OwnerData | null>(null);
  const [showContact, setShowContact] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const qrData = searchParams.get("data");
    if (qrData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(qrData));
        setPetData({
          id: parsedData.pet.id,
          name: parsedData.pet.name,
          species: parsedData.pet.species,
          age: parsedData.pet.age,
          breed: parsedData.pet.breed,
          status: parsedData.pet.status,
          photo: parsedData.pet.photo,
        });
        setOwnerData({
          name: parsedData.owner.name,
          phone: parsedData.owner.phone,
        });
      } catch (error) {
        console.error("Error parsing QR data:", error);
        setError(
          "Error al leer el QR. Intenta nuevamente o contacta a SmartPets.",
        );
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
      age: "3 años",
      breed: "Cocker Spaniel",
      status: "safe",
      photo: "/pet-demo.jpg",
    });
    setOwnerData({
      name: "Ana Isabel Carrillo",
      phone: "+57 3183455554",
    });
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleWhatsApp = (phone: string) => {
    const message = `Hola! Encontré a ${petData?.name}. ¿Es tu mascota?`;
    const whatsappUrl = `https://wa.me/${phone.replace(
      /[^0-9]/g,
      "",
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const goToFullInfo = () => {
    router.push(
      `/pet/${petData?.id}?data=${encodeURIComponent(
        searchParams.get("data") || "",
      )}`,
    );
  };

  if (error) {
    return <div className={styles.errorBanner}>{error}</div>;
  }

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
              <div className={styles.basicGrid}>
                <div>
                  <span className={styles.label}>Especie:</span>{" "}
                  {petData.species}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.actionSection}>
          <h3>¿Encontraste a {petData.name}?</h3>
          <p>Contacta al dueño para ayudar a reunirlo con su familia:</p>
          <div className={styles.actionButtons}>
            <button
              className={styles.contactButton}
              onClick={() => setShowContact(!showContact)}
            >
              📞 Ver Contacto
            </button>
            <button className={styles.fullInfoButton} onClick={goToFullInfo}>
              🔎 Ver información completa
            </button>
          </div>
          {showContact && (
            <div className={styles.contactInfo}>
              <h4>👤 Dueño</h4>
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
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <footer className={styles.footer}>
        <p>
          Powered by SmartPets - Solo datos básicos visibles en modo rescate
        </p>
      </footer>
    </div>
  );
}
