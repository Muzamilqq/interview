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
        padding: "4px 12px",
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

function ProblemDescription({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) {
  const sectionStyle = {
    background: "rgba(11,16,32,0.6)",
    border: "1px solid rgba(59,130,246,0.1)",
    borderRadius: "14px",
    padding: "20px",
  };

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        background: "#0B1020",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "24px",
          background: "rgba(15,23,42,0.8)",
          borderBottom: "1px solid rgba(59,130,246,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 5,
          backdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: "8px",
          }}
        >
          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "22px",
              color: "#F0F4FF",
              margin: 0,
            }}
          >
            {problem.title}
          </h1>
          <DiffBadge difficulty={problem.difficulty} />
        </div>
        <p
          style={{
            fontSize: "12px",
            fontFamily: "'JetBrains Mono', monospace",
            color: "rgba(150,170,210,0.5)",
            margin: "0 0 16px",
          }}
        >
          {problem.category}
        </p>

        {/* PROBLEM SELECTOR */}
        <select
          style={{
            width: "100%",
            background: "rgba(11,16,32,0.9)",
            border: "1px solid rgba(59,130,246,0.15)",
            borderRadius: "10px",
            color: "#F0F4FF",
            fontFamily: "'Outfit', sans-serif",
            fontSize: "13px",
            padding: "9px 12px",
            outline: "none",
            appearance: "none",
            transition: "border-color 0.2s",
          }}
          value={currentProblemId}
          onChange={(e) => onProblemChange(e.target.value)}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
          onBlur={(e) =>
            (e.currentTarget.style.borderColor = "rgba(59,130,246,0.15)")
          }
        >
          {allProblems.map((p) => (
            <option key={p.id} value={p.id} style={{ background: "#111827" }}>
              {p.title} - {p.difficulty}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* DESCRIPTION */}
        <div style={sectionStyle}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#F0F4FF",
              margin: "0 0 14px",
            }}
          >
            Description
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.75,
                color: "rgba(200,214,240,0.8)",
                margin: 0,
              }}
            >
              {problem.description.text}
            </p>
            {problem.description.notes.map((note, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: "14px",
                  lineHeight: 1.75,
                  color: "rgba(200,214,240,0.75)",
                  margin: 0,
                }}
              >
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* EXAMPLES */}
        <div style={sectionStyle}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#F0F4FF",
              margin: "0 0 16px",
            }}
          >
            Examples
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {problem.examples.map((example, idx) => (
              <div key={idx}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      background: "rgba(59,130,246,0.12)",
                      border: "1px solid rgba(59,130,246,0.2)",
                      borderRadius: "6px",
                      padding: "1px 8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#3B82F6",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "rgba(200,214,240,0.8)",
                    }}
                  >
                    Example {idx + 1}
                  </span>
                </div>
                <div
                  style={{
                    background: "rgba(7,10,20,0.7)",
                    borderRadius: "10px",
                    padding: "14px 16px",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    border: "1px solid rgba(59,130,246,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span
                      style={{
                        color: "#3B82F6",
                        fontWeight: 700,
                        minWidth: "70px",
                      }}
                    >
                      Input:
                    </span>
                    <span style={{ color: "rgba(200,214,240,0.85)" }}>
                      {example.input}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span
                      style={{
                        color: "#14B8A6",
                        fontWeight: 700,
                        minWidth: "70px",
                      }}
                    >
                      Output:
                    </span>
                    <span style={{ color: "rgba(200,214,240,0.85)" }}>
                      {example.output}
                    </span>
                  </div>
                  {example.explanation && (
                    <div
                      style={{
                        paddingTop: "10px",
                        borderTop: "1px solid rgba(59,130,246,0.08)",
                        marginTop: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(150,170,210,0.55)",
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        <strong style={{ color: "rgba(200,214,240,0.6)" }}>
                          Explanation:
                        </strong>{" "}
                        {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS */}
        <div style={sectionStyle}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#F0F4FF",
              margin: "0 0 14px",
            }}
          >
            Constraints
          </h2>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {problem.constraints.map((constraint, idx) => (
              <li
                key={idx}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <span
                  style={{ color: "#3B82F6", marginTop: "1px", flexShrink: 0 }}
                >
                  •
                </span>
                <code
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    color: "rgba(200,214,240,0.75)",
                  }}
                >
                  {constraint}
                </code>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap');
      `}</style>
    </div>
  );
}

export default ProblemDescription;
