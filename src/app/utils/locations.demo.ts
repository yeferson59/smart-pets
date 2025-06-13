// Ubicaciones predefinidas para SmartPets
export interface Location {
  name: string;
  coordinates: [number, number];
  description: string;
}

export const locations: Location[] = [
  {
    name: "Universidad De Pamplona sede Virgen Del Rosario",
    coordinates: [7.378553023206779, -72.64724918241771],
    description:
      "Sede Virgen del Rosario de la Universidad de Pamplona, Colombia",
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
