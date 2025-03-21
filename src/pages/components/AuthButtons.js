import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";

const AuthButtons = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, getIdTokenClaims } =
    useAuth0();

  const sendTokenToBackend = async () => {
    try {
      const { __raw: idToken } = await getIdTokenClaims();

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/callback`,
        { email: user.email },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Token sent successfully");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      sendTokenToBackend();
    }
  }, [isAuthenticated]);

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={loginWithRedirect}>Log In</button>
      ) : (
        <div>
          <p>Welcome {user.name}</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;
