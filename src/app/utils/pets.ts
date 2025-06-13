export interface Pet {
  id: string;
  name: string;
  type: string;
  owner: string;
  coordinates: [number, number];
  lastSeen: string;
  status: "safe" | "missing" | "found";
}

export const samplePets: Pet[] = [
  {
    id: "1",
    name: "Max",
    type: "Perro Labrador",
    owner: "Juan Pérez",
    coordinates: [-34.6037, -58.3816],
    lastSeen: "hace 2 minutos",
    status: "safe",
  },
  {
    id: "2",
    name: "Luna",
    type: "Gato Persa",
    owner: "María García",
    coordinates: [-34.5875, -58.3974],
    lastSeen: "hace 15 minutos",
    status: "safe",
  },
  {
    id: "3",
    name: "Rocky",
    type: "Perro Pastor",
    owner: "Carlos López",
    coordinates: [-34.6118, -58.396],
    lastSeen: "hace 1 hora",
    status: "missing",
  },
];
