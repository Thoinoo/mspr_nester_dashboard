// pages/client-detail/[clientName].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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

  if (loading) return <p className="text-center text-gray-500">Chargement des détails...</p>;

  if (!client) return <p className="text-center text-red-500">Client introuvable.</p>;

  return (
    <div className="container mx-auto p-6">
      {/* Bouton retour à l'accueil */}
      <div className="mb-6 text-center">
        <Link href="/" passHref>
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300">
            Retour à l'accueil
          </button>
        </Link>
      </div>

      {/* Titre centré du nom du client */}
      <h1 className="text-4xl font-semibold text-center text-indigo-600 mb-8">{client.client}</h1>

      {/* Tableau centré avec bordure colorée */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-indigo-300">
        <table className="min-w-full table-auto border-separate border-spacing-0 mx-auto">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="px-6 py-3 text-left text-sm font-semibold">IP</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Hostname</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Latency</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Ports</th>
            </tr>
          </thead>
          <tbody>
            {client.computers.map((computer) => (
              <tr key={computer.ip_address} className="hover:bg-gray-100 border-b">
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{computer.ip_address}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-800">{computer.hostname}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{computer.latency}</td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <ul className="list-disc pl-5">
                    {Object.entries(computer.ports).map(([port, service]) => (
                      <li key={port} className="text-sm">
                        <strong>{port}:</strong> {service}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
