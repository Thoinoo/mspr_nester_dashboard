"use client"; // ✅ Ajout pour désactiver le SSR si vous utilisez Next.js 13+

import { useEffect, useState } from "react";
import axios from "axios";
import https from "https"; // Import de https
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap

export default function Home() {
  const [clients, setClients] = useState(null); // ✅ Ne pas initialiser avec []
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false); // ✅ Vérifier si on est côté client

  useEffect(() => {
    setIsClient(true); // ✅ Indiquer qu'on est côté client
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      // Créer un agent HTTPS avec la configuration pour ignorer les erreurs de certificat
      const agent = new https.Agent({
        rejectUnauthorized: false, // Ignorer la vérification des certificats SSL
      });

      // L'URL complète de votre API
      const apiUrl = "https://nester-api.nfl-it.local:57935/clients/";  // Remplacez par l'URL de votre API

      // Ajouter l'agent HTTPS à la requête axios
      const response = await axios.get(apiUrl, { httpsAgent: agent });
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (clientName) => {
    try {
      const agent = new https.Agent({
        rejectUnauthorized: false, // Ignorer la vérification des certificats SSL
      });

      // Construire l'URL pour la suppression
      const deleteUrl = `https://nester-api.nfl-it.local:57935/clients/${clientName}`;

      // Faire la requête DELETE
      await axios.delete(deleteUrl, { httpsAgent: agent });

      // Mettre à jour la liste des clients après suppression
      setClients(clients.filter(client => client.client !== clientName));
    } catch (error) {
      console.error("Erreur lors de la suppression du client:", error);
    }
  };

  // ✅ Éviter de faire un rendu tant qu'on est côté serveur
  if (!isClient) {
    return null; // ⛔ Empêche Next.js de faire du SSR et évite l'erreur
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Liste des Clients</h1>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : clients && clients.length === 0 ? (
        <p className="text-center">Aucun client trouvé.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>Client</th>
                <th>Action</th>
                <th>Supprimer</th> {/* Nouvelle colonne pour supprimer */}
              </tr>
            </thead>
            <tbody>
              {clients?.map((client) => (
                <tr key={client.client}>
                  <td>{client.client}</td>
                  <td>
                    <Link href={`/client-detail/${client.client}`} className="btn btn-primary">
                      Voir Détails
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteClient(client.client)} // Appel de la fonction deleteClient
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
