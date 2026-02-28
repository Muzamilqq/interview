function OutputPanel({ output }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0B1020",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "9px 16px",
          background: "rgba(15,23,42,0.9)",
          borderBottom: "1px solid rgba(59,130,246,0.1)",
          borderTop: "1px solid rgba(59,130,246,0.08)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: output?.success
              ? "#10B981"
              : output === null
                ? "rgba(150,170,210,0.3)"
                : "#EF4444",
            boxShadow: output?.success
              ? "0 0 6px rgba(16,185,129,0.5)"
              : output === null
                ? "none"
                : "0 0 6px rgba(239,68,68,0.4)",
          }}
        />
        <span
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: "12px",
            color: "rgba(200,214,240,0.6)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Output
        </span>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
        {output === null ? (
          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "13px",
              color: "rgba(150,170,210,0.35)",
              fontStyle: "italic",
            }}
          >
            Click "Run Code" to see the output here...
          </p>
        ) : output.success ? (
          <pre
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              color: "#10B981",
              whiteSpace: "pre-wrap",
              margin: 0,
              lineHeight: 1.7,
            }}
          >
            {output.output}
          </pre>
        ) : (
          <div>
            {output.output && (
              <pre
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "13px",
                  color: "rgba(200,214,240,0.8)",
                  whiteSpace: "pre-wrap",
                  margin: "0 0 10px",
                  lineHeight: 1.7,
                }}
              >
                {output.output}
              </pre>
            )}
            <pre
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "13px",
                color: "#EF4444",
                whiteSpace: "pre-wrap",
                margin: 0,
                lineHeight: 1.7,
                background: "rgba(239,68,68,0.05)",
                border: "1px solid rgba(239,68,68,0.15)",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            >
              {output.error}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;
