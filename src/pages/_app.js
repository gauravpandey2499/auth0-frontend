import { Auth0Provider } from "@auth0/auth0-react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri:
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
        scope: "openid profile email",
      }}
    >
      <Component {...pageProps} />
    </Auth0Provider>
  );
}

export default MyApp;
