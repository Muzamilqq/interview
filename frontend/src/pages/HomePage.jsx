import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div
      style={{
        background: "#0B1020",
        minHeight: "100vh",
        fontFamily: "'Outfit', sans-serif",
        backgroundImage: `
        radial-gradient(ellipse 80% 50% at 20% 20%, rgba(59,130,246,0.09) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 80% 80%, rgba(20,184,166,0.07) 0%, transparent 50%)
      `,
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          background: "rgba(11,16,32,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(59,130,246,0.12)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #3B82F6, #14B8A6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(59,130,246,0.3)",
              }}
            >
              <SparklesIcon size={20} color="#fff" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "18px",
                  background: "linear-gradient(135deg, #3B82F6, #14B8A6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "0.06em",
                }}
              >
                Code Mentor
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(150,170,210,0.5)",
                  marginTop: "-2px",
                }}
              >
                Code Together
              </div>
            </div>
          </Link>

          <SignInButton mode="modal">
            <button
              style={{
                background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "10px 22px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 15px rgba(59,130,246,0.35)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 25px rgba(59,130,246,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 4px 15px rgba(59,130,246,0.35)";
              }}
            >
              Get Started <ArrowRightIcon size={16} />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* HERO */}
      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "80px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              animation: "fadeInUp 0.5s ease forwards",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.25)",
                borderRadius: "999px",
                padding: "6px 14px",
                width: "fit-content",
                color: "#3B82F6",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              <ZapIcon size={14} /> Real-time Collaboration
            </div>

            <h1 style={{ margin: 0, lineHeight: 1.1 }}>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(42px, 6vw, 70px)",
                  background:
                    "linear-gradient(135deg, #3B82F6 0%, #14B8A6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "block",
                }}
              >
                Code Together,
              </span>
              <span
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(42px, 6vw, 70px)",
                  color: "#F0F4FF",
                  display: "block",
                }}
              >
                Learn Together
              </span>
            </h1>

            <p
              style={{
                fontSize: "17px",
                color: "rgba(200,214,240,0.7)",
                lineHeight: 1.7,
                margin: 0,
                maxWidth: "480px",
              }}
            >
              The ultimate platform for collaborative coding interviews and pair
              programming. Connect face-to-face, code in real-time, and ace your
              technical interviews.
            </p>

            {/* FEATURE PILLS */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {["Live Video Chat", "Code Editor", "Multi-Language"].map((f) => (
                <div
                  key={f}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    borderRadius: "999px",
                    padding: "6px 14px",
                    color: "#10B981",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  <CheckIcon size={13} /> {f}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <SignInButton mode="modal">
                <button
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #2563EB)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "12px",
                    padding: "14px 28px",
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.4)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 30px rgba(59,130,246,0.55)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(59,130,246,0.4)";
                  }}
                >
                  Start Coding Now <ArrowRightIcon size={18} />
                </button>
              </SignInButton>
              <button
                style={{
                  background: "rgba(59,130,246,0.08)",
                  color: "rgba(200,214,240,0.8)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  borderRadius: "12px",
                  padding: "14px 28px",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: "16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.15)";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.35)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(59,130,246,0.08)";
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)";
                }}
              >
                <VideoIcon size={18} /> Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                background: "rgba(15,23,42,0.65)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(59,130,246,0.12)",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              {[
                { val: "10K+", label: "Active Users", color: "#3B82F6" },
                { val: "50K+", label: "Sessions", color: "#14B8A6" },
                { val: "99.9%", label: "Uptime", color: "#10B981" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    padding: "20px 16px",
                    textAlign: "center",
                    borderRight:
                      i < 2 ? "1px solid rgba(59,130,246,0.1)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize: "28px",
                      color: s.color,
                    }}
                  >
                    {s.val}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "rgba(150,170,210,0.6)",
                      marginTop: "4px",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div style={{ animation: "fadeInUp 0.6s 0.1s ease both" }}>
            <img
              src="/hero.png"
              alt="CodeCollab Platform"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "20px",
                border: "1px solid rgba(59,130,246,0.15)",
                boxShadow:
                  "0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.1)",
                transition: "transform 0.5s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "40px 24px 80px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 40px)",
              color: "#F0F4FF",
              margin: "0 0 16px",
            }}
          >
            Everything You Need to{" "}
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: "linear-gradient(135deg, #3B82F6, #14B8A6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Succeed
            </span>
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: "rgba(200,214,240,0.6)",
              maxWidth: "500px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Powerful features designed to make your coding interviews seamless
            and productive
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
        >
          {[
            {
              icon: <VideoIcon size={28} />,
              title: "HD Video Call",
              desc: "Crystal clear video and audio for seamless communication during interviews",
              color: "#3B82F6",
              glow: "rgba(59,130,246,0.08)",
            },
            {
              icon: <Code2Icon size={28} />,
              title: "Live Code Editor",
              desc: "Collaborate in real-time with syntax highlighting and multiple language support",
              color: "#14B8A6",
              glow: "rgba(20,184,166,0.08)",
            },
            {
              icon: <UsersIcon size={28} />,
              title: "Easy Collaboration",
              desc: "Share your screen, discuss solutions, and learn from each other in real-time",
              color: "#10B981",
              glow: "rgba(16,185,129,0.08)",
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                background: "rgba(15,23,42,0.65)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(59,130,246,0.12)",
                borderRadius: "20px",
                padding: "36px 28px",
                textAlign: "center",
                transition: "all 0.25s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
                e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.4), 0 0 30px ${f.glow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.12)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "16px",
                  background: `${f.glow.replace("0.08", "0.15")}`,
                  border: `1px solid ${f.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  color: f.color,
                }}
              >
                {f.icon}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "18px",
                  color: "#F0F4FF",
                  margin: "0 0 12px",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "rgba(200,214,240,0.6)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@500&family=Outfit:wght@400;500;600;700&display=swap');
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
