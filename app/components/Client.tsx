"use client";

import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}
const Client: React.FC<Props> = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return <>{children}</>;
};

export default Client;
