import { ReactNode } from "react";

interface PayPalProviderProps {
  children: ReactNode;
}

// El client ID de PayPal se inyecta en el script de HTML
// Ver: index.html

export const PayPalProvider = ({ children }: PayPalProviderProps) => {
  return <>{children}</>;
};
