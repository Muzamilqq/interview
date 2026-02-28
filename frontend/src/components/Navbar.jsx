import { Link, useLocation } from "react-router";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        background: "rgba(11, 16, 32, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(59, 130, 246, 0.12)",
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
        {/* LOGO */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            transition: "transform 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.03)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
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
            </span>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "10px",
                color: "rgba(150,170,210,0.5)",
                marginTop: "-2px",
                letterSpacing: "0.04em",
              }}
            >
              Code Together
            </span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <NavLink
            to="/problems"
            active={isActive("/problems")}
            icon={<BookOpenIcon size={16} />}
            label="Problems"
          />
          <NavLink
            to="/dashboard"
            active={isActive("/dashboard")}
            icon={<LayoutDashboardIcon size={16} />}
            label="Dashboard"
          />
          <div style={{ marginLeft: "12px" }}>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, active, icon, label }) {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    borderRadius: "10px",
    textDecoration: "none",
    fontFamily: "'Outfit', sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    transition: "all 0.2s ease",
  };
  const activeStyle = {
    ...baseStyle,
    background:
      "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(20,184,166,0.1))",
    color: "#3B82F6",
    border: "1px solid rgba(59,130,246,0.25)",
  };
  const inactiveStyle = {
    ...baseStyle,
    color: "rgba(200,214,240,0.6)",
    border: "1px solid transparent",
  };

  return (
    <Link
      to={to}
      style={active ? activeStyle : inactiveStyle}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "rgba(59,130,246,0.08)";
          e.currentTarget.style.color = "rgba(200,214,240,0.9)";
          e.currentTarget.style.borderColor = "rgba(59,130,246,0.12)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "rgba(200,214,240,0.6)";
          e.currentTarget.style.borderColor = "transparent";
        }
      }}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default Navbar;
