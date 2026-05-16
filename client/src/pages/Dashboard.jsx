import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import SummaryCard from "../components/SummaryCard.jsx";
import { FileText, Plus } from "lucide-react";

const Dashboard = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    try {
      const res = await fetch("/api/summary", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSummaries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/summary/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setSummaries((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--cream)" }}>
      <Navbar />

      <div
        style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 24px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "var(--navy)",
                fontFamily: "Georgia, serif",
                marginBottom: "6px",
              }}
            >
              Welcome, {user?.name}
            </h1>
            <p style={{ fontSize: "15px", color: "var(--text-muted)" }}>
              {summaries.length} judgment{summaries.length !== 1 ? "s" : ""}{" "}
              analyzed
            </p>
          </div>
          <button
            className="btn-primary"
            onClick={() => navigate("/analyzer")}
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Plus size={18} /> New Analysis
          </button>
        </div>

        {loading ? (
          <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
            Loading...
          </p>
        ) : summaries.length === 0 ? (
          <div
            className="card"
            style={{ textAlign: "center", padding: "60px 24px" }}
          >
            <FileText
              size={48}
              color="var(--border)"
              style={{ marginBottom: "16px" }}
            />
            <h3
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "var(--navy)",
                fontFamily: "Georgia, serif",
                marginBottom: "10px",
              }}
            >
              No judgments analyzed yet
            </h3>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                marginBottom: "24px",
              }}
            >
              Upload your first court judgment to get started
            </p>
            <button
              className="btn-primary"
              onClick={() => navigate("/analyzer")}
            >
              Analyze a Judgment
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {summaries.map((summary) => (
              <SummaryCard
                key={summary._id}
                summary={summary}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
