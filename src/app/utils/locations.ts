// Ubicaciones predefinidas para SmartPets
export interface Location {
  name: string;
  coordinates: [number, number];
  description: string;
}

export const locations: Location[] = [
  {
    name: "Bogotá, Colombia",
    coordinates: [4.711, -74.0721],
    description: "Centro de Bogotá, Colombia",
  },
  {
    name: "Buenos Aires Centro",
    coordinates: [-34.6037, -58.3816],
    description: "Centro de la Ciudad Autónoma de Buenos Aires",
  },
  {
    name: "Madrid, España",
    coordinates: [40.4168, -3.7038],
    description: "Centro de Madrid, España",
  },
  {
    name: "Ciudad de México",
    coordinates: [19.4326, -99.1332],
    description: "Centro de Ciudad de México",
  },
  {
    name: "Lima, Perú",
    coordinates: [-12.0464, -77.0428],
    description: "Centro de Lima, Perú",
  },
];
// Función para obtener una ubicación por nombre
export const getLocationByName = (name: string): Location | undefined => {
  return locations.find((location) => location.name === name);
};

// Función para obtener una ubicación aleatoria
export const getRandomLocation = (): Location => {
  const randomIndex = Math.floor(Math.random() * locations.length);
  return locations[randomIndex];
};
