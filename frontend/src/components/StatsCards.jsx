import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div
      style={{
        gridColumn: "span 1",
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "16px",
      }}
    >
      {/* Active Sessions */}
      <div
        style={{
          background: "rgba(15,23,42,0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(59,130,246,0.15)",
          borderRadius: "16px",
          padding: "24px",
          transition: "all 0.25s ease",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(59,130,246,0.35)";
          e.currentTarget.style.boxShadow =
            "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(59,130,246,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(59,130,246,0.15)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(59,130,246,0.12)",
              border: "1px solid rgba(59,130,246,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#3B82F6",
            }}
          >
            <UsersIcon size={22} />
          </div>
          <span
            style={{
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.25)",
              borderRadius: "999px",
              padding: "3px 10px",
              fontSize: "11px",
              fontWeight: 600,
              color: "#3B82F6",
              letterSpacing: "0.04em",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            LIVE
          </span>
        </div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "42px",
            color: "#F0F4FF",
            lineHeight: 1,
          }}
        >
          {activeSessionsCount}
        </div>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "13px",
            color: "rgba(150,170,210,0.55)",
            marginTop: "6px",
          }}
        >
          Active Sessions
        </div>
      </div>

      {/* Total Sessions */}
      <div
        style={{
          background: "rgba(15,23,42,0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(20,184,166,0.15)",
          borderRadius: "16px",
          padding: "24px",
          transition: "all 0.25s ease",
          boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(20,184,166,0.35)";
          e.currentTarget.style.boxShadow =
            "0 12px 40px rgba(0,0,0,0.4), 0 0 20px rgba(20,184,166,0.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(20,184,166,0.15)";
          e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "rgba(20,184,166,0.12)",
              border: "1px solid rgba(20,184,166,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#14B8A6",
            }}
          >
            <TrophyIcon size={22} />
          </div>
        </div>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "42px",
            color: "#F0F4FF",
            lineHeight: 1,
          }}
        >
          {recentSessionsCount}
        </div>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "13px",
            color: "rgba(150,170,210,0.55)",
            marginTop: "6px",
          }}
        >
          Total Sessions
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
