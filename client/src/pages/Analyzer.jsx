import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/Navbar.jsx";
import { Upload, FileText, Loader } from "lucide-react";

const sections = [
  { key: "facts", label: "Facts of the Case" },
  { key: "issues", label: "Legal Issues Raised" },
  { key: "decision", label: "Court's Decision" },
  { key: "ratio", label: "Ratio Decidendi" },
  { key: "precedents", label: "Key Precedents Cited" },
];

const Analyzer = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const summaryId = searchParams.get("id");

  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }
    if (summaryId) fetchExisting();
  }, [token, summaryId]);

  const fetchExisting = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/summary/${summaryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSummary(data);
    } catch (err) {
      setError("Could not load summary");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    setSummary(null);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await fetch("/api/summary/analyze", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setSummary(data);
    } catch (err) {
      setError("Something went wrong, try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--cream)" }}>
      <Navbar />

      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "var(--navy)",
            fontFamily: "Georgia, serif",
            marginBottom: "8px",
          }}
        >
          Analyze Judgment
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "var(--text-muted)",
            marginBottom: "40px",
          }}
        >
          Upload an Indian court judgment PDF to get an instant structured
          summary
        </p>

        {/* Upload Box */}
        {!summaryId && (
          <div className="card" style={{ marginBottom: "32px" }}>
            <div
              onClick={() => document.getElementById("fileInput").click()}
              style={{
                border: "2px dashed var(--border)",
                borderRadius: "8px",
                padding: "48px 24px",
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--navy)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              <Upload
                size={36}
                color="var(--navy)"
                style={{ marginBottom: "12px" }}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "var(--navy)",
                  marginBottom: "6px",
                }}
              >
                {file ? file.name : "Click to upload judgment PDF"}
              </p>
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                PDF files only
              </p>
              <input
                id="fileInput"
                type="file"
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {file && (
              <button
                className="btn-primary"
                onClick={handleAnalyze}
                disabled={loading}
                style={{
                  width: "100%",
                  marginTop: "16px",
                  padding: "14px",
                  fontSize: "15px",
                  opacity: loading ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {loading ? (
                  <>
                    <Loader size={18} /> Analyzing...
                  </>
                ) : (
                  <>
                    <FileText size={18} /> Analyze Judgment
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {error && (
          <p
            style={{
              color: "#DC2626",
              fontSize: "14px",
              textAlign: "center",
              marginBottom: "24px",
            }}
          >
            {error}
          </p>
        )}

        {/* Summary Output */}
        {summary && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "8px",
              }}
            >
              <FileText size={20} color="var(--navy)" />
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "var(--navy)",
                  fontFamily: "Georgia, serif",
                }}
              >
                {summary.fileName}
              </h2>
            </div>

            {sections.map(({ key, label }) => (
              <div
                key={key}
                className="card"
                style={{
                  borderLeft: "4px solid var(--navy)",
                }}
              >
                <h3
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "var(--navy)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginBottom: "12px",
                  }}
                >
                  {label}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "var(--text-dark)",
                    lineHeight: "1.8",
                  }}
                >
                  {summary[key]}
                </p>
              </div>
            ))}

            <button
              className="btn-outline"
              onClick={() => {
                setSummary(null);
                setFile(null);
              }}
              style={{ marginTop: "8px" }}
            >
              Analyze Another Judgment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analyzer;
