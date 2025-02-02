import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://10.0.0.12:57935/clients/");
      setClients(response.data);
    } catch (error) {
      // Affichage complet de l'erreur dans la console
      console.error("Error fetching clients:", error);
      if (error.response) {
        console.error("Response error:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("General error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

//  const deleteClient = async (clientName) => {
//    if (!window.confirm(`Supprimer le client ${clientName} ?`)) return;
//    try {
//      await axios.delete(`http://10.0.0.12:57935/clients/${clientName}`);
//      setClients(clients.filter(client => client.client !== clientName));
//    } catch (error) {
//      // Affichage complet de l'erreur dans la console
//      console.error("Error deleting client:", error);
//      if (error.response) {
//        console.error("Response error:", error.response.data);
//        console.error("Response status:", error.response.status);
//      } else if (error.request) {
//        console.error("Request error:", error.request);
//      } else {
//        console.error("General error:", error.message);
//      }
//    }
//  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des Clients</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="space-y-6">
          {clients.length === 0 ? (
            <p>Aucun client trouvé.</p>
          ) : (
            clients.map((client) => (
              <div key={client.client} className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{client.client}</h2>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => deleteClient(client.client)}
                  >Supprimer</button>
                </div>
                <div className="mt-2">
                  {client.computers.map((computer) => (
                    <div key={computer.ip_address} className="border p-2 rounded mt-2">
                      <p><strong>IP:</strong> {computer.ip_address}</p>
                      <p><strong>Latence:</strong> {computer.latency}</p>
                      <p><strong>Hostname:</strong> {computer.hostname}</p>
                      <p><strong>Ports:</strong></p>
                      <ul className="ml-4 list-disc">
                        {Object.entries(computer.ports).map(([port, service]) => (
                          <li key={port}>{port} - {service}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
