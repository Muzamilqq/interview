import { Code2Icon, LoaderIcon, PlusIcon, XIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        animation: "fadeInUp 0.25s ease forwards",
      }}
    >
      {/* BACKDROP */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(7, 10, 20, 0.8)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      />

      {/* MODAL BOX */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(13, 19, 34, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: "20px",
          padding: "32px",
          width: "100%",
          maxWidth: "540px",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(59,130,246,0.06)",
        }}
      >
        {/* CLOSE BTN */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.15)",
            borderRadius: "8px",
            padding: "6px",
            cursor: "pointer",
            color: "rgba(200,214,240,0.5)",
            display: "flex",
            alignItems: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(59,130,246,0.15)";
            e.currentTarget.style.color = "#F0F4FF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(59,130,246,0.08)";
            e.currentTarget.style.color = "rgba(200,214,240,0.5)";
          }}
        >
          <XIcon size={16} />
        </button>

        {/* TITLE */}
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "24px",
            color: "#F0F4FF",
            margin: "0 0 28px",
          }}
        >
          Create New Session
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* PROBLEM SELECT */}
          <div>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: "rgba(200,214,240,0.7)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              <span>Select Problem</span>
              <span style={{ color: "#EF4444", fontSize: "11px" }}>
                Required
              </span>
            </label>
            <select
              style={{
                width: "100%",
                background: "rgba(11,16,32,0.9)",
                border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: "12px",
                color: "#F0F4FF",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                padding: "12px 16px",
                outline: "none",
                cursor: "pointer",
                appearance: "none",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find(
                  (p) => p.title === e.target.value,
                );
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#3B82F6";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(59,130,246,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <option
                value=""
                disabled
                style={{ background: "#111827", color: "#F0F4FF" }}
              >
                Choose a coding problem...
              </option>
              {problems.map((problem) => (
                <option
                  key={problem.id}
                  value={problem.title}
                  style={{ background: "#111827", color: "#F0F4FF" }}
                >
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div
              style={{
                background: "rgba(20,184,166,0.06)",
                border: "1px solid rgba(20,184,166,0.2)",
                borderRadius: "12px",
                padding: "16px 18px",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                animation: "fadeInUp 0.2s ease forwards",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  flexShrink: 0,
                  background: "rgba(20,184,166,0.15)",
                  border: "1px solid rgba(20,184,166,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#14B8A6",
                }}
              >
                <Code2Icon size={18} />
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "13px",
                    color: "#14B8A6",
                    margin: "0 0 6px",
                  }}
                >
                  Room Summary
                </p>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "13px",
                    color: "rgba(200,214,240,0.7)",
                    margin: "0 0 3px",
                  }}
                >
                  Problem:{" "}
                  <span style={{ color: "#F0F4FF", fontWeight: 600 }}>
                    {roomConfig.problem}
                  </span>
                </p>
                <p
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "13px",
                    color: "rgba(200,214,240,0.7)",
                    margin: 0,
                  }}
                >
                  Max:{" "}
                  <span style={{ color: "#F0F4FF", fontWeight: 600 }}>
                    2 participants (1-on-1)
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ACTIONS */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "32px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "rgba(59,130,246,0.06)",
              color: "rgba(200,214,240,0.7)",
              border: "1px solid rgba(59,130,246,0.15)",
              borderRadius: "12px",
              padding: "11px 22px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(59,130,246,0.12)";
              e.currentTarget.style.color = "#F0F4FF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(59,130,246,0.06)";
              e.currentTarget.style.color = "rgba(200,214,240,0.7)";
            }}
          >
            Cancel
          </button>
          <button
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
            style={{
              background:
                isCreating || !roomConfig.problem
                  ? "rgba(59,130,246,0.2)"
                  : "linear-gradient(135deg, #3B82F6, #2563EB)",
              color:
                isCreating || !roomConfig.problem
                  ? "rgba(200,214,240,0.4)"
                  : "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "11px 26px",
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              cursor:
                isCreating || !roomConfig.problem ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow:
                isCreating || !roomConfig.problem
                  ? "none"
                  : "0 4px 15px rgba(59,130,246,0.3)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!isCreating && roomConfig.problem) {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 22px rgba(59,130,246,0.45)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(59,130,246,0.3)";
            }}
          >
            {isCreating ? (
              <LoaderIcon
                size={16}
                style={{ animation: "spin 1s linear infinite" }}
              />
            ) : (
              <PlusIcon size={16} />
            )}
            {isCreating ? "Creating..." : "Create Session"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default CreateSessionModal;
