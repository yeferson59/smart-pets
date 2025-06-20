"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { locations, Location } from "../utils/locations.demo";

// Fix para los iconos de Leaflet en Next.js
const createCustomIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background: linear-gradient(135deg, #1ecbe1, #16a085);
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          background: white;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });
};

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState<Location>(
    locations[0],
  );

  const handleLocationChange = (locationName: string) => {
    const newLocation = locations.find((loc) => loc.name === locationName);
    if (newLocation) {
      setCurrentLocation(newLocation);
    }
  };

  return (
    <div>
      {/* Selector de ubicación */}
      <div
        style={{
          marginBottom: "1rem",
          padding: "1rem",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "12px",
          backdropFilter: "blur(10px)",
        }}
      >
        <label
          style={{
            color: "#1ecbe1",
            fontWeight: "600",
            marginBottom: "0.5rem",
            display: "block",
          }}
        >
          📍 Cambiar ubicación de Max:
        </label>
        <select
          value={currentLocation.name}
          onChange={(e) => handleLocationChange(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            borderRadius: "8px",
            border: "1px solid rgba(30, 203, 225, 0.3)",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            fontSize: "14px",
          }}
        >
          {locations.map((location) => (
            <option
              key={location.name}
              value={location.name}
              style={{ background: "#333", color: "#fff" }}
            >
              {location.name}
            </option>
          ))}
        </select>
        <p
          style={{
            margin: "0.5rem 0 0 0",
            fontSize: "12px",
            color: "#ccc",
          }}
        >
          {currentLocation.description}
        </p>
      </div>

      {/* Mapa */}
      <div
        style={{
          height: "300px",
          width: "100%",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 2px 16px rgba(0,0,0,0.1)",
        }}
      >
        <MapContainer
          key={`${currentLocation.coordinates[0]}-${currentLocation.coordinates[1]}`}
          center={currentLocation.coordinates}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={currentLocation.coordinates}
            icon={createCustomIcon()}
          >
            <Popup>
              <div
                style={{ textAlign: "center", fontFamily: "Inter, sans-serif" }}
              >
                <strong style={{ color: "#1ecbe1", fontSize: "16px" }}>
                  🐾 Max está aquí!
                </strong>
                <br />
                <span style={{ color: "#666", fontSize: "14px" }}>
                  📍 {currentLocation.name}
                </span>
                <br />
                <span style={{ color: "#666", fontSize: "12px" }}>
                  Última actualización: hace 2 minutos
                </span>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
