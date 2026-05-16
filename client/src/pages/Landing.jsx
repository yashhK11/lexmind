import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { Scale, FileText, Zap, Shield, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div style={{ backgroundColor: "var(--cream)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "100px 24px 80px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--white)",
              border: "1px solid var(--border)",
              borderRadius: "100px",
              padding: "6px 16px",
              marginBottom: "32px",
              fontSize: "13px",
              color: "var(--navy)",
            }}
          >
            <Zap size={14} />
            AI-Powered Indian Legal Research
          </div>

          <h1
            style={{
              fontSize: "56px",
              fontWeight: "700",
              color: "var(--navy)",
              fontFamily: "Georgia, serif",
              lineHeight: "1.2",
              marginBottom: "24px",
            }}
          >
            Understand Any Court
            <br />
            Judgment in Minutes
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "var(--text-muted)",
              lineHeight: "1.8",
              marginBottom: "40px",
              maxWidth: "600px",
              margin: "0 auto 40px",
            }}
          >
            Upload any Indian Supreme Court or High Court judgment. LexMind
            instantly extracts facts, issues, decisions, ratio decidendi, and
            key precedents.
          </p>

          <div
            style={{ display: "flex", gap: "16px", justifyContent: "center" }}
          >
            <Link to="/analyzer">
              <button
                className="btn-primary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "16px",
                  padding: "14px 32px",
                }}
              >
                Start for Free <ChevronRight size={18} />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "60px 24px",
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
            fontSize: "32px",
            fontWeight: "700",
            color: "var(--navy)",
            fontFamily: "Georgia, serif",
            marginBottom: "48px",
          }}
        >
          Everything you need
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "24px",
          }}
        >
          {[
            {
              icon: <FileText size={24} color="var(--navy)" />,
              title: "Structured Summary",
              desc: "Get facts, issues, decision, ratio decidendi and precedents — all organized clearly.",
            },
            {
              icon: <Zap size={24} color="var(--navy)" />,
              title: "Instant Analysis",
              desc: "No more reading 100 page judgments. Get the key points in under 30 seconds.",
            },
            {
              icon: <Shield size={24} color="var(--navy)" />,
              title: "Indian Law Focused",
              desc: "Built specifically for Indian judiciary — Supreme Court, High Courts, and more.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ textAlign: "center" }}
            >
              <div style={{ marginBottom: "16px" }}>{feature.icon}</div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "var(--navy)",
                  marginBottom: "10px",
                  fontFamily: "Georgia, serif",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--text-muted)",
                  lineHeight: "1.7",
                }}
              >
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "40px 24px",
          borderTop: "1px solid var(--border)",
          color: "var(--text-muted)",
          fontSize: "14px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "8px",
          }}
        >
          <Scale size={16} color="var(--navy)" />
          <span style={{ color: "var(--navy)", fontWeight: "600" }}>
            LexMind
          </span>
        </div>
        © {new Date().getFullYear()} LexMind. Built for Indian legal
        professionals.
      </footer>
    </div>
  );
};

export default Landing;
