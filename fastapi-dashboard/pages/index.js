// pages/index.js
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"; // Utiliser Link pour la navigation dans Next.js

export default function Home() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("/api/clients/");
      setClients(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Clients</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="overflow-x-auto">
          {clients.length === 0 ? (
            <p>Aucun client trouvé.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-4 text-left">Client</th>
                  <th className="border-b p-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.client}>
                    <td className="border-b p-4">{client.client}</td>
                    <td className="border-b p-4">
                      <Link href={`/client-detail/${client.client}`}>
                        <a className="bg-blue-500 text-white px-4 py-2 rounded">
                          Voir Détails
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
