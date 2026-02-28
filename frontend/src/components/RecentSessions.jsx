import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";

import { formatDistanceToNow } from "date-fns";

const difficultyColor = {
  easy: {
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.25)",
    text: "#10B981",
  },
  medium: {
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
    text: "#F59E0B",
  },
  hard: {
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
    text: "#EF4444",
  },
};

function DiffBadge({ difficulty }) {
  const d = difficulty?.toLowerCase();
  const c = difficultyColor[d] || difficultyColor.easy;
  return (
    <span
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: "999px",
        padding: "2px 9px",
        fontSize: "11px",
        fontWeight: 600,
        color: c.text,
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      {difficulty}
    </span>
  );
}

function RecentSessions({ sessions, isLoading }) {
  return (
    <div
      style={{
        background: "rgba(15,23,42,0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(20,184,166,0.15)",
        borderRadius: "20px",
        padding: "28px",
        marginTop: "20px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        transition: "border-color 0.25s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(20,184,166,0.28)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(20,184,166,0.15)")
      }
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #14B8A6, #0D9488)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Clock size={18} color="#fff" />
        </div>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "22px",
            color: "#F0F4FF",
            margin: 0,
          }}
        >
          Your Past Sessions
        </h2>
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "16px",
        }}
      >
        {isLoading ? (
          <div
            style={{
              gridColumn: "1/-1",
              display: "flex",
              justifyContent: "center",
              padding: "60px 0",
            }}
          >
            <Loader
              size={36}
              color="#3B82F6"
              style={{ animation: "spin 1s linear infinite" }}
            />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => {
            const isActive = session.status === "active";
            return (
              <div
                key={session._id}
                style={{
                  position: "relative",
                  background: isActive
                    ? "rgba(16,185,129,0.06)"
                    : "rgba(11,16,32,0.6)",
                  border: `1px solid ${isActive ? "rgba(16,185,129,0.25)" : "rgba(59,130,246,0.1)"}`,
                  borderRadius: "16px",
                  padding: "20px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = isActive
                    ? "rgba(16,185,129,0.45)"
                    : "rgba(59,130,246,0.3)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isActive
                    ? "rgba(16,185,129,0.25)"
                    : "rgba(59,130,246,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {isActive && (
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      background: "rgba(16,185,129,0.12)",
                      border: "1px solid rgba(16,185,129,0.25)",
                      borderRadius: "999px",
                      padding: "3px 9px",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#10B981",
                      fontFamily: "'Outfit', sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#10B981",
                        animation: "glowPulse 2s ease-in-out infinite",
                      }}
                    />
                    ACTIVE
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "12px",
                      flexShrink: 0,
                      background: isActive
                        ? "linear-gradient(135deg, #10B981, #059669)"
                        : "linear-gradient(135deg, #3B82F6, #14B8A6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Code2 size={22} color="#fff" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "#F0F4FF",
                        margin: "0 0 6px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {session.problem}
                    </p>
                    <DiffBadge difficulty={session.difficulty} />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      fontSize: "12px",
                      color: "rgba(200,214,240,0.5)",
                    }}
                  >
                    <Clock size={12} />
                    <span>
                      {formatDistanceToNow(new Date(session.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      fontSize: "12px",
                      color: "rgba(200,214,240,0.5)",
                    }}
                  >
                    <Users size={12} />
                    <span>
                      {session.participant ? "2" : "1"} participant
                      {session.participant ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "12px",
                    borderTop: "1px solid rgba(59,130,246,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "rgba(150,170,210,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Completed
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "11px",
                      color: "rgba(150,170,210,0.35)",
                    }}
                  >
                    {new Date(session.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              padding: "60px 0",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                margin: "0 auto 16px",
                background: "rgba(20,184,166,0.08)",
                borderRadius: "20px",
                border: "1px solid rgba(20,184,166,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Trophy size={32} color="rgba(20,184,166,0.4)" />
            </div>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "16px",
                color: "rgba(200,214,240,0.5)",
                margin: "0 0 6px",
              }}
            >
              No sessions yet
            </p>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13px",
                color: "rgba(150,170,210,0.35)",
                margin: 0,
              }}
            >
              Start your coding journey today!
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default RecentSessions;
