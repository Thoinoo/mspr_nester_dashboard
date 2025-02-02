import 'bootstrap/dist/css/bootstrap.min.css'; // Import du CSS de Bootstrap
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js"); // Charger Bootstrap JS uniquement côté client
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
