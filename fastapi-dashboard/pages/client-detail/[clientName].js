import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ClientDetail() {
  const { clientName } = useRouter().query;
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientName) return;
    fetchClientDetail();
  }, [clientName]);

  const fetchClientDetail = async () => {
    try {
      const response = await axios.get(`/api/clients/${clientName}`);
      setClient(response.data);
    } catch (error) {
      console.error("Error fetching client details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Chargement des détails...</p>;
  if (!client) return <p className="text-center mt-4">Client introuvable.</p>;

  return (
    <div className="container mt-5">
      {/* Nom du client centré */}
      <h1 className="text-center mb-4">{client.client}</h1>

      {/* Tableau Bootstrap */}
      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="thead-dark">
            <tr>
              <th>IP</th>
              <th>Hostname</th>
              <th>Latence</th>
              <th>Ports</th>
            </tr>
          </thead>
          <tbody>
            {client.computers.map((computer) => (
              <tr key={computer.ip_address}>
                <td>{computer.ip_address}</td>
                <td>{computer.hostname}</td>
                <td>{computer.latency}</td>
                <td>
                  {Object.entries(computer.ports).map(([port, service]) => (
                    <span key={port} className="badge bg-primary me-1">
                      {port} - {service}
                    </span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bouton de retour à l'accueil */}
      <div className="text-center mt-4">
        <Link href="/">
          <Link href="/accueil">Retour à l'accueil</Link> {/* ✅ Correct */}
        </Link>
      </div>
    </div>
  );
}
