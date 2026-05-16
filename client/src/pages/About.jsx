import Navbar from "../components/Navbar.jsx";
import { Scale, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--cream)" }}>
      <Navbar />

      <div
        style={{ maxWidth: "700px", margin: "0 auto", padding: "80px 24px" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "24px",
            }}
          >
            <Scale size={28} color="var(--navy)" />
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "700",
                color: "var(--navy)",
                fontFamily: "Georgia, serif",
              }}
            >
              About LexMind
            </h1>
          </div>

          <p
            style={{
              fontSize: "16px",
              color: "var(--text-muted)",
              lineHeight: "1.9",
              marginBottom: "16px",
            }}
          >
            Indian court judgments — especially from the Supreme Court and High
            Courts — are often 50 to 100+ pages long. Reading, summarizing, and
            extracting key legal points from them is time-consuming and mentally
            exhausting for legal professionals and students alike.
          </p>

          <p
            style={{
              fontSize: "16px",
              color: "var(--text-muted)",
              lineHeight: "1.9",
              marginBottom: "48px",
            }}
          >
            LexMind was built to solve exactly that. Upload any judgment PDF and
            get an instant structured summary — facts, issues, decision, ratio
            decidendi, and key precedents — in seconds. Built specifically for
            the Indian judiciary, not a generic global tool.
          </p>
        </motion.div>

        <div
          style={{ borderTop: "1px solid var(--border)", marginBottom: "48px" }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
          style={{ borderLeft: "4px solid var(--navy)" }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              marginBottom: "20px",
            }}
          >
            Built by
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "var(--navy)",
                  fontFamily: "Georgia, serif",
                  marginBottom: "6px",
                }}
              >
                Yash Kumar
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-muted)" }}>
                CS Student · Jamia Hamdard University
              </p>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <a
                href="https://github.com/yashhK11"
                target="_blank"
                rel="noreferrer"
              >
                <button
                  className="btn-outline"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                  }}
                >
                  <ExternalLink size={16} /> GitHub
                </button>
              </a>
              <a
                href="https://www.linkedin.com/in/yashhkumarr/"
                target="_blank"
                rel="noreferrer"
              >
                <button
                  className="btn-primary"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                  }}
                >
                  <ExternalLink size={16} /> LinkedIn
                </button>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
