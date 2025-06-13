"use client";
import { useState } from "react";

interface ShareLocationProps {
  petName: string;
  ownerPhone: string;
  coordinates?: [number, number];
}

export default function ShareLocation({
  petName,
  ownerPhone,
  coordinates,
}: ShareLocationProps) {
  const [isSharing, setIsSharing] = useState(false);

  const shareLocation = async () => {
    setIsSharing(true);

    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const message = `¡Encontré a ${petName}! 
Estoy ubicado en: https://maps.google.com/?q=${latitude},${longitude}
Hora: ${new Date().toLocaleString("es-ES")}`;

            const whatsappUrl = `https://wa.me/${ownerPhone.replace(
              /[^0-9]/g,
              ""
            )}?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, "_blank");
            setIsSharing(false);
          },
          (error) => {
            console.error("Error getting location:", error);
            // Usar ubicación por defecto si hay coordenadas
            if (coordinates) {
              const message = `¡Encontré a ${petName}! 
Estoy cerca de: https://maps.google.com/?q=${coordinates[0]},${coordinates[1]}
Hora: ${new Date().toLocaleString("es-ES")}`;

              const whatsappUrl = `https://wa.me/${ownerPhone.replace(
                /[^0-9]/g,
                ""
              )}?text=${encodeURIComponent(message)}`;
              window.open(whatsappUrl, "_blank");
            }
            setIsSharing(false);
          }
        );
      }
    } catch (error) {
      console.error("Error sharing location:", error);
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={shareLocation}
      disabled={isSharing}
      style={{
        background: "linear-gradient(135deg, #25d366, #128c7e)",
        color: "white",
        border: "none",
        padding: "1rem 2rem",
        borderRadius: "12px",
        fontSize: "1rem",
        fontWeight: "600",
        cursor: isSharing ? "not-allowed" : "pointer",
        opacity: isSharing ? 0.7 : 1,
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      {isSharing ? "📍 Obteniendo ubicación..." : "📍 Compartir mi ubicación"}
    </button>
  );
}
