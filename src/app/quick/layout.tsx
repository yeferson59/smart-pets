import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SmartPets - Información de Mascota",
  description: "Información detallada de mascota perdida o encontrada",
};

export default function PetLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
