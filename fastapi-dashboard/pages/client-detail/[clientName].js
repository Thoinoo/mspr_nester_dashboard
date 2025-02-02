// pages/client-detail/[clientName].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ClientDetail() {
  const { clientName } = useRouter().query; // Capture le nom du client depuis l'URL
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientName) return; // Assurez-vous que le clientName est défini avant de faire la requête

    fetchClientDetail();
  }, [clientName]); // Réexécuter lorsqu'un autre clientName est capturé

  const fetchClientDetail = async () => {
    try {
      const response = await axios.get(`/api/clients/${clientName}`); // Utilisez le nom du client dans la requête API
      setClient(response.data);
    } catch (error) {
      console.error("Error fetching client details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Chargement des détails...</p>;

  if (!client) return <p>Client introuvable.</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{client.client}</h1>
      <div>
        {client.computers.map((computer) => (
          <div key={computer.ip_address} className="border p-4 mb-4 rounded-lg shadow">
            <p><strong>IP:</strong> {computer.ip_address}</p>
            <p><strong>Latence:</strong> {computer.latency}</p>
            <p><strong>Hostname:</strong> {computer.hostname}</p>
            <p><strong>Ports:</strong></p>
            <ul>
              {Object.entries(computer.ports).map(([port, service]) => (
                <li key={port}>
                  {port} - {service}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
