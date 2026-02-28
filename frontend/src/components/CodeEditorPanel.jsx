import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#0B1020",
      }}
    >
      {/* TOOLBAR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px",
          background: "rgba(15,23,42,0.9)",
          borderBottom: "1px solid rgba(59,130,246,0.1)",
          borderTop: "1px solid rgba(59,130,246,0.08)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            style={{ width: "22px", height: "22px" }}
          />
          <select
            style={{
              background: "rgba(11,16,32,0.9)",
              border: "1px solid rgba(59,130,246,0.15)",
              borderRadius: "8px",
              color: "#F0F4FF",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              padding: "6px 10px",
              outline: "none",
              cursor: "pointer",
              transition: "border-color 0.2s",
              appearance: "none",
            }}
            value={selectedLanguage}
            onChange={onLanguageChange}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#3B82F6")}
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "rgba(59,130,246,0.15)")
            }
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key} style={{ background: "#111827" }}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          style={{
            background: isRunning
              ? "rgba(59,130,246,0.15)"
              : "linear-gradient(135deg, #3B82F6, #2563EB)",
            color: isRunning ? "rgba(200,214,240,0.5)" : "#fff",
            border: "none",
            borderRadius: "9px",
            padding: "8px 18px",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: "13px",
            cursor: isRunning ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            boxShadow: isRunning ? "none" : "0 3px 12px rgba(59,130,246,0.3)",
            transition: "all 0.2s",
          }}
          disabled={isRunning}
          onClick={onRunCode}
          onMouseEnter={(e) => {
            if (!isRunning) {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow =
                "0 5px 18px rgba(59,130,246,0.45)";
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 3px 12px rgba(59,130,246,0.3)";
          }}
        >
          {isRunning ? (
            <>
              <Loader2Icon
                size={14}
                style={{ animation: "spin 1s linear infinite" }}
              />{" "}
              Running...
            </>
          ) : (
            <>
              <PlayIcon size={14} /> Run Code
            </>
          )}
        </button>
      </div>

      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 15,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            fontFamily: "'JetBrains Mono', monospace",
            fontLigatures: true,
            padding: { top: 12 },
          }}
        />
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default CodeEditorPanel;
