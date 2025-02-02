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

  if (loading) return <p className="text-center text-muted">Chargement des détails...</p>;

  if (!client) return <p className="text-center text-danger">Client introuvable.</p>;

  return (
    <div className="container mt-5">
      {/* Bouton retour à l'accueil */}
      <div className="text-center mb-4">
        <Link href="/" passHref>
          <button className="btn btn-primary">
            Retour à l'accueil
          </button>
        </Link>
      </div>

      {/* Titre centré du nom du client */}
      <h1 className="text-center text-primary mb-5">{client.client}</h1>

      {/* Tableau stylisé avec Bootstrap */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">IP</th>
              <th scope="col">Hostname</th>
              <th scope="col">Latency</th>
              <th scope="col">Ports</th>
            </tr>
          </thead>
          <tbody>
            {client.computers.map((computer) => (
              <tr key={computer.ip_address}>
                <td>{computer.ip_address}</td>
                <td>{computer.hostname}</td>
                <td>{computer.latency}</td>
                <td>
                  <ul className="list-unstyled">
                    {Object.entries(computer.ports).map(([port, service]) => (
                      <li key={port}>
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
