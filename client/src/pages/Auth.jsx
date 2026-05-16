import BASE_URL from "../api.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Scale } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const endpoint = isLogin
        ? `${BASE_URL}/api/auth/login`
        : `${BASE_URL}/api/auth/register`;
      const body = isLogin ? { email, password } : { name, email, password };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }

      login(data.user, data.token);
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong, try again");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--cream)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div className="card" style={{ width: "100%", maxWidth: "420px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <Scale size={28} color="var(--navy)" />
          <span
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "var(--navy)",
              fontFamily: "Georgia, serif",
            }}
          >
            LexMind
          </span>
        </div>

        <div
          style={{
            display: "flex",
            backgroundColor: "var(--cream)",
            borderRadius: "8px",
            padding: "4px",
            marginBottom: "28px",
          }}
        >
          {["Login", "Register"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setIsLogin(tab === "Login");
                setError("");
              }}
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                backgroundColor:
                  (tab === "Login") === isLogin
                    ? "var(--white)"
                    : "transparent",
                color:
                  (tab === "Login") === isLogin
                    ? "var(--navy)"
                    : "var(--text-muted)",
                transition: "all 0.2s ease",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {!isLogin && (
            <div>
              <label
                style={{
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "var(--text-dark)",
                  display: "block",
                  marginBottom: "6px",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Yash Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  fontSize: "14px",
                  backgroundColor: "var(--white)",
                  color: "var(--text-dark)",
                  outline: "none",
                }}
              />
            </div>
          )}

          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-dark)",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "var(--white)",
                color: "var(--text-dark)",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "var(--text-dark)",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontSize: "14px",
                backgroundColor: "var(--white)",
                color: "var(--text-dark)",
                outline: "none",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                fontSize: "13px",
                color: "#DC2626",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          <button
            className="btn-primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "15px",
              marginTop: "8px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
