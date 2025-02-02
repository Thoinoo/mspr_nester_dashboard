import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

export default function Home() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false); // ✅ Empêche le rendu avant l'hydratation

  useEffect(() => {
    setIsMounted(true); // ✅ Active le rendu après hydratation
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("/api/clients/");
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return null; // ✅ Empêche le rendu SSR initial

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Liste des Clients</h1>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      ) : clients.length === 0 ? (
        <p className="text-center">Aucun client trouvé.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>Client</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.client}>
                  <td>{client.client}</td>
                  <td>
                    <Link href={`/client-detail/${client.client}`} className="btn btn-primary">
                      Voir Détails
                    </Link>
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
