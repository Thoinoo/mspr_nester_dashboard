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
      // Assurez-vous que la requête correspond à l'API configurée avec la réécriture dans next.config.js
      const response = await axios.get(`/api/clients/${clientName}`); // L'URL ici est celle de votre API réécrite
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

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">IP</th>
            <th className="px-4 py-2 border-b">Hostname</th>
            <th className="px-4 py-2 border-b">Latency</th>
            <th className="px-4 py-2 border-b">Ports</th>
          </tr>
        </thead>
        <tbody>
          {client.computers.map((computer) => (
            <tr key={computer.ip_address} className="border-b">
              <td className="px-4 py-2">{computer.ip_address}</td>
              <td className="px-4 py-2">{computer.hostname}</td>
              <td className="px-4 py-2">{computer.latency}</td>
              <td className="px-4 py-2">
                <ul>
                  {Object.entries(computer.ports).map(([port, service]) => (
                    <li key={port}>
                      {port} - {service}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
