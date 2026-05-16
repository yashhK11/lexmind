import { useNavigate } from "react-router-dom";
import { FileText, Calendar, Trash2 } from "lucide-react";

const SummaryCard = ({ summary, onDelete }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(summary._id);
  };

  return (
    <div
      className="card"
      onClick={() => navigate(`/analyzer?id=${summary._id}`)}
      style={{
        cursor: "pointer",
        transition: "all 0.2s ease",
        borderLeft: "4px solid var(--navy)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(27,58,92,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* File name + delete */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            flex: 1,
            minWidth: 0,
          }}
        >
          <FileText
            size={20}
            color="var(--navy)"
            style={{ flexShrink: 0, marginTop: "2px" }}
          />
          <span
            style={{
              fontWeight: "600",
              fontSize: "15px",
              color: "var(--text-dark)",
              fontFamily: "Georgia, serif",
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {summary.fileName}
          </span>
        </div>
        <button
          onClick={handleDelete}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            flexShrink: 0,
            color: "var(--text-muted)",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#DC2626")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Facts preview */}
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-muted)",
          lineHeight: "1.6",
          marginBottom: "16px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {summary.facts}
      </p>

      {/* Date */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Calendar size={14} color="var(--text-muted)" />
        <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
          {formatDate(summary.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;
