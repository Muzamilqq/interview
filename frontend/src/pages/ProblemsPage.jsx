import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";

const difficultyStyle = {
  Easy: {
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.25)",
    text: "#10B981",
  },
  Medium: {
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
    text: "#F59E0B",
  },
  Hard: {
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
    text: "#EF4444",
  },
};

function DiffBadge({ difficulty }) {
  const c = difficultyStyle[difficulty] || difficultyStyle.Easy;
  return (
    <span
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: "999px",
        padding: "3px 10px",
        fontSize: "12px",
        fontWeight: 600,
        color: c.text,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {difficulty}
    </span>
  );
}

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);
  const easyCount = problems.filter((p) => p.difficulty === "Easy").length;
  const mediumCount = problems.filter((p) => p.difficulty === "Medium").length;
  const hardCount = problems.filter((p) => p.difficulty === "Hard").length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0B1020",
        backgroundImage: `
        radial-gradient(ellipse 70% 40% at 15% 15%, rgba(59,130,246,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 50% 35% at 85% 85%, rgba(20,184,166,0.05) 0%, transparent 50%)
      `,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "48px 24px 80px",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#F0F4FF",
              margin: "0 0 10px",
            }}
          >
            Practice Problems
          </h1>
          <p
            style={{
              fontSize: "15px",
              color: "rgba(200,214,240,0.6)",
              margin: 0,
            }}
          >
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        {/* PROBLEM LIST */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {problems.map((problem, idx) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              style={{
                background: "rgba(15,23,42,0.65)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(59,130,246,0.1)",
                borderRadius: "16px",
                padding: "20px 24px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                transition: "all 0.2s ease",
                animation: `fadeInUp ${0.3 + idx * 0.04}s ease forwards`,
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.4)";
                e.currentTarget.style.background = "rgba(15,23,42,0.85)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.background = "rgba(15,23,42,0.65)";
              }}
            >
              {/* ICON */}
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  flexShrink: 0,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#3B82F6",
                }}
              >
                <Code2Icon size={22} />
              </div>

              {/* CONTENT */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "6px",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#F0F4FF",
                    }}
                  >
                    {problem.title}
                  </span>
                  <DiffBadge difficulty={problem.difficulty} />
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(150,170,210,0.5)",
                    margin: "0 0 6px",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {problem.category}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(200,214,240,0.55)",
                    margin: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {problem.description.text}
                </p>
              </div>

              {/* ARROW */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  color: "#3B82F6",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                  }}
                >
                  Solve
                </span>
                <ChevronRightIcon size={18} />
              </div>
            </Link>
          ))}
        </div>

        {/* STATS */}
        <div
          style={{
            background: "rgba(15,23,42,0.65)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(59,130,246,0.12)",
            borderRadius: "20px",
            padding: "24px",
            marginTop: "32px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}
        >
          {[
            { label: "Total Problems", val: problems.length, color: "#3B82F6" },
            { label: "Easy", val: easyCount, color: "#10B981" },
            { label: "Medium", val: mediumCount, color: "#F59E0B" },
            { label: "Hard", val: hardCount, color: "#EF4444" },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "16px",
                borderRight: i < 3 ? "1px solid rgba(59,130,246,0.08)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "32px",
                  color: s.color,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "12px",
                  color: "rgba(150,170,210,0.5)",
                  marginTop: "4px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=JetBrains+Mono:wght@400&family=Outfit:wght@400;500;600;700&display=swap');
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default ProblemsPage;
