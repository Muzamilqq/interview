import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/jdoodle";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

const difficultyStyle = {
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

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const {
    data: sessionData,
    isLoading: loadingSession,
    refetch,
  } = useSessionById(id);
  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, isParticipant);

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    problemData?.starterCode?.[selectedLanguage] || "",
  );

  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;
    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problemData?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (
      confirm(
        "Are you sure you want to end this session? All participants will be notified.",
      )
    ) {
      endSessionMutation.mutate(id, {
        onSuccess: () => navigate("/dashboard"),
      });
    }
  };

  const diff = session?.difficulty?.toLowerCase();
  const diffC = difficultyStyle[diff] || difficultyStyle.easy;

  const sectionStyle = {
    background: "rgba(11,16,32,0.6)",
    border: "1px solid rgba(59,130,246,0.08)",
    borderRadius: "12px",
    padding: "18px",
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "#0B1020",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <div style={{ flex: 1, overflow: "hidden" }}>
        <PanelGroup direction="horizontal">
          {/* LEFT PANEL */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              {/* PROBLEM PANEL */}
              <Panel defaultSize={50} minSize={20}>
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
                      padding: "20px 24px",
                      background: "rgba(15,23,42,0.85)",
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
                      }}
                    >
                      <div>
                        <h1
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 800,
                            fontSize: "20px",
                            color: "#F0F4FF",
                            margin: "0 0 6px",
                          }}
                        >
                          {session?.problem || "Loading..."}
                        </h1>
                        {problemData?.category && (
                          <p
                            style={{
                              fontSize: "11px",
                              fontFamily: "'JetBrains Mono', monospace",
                              color: "rgba(150,170,210,0.45)",
                              margin: "0 0 4px",
                            }}
                          >
                            {problemData.category}
                          </p>
                        )}
                        <p
                          style={{
                            fontSize: "12px",
                            color: "rgba(150,170,210,0.5)",
                            margin: 0,
                          }}
                        >
                          Host: {session?.host?.name || "..."} ·{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </p>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            background: diffC.bg,
                            border: `1px solid ${diffC.border}`,
                            borderRadius: "999px",
                            padding: "4px 12px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: diffC.text,
                          }}
                        >
                          {session?.difficulty?.slice(0, 1).toUpperCase() +
                            session?.difficulty?.slice(1)}
                        </span>
                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            style={{
                              background: "rgba(239,68,68,0.1)",
                              color: "#EF4444",
                              border: "1px solid rgba(239,68,68,0.25)",
                              borderRadius: "9px",
                              padding: "7px 14px",
                              fontFamily: "'Outfit', sans-serif",
                              fontWeight: 600,
                              fontSize: "12px",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              transition: "all 0.2s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(239,68,68,0.2)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(239,68,68,0.1)")
                            }
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon
                                size={13}
                                style={{ animation: "spin 1s linear infinite" }}
                              />
                            ) : (
                              <LogOutIcon size={13} />
                            )}
                            End Session
                          </button>
                        )}
                        {session?.status === "completed" && (
                          <span
                            style={{
                              background: "rgba(150,170,210,0.08)",
                              border: "1px solid rgba(150,170,210,0.15)",
                              borderRadius: "999px",
                              padding: "4px 12px",
                              fontSize: "12px",
                              color: "rgba(150,170,210,0.5)",
                            }}
                          >
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      padding: "18px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "14px",
                    }}
                  >
                    {problemData?.description && (
                      <div style={sectionStyle}>
                        <h2
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "#F0F4FF",
                            margin: "0 0 12px",
                          }}
                        >
                          Description
                        </h2>
                        <p
                          style={{
                            fontSize: "13px",
                            lineHeight: 1.75,
                            color: "rgba(200,214,240,0.8)",
                            margin: 0,
                          }}
                        >
                          {problemData.description.text}
                        </p>
                        {problemData.description.notes?.map((note, i) => (
                          <p
                            key={i}
                            style={{
                              fontSize: "13px",
                              lineHeight: 1.75,
                              color: "rgba(200,214,240,0.75)",
                              margin: "8px 0 0",
                            }}
                          >
                            {note}
                          </p>
                        ))}
                      </div>
                    )}

                    {problemData?.examples?.length > 0 && (
                      <div style={sectionStyle}>
                        <h2
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "#F0F4FF",
                            margin: "0 0 14px",
                          }}
                        >
                          Examples
                        </h2>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                          }}
                        >
                          {problemData.examples.map((example, idx) => (
                            <div key={idx}>
                              <p
                                style={{
                                  fontFamily: "'Outfit', sans-serif",
                                  fontWeight: 600,
                                  fontSize: "12px",
                                  color: "rgba(200,214,240,0.6)",
                                  margin: "0 0 6px",
                                }}
                              >
                                Example {idx + 1}
                              </p>
                              <div
                                style={{
                                  background: "rgba(7,10,20,0.7)",
                                  borderRadius: "9px",
                                  padding: "12px",
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: "12px",
                                  border: "1px solid rgba(59,130,246,0.06)",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "5px",
                                }}
                              >
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <span
                                    style={{
                                      color: "#3B82F6",
                                      fontWeight: 700,
                                      minWidth: "65px",
                                    }}
                                  >
                                    Input:
                                  </span>
                                  <span
                                    style={{ color: "rgba(200,214,240,0.8)" }}
                                  >
                                    {example.input}
                                  </span>
                                </div>
                                <div style={{ display: "flex", gap: "8px" }}>
                                  <span
                                    style={{
                                      color: "#14B8A6",
                                      fontWeight: 700,
                                      minWidth: "65px",
                                    }}
                                  >
                                    Output:
                                  </span>
                                  <span
                                    style={{ color: "rgba(200,214,240,0.8)" }}
                                  >
                                    {example.output}
                                  </span>
                                </div>
                                {example.explanation && (
                                  <div
                                    style={{
                                      paddingTop: "8px",
                                      borderTop:
                                        "1px solid rgba(59,130,246,0.06)",
                                      marginTop: "3px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "11px",
                                        color: "rgba(150,170,210,0.5)",
                                        fontFamily: "'Outfit', sans-serif",
                                      }}
                                    >
                                      <strong>Explanation:</strong>{" "}
                                      {example.explanation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {problemData?.constraints?.length > 0 && (
                      <div style={sectionStyle}>
                        <h2
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontWeight: 700,
                            fontSize: "15px",
                            color: "#F0F4FF",
                            margin: "0 0 12px",
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
                            gap: "7px",
                          }}
                        >
                          {problemData.constraints.map((c, i) => (
                            <li key={i} style={{ display: "flex", gap: "8px" }}>
                              <span style={{ color: "#3B82F6", flexShrink: 0 }}>
                                •
                              </span>
                              <code
                                style={{
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: "12px",
                                  color: "rgba(200,214,240,0.7)",
                                }}
                              >
                                {c}
                              </code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle
                style={{
                  height: "4px",
                  background: "rgba(59,130,246,0.08)",
                  cursor: "row-resize",
                }}
              />

              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(v) => setCode(v)}
                      onRunCode={handleRunCode}
                    />
                  </Panel>
                  <PanelResizeHandle
                    style={{
                      height: "4px",
                      background: "rgba(59,130,246,0.08)",
                      cursor: "row-resize",
                    }}
                  />
                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>

          <PanelResizeHandle
            style={{
              width: "4px",
              background: "rgba(59,130,246,0.08)",
              cursor: "col-resize",
            }}
          />

          {/* RIGHT PANEL - VIDEO */}
          <Panel defaultSize={50} minSize={30}>
            <div
              style={{
                height: "100%",
                background: "#0B1020",
                padding: "12px",
                overflow: "auto",
              }}
            >
              {isInitializingCall ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <Loader2Icon
                      size={40}
                      color="#3B82F6"
                      style={{
                        animation: "spin 1s linear infinite",
                        display: "block",
                        margin: "0 auto 16px",
                      }}
                    />
                    <p
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "16px",
                        color: "rgba(200,214,240,0.6)",
                      }}
                    >
                      Connecting to video call...
                    </p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(15,23,42,0.8)",
                      border: "1px solid rgba(239,68,68,0.2)",
                      borderRadius: "20px",
                      padding: "40px",
                      textAlign: "center",
                      maxWidth: "360px",
                    }}
                  >
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        margin: "0 auto 20px",
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.15)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PhoneOffIcon size={36} color="rgba(239,68,68,0.6)" />
                    </div>
                    <h2
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 800,
                        fontSize: "22px",
                        color: "#F0F4FF",
                        margin: "0 0 10px",
                      }}
                    >
                      Connection Failed
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "14px",
                        color: "rgba(200,214,240,0.5)",
                        margin: 0,
                      }}
                    >
                      Unable to connect to the video call
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{ height: "100%" }}>
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800&family=JetBrains+Mono:wght@400;500&family=Outfit:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default SessionPage;
