import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";

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
        letterSpacing: "0.03em",
      }}
    >
      {difficulty?.slice(0, 1).toUpperCase() + difficulty?.slice(1)}
    </span>
  );
}

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div
      style={{
        gridColumn: "span 2",
        background: "rgba(15,23,42,0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(59,130,246,0.15)",
        borderRadius: "20px",
        padding: "28px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        transition: "border-color 0.25s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.borderColor = "rgba(59,130,246,0.28)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.borderColor = "rgba(59,130,246,0.15)")
      }
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #3B82F6, #14B8A6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ZapIcon size={18} color="#fff" />
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
            Live Sessions
          </h2>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10B981",
              boxShadow: "0 0 8px rgba(16,185,129,0.6)",
              animation: "glowPulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: "#10B981",
            }}
          >
            {sessions.length} active
          </span>
        </div>
      </div>

      {/* LIST */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxHeight: "400px",
          overflowY: "auto",
          paddingRight: "4px",
        }}
      >
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "60px 0",
            }}
          >
            <LoaderIcon
              size={36}
              color="#3B82F6"
              style={{ animation: "spin 1s linear infinite" }}
            />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              style={{
                background: "rgba(11,16,32,0.6)",
                border: "1px solid rgba(59,130,246,0.1)",
                borderRadius: "14px",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                e.currentTarget.style.background = "rgba(15,23,42,0.8)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.1)";
                e.currentTarget.style.background = "rgba(11,16,32,0.6)";
              }}
            >
              {/* LEFT */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  flex: 1,
                }}
              >
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #3B82F6, #14B8A6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Code2Icon size={22} color="#fff" />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "-3px",
                      right: "-3px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      background: "#10B981",
                      border: "2px solid #0B1020",
                      boxShadow: "0 0 6px rgba(16,185,129,0.5)",
                    }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "#F0F4FF",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {session.problem}
                    </span>
                    <DiffBadge difficulty={session.difficulty} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "12px",
                        color: "rgba(200,214,240,0.55)",
                      }}
                    >
                      <CrownIcon size={12} /> {session.host?.name}
                    </span>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        fontSize: "12px",
                        color: "rgba(200,214,240,0.55)",
                      }}
                    >
                      <UsersIcon size={12} />{" "}
                      {session.participant ? "2/2" : "1/2"}
                    </span>
                    {session.participant && !isUserInSession(session) ? (
                      <span
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          border: "1px solid rgba(239,68,68,0.25)",
                          borderRadius: "999px",
                          padding: "2px 8px",
                          fontSize: "10px",
                          fontWeight: 600,
                          color: "#EF4444",
                        }}
                      >
                        FULL
                      </span>
                    ) : (
                      <span
                        style={{
                          background: "rgba(16,185,129,0.1)",
                          border: "1px solid rgba(16,185,129,0.25)",
                          borderRadius: "999px",
                          padding: "2px 8px",
                          fontSize: "10px",
                          fontWeight: 600,
                          color: "#10B981",
                        }}
                      >
                        OPEN
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* JOIN/FULL BUTTON */}
              {session.participant && !isUserInSession(session) ? (
                <button
                  disabled
                  style={{
                    background: "rgba(59,130,246,0.05)",
                    color: "rgba(200,214,240,0.3)",
                    border: "1px solid rgba(59,130,246,0.08)",
                    borderRadius: "10px",
                    padding: "8px 16px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: "not-allowed",
                  }}
                >
                  Full
                </button>
              ) : (
                <Link
                  to={`/session/${session._id}`}
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                    color: "#fff",
                    textDecoration: "none",
                    borderRadius: "10px",
                    padding: "8px 18px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600,
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: "0 3px 12px rgba(59,130,246,0.3)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 18px rgba(59,130,246,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 3px 12px rgba(59,130,246,0.3)";
                  }}
                >
                  {isUserInSession(session) ? "Rejoin" : "Join"}
                  <ArrowRightIcon size={14} />
                </Link>
              )}
            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div
              style={{
                width: "72px",
                height: "72px",
                margin: "0 auto 16px",
                background: "rgba(59,130,246,0.08)",
                borderRadius: "20px",
                border: "1px solid rgba(59,130,246,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SparklesIcon size={32} color="rgba(59,130,246,0.4)" />
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
              No active sessions
            </p>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13px",
                color: "rgba(150,170,210,0.35)",
                margin: 0,
              }}
            >
              Be the first to create one!
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 8px rgba(16,185,129,0.4); }
          50%       { box-shadow: 0 0 16px rgba(16,185,129,0.7); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default ActiveSessions;
