import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div
      style={{
        padding: "48px 24px 24px",
        maxWidth: "1280px",
        margin: "0 auto",
        animation: "fadeInUp 0.4s ease forwards",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        {/* LEFT */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #3B82F6, #14B8A6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 24px rgba(59,130,246,0.35)",
              flexShrink: 0,
            }}
          >
            <SparklesIcon size={24} color="#fff" />
          </div>
          <div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(26px, 4vw, 38px)",
                margin: 0,
                background: "linear-gradient(135deg, #3B82F6, #14B8A6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Welcome back, {user?.firstName || "there"}!
            </h1>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "15px",
                color: "rgba(200,214,240,0.6)",
                margin: "4px 0 0",
              }}
            >
              Ready to level up your coding skills?
            </p>
          </div>
        </div>

        {/* CREATE SESSION BTN */}
        <button
          onClick={onCreateSession}
          style={{
            background: "linear-gradient(135deg, #14B8A6, #0D9488)",
            color: "#fff",
            border: "none",
            borderRadius: "14px",
            padding: "14px 28px",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 4px 20px rgba(20,184,166,0.35)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 30px rgba(20,184,166,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 20px rgba(20,184,166,0.35)";
          }}
        >
          <ZapIcon size={18} />
          <span>New Session</span>
          <ArrowRightIcon size={16} style={{ transition: "transform 0.2s" }} />
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default WelcomeSection;
