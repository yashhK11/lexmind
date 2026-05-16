import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Scale } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      style={{
        backgroundColor: "var(--white)",
        borderBottom: "1px solid var(--border)",
        padding: "0 40px",
        height: "64px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
        }}
      >
        <Scale size={24} color="var(--navy)" />
        <span
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "var(--navy)",
            fontFamily: "Georgia, serif",
          }}
        >
          LexMind
        </span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "var(--text-dark)",
            fontSize: "15px",
          }}
        >
          Home
        </Link>

        <Link
          to="/about"
          style={{
            textDecoration: "none",
            color: "var(--text-dark)",
            fontSize: "15px",
          }}
        >
          About
        </Link>

        {user ? (
          <>
            <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                color: "var(--text-dark)",
                fontSize: "15px",
              }}
            >
              Dashboard
            </Link>
            <Link
              to="/analyzer"
              style={{
                textDecoration: "none",
                color: "var(--text-dark)",
                fontSize: "15px",
              }}
            >
              Analyze
            </Link>
            <button onClick={handleLogout} className="btn-outline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth"
              style={{
                textDecoration: "none",
                color: "var(--text-dark)",
                fontSize: "15px",
              }}
            >
              Login
            </Link>
            <Link to="/auth">
              <button className="btn-primary">Get Started</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
