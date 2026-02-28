import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (callingState === CallingState.JOINING) {
    return (
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
              color: "rgba(200,214,240,0.7)",
            }}
          >
            Joining call...
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        gap: "12px",
        position: "relative",
      }}
      className="str-video"
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* TOOLBAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "rgba(15,23,42,0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(59,130,246,0.12)",
            borderRadius: "12px",
            padding: "10px 16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <UsersIcon size={16} color="#3B82F6" />
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "14px",
                color: "rgba(200,214,240,0.8)",
              }}
            >
              {participantCount}{" "}
              {participantCount === 1 ? "participant" : "participants"}
            </span>
          </div>

          {chatClient && channel && (
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              style={{
                background: isChatOpen
                  ? "rgba(59,130,246,0.2)"
                  : "rgba(59,130,246,0.08)",
                border: `1px solid ${isChatOpen ? "rgba(59,130,246,0.35)" : "rgba(59,130,246,0.15)"}`,
                borderRadius: "8px",
                padding: "6px 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                color: isChatOpen ? "#3B82F6" : "rgba(200,214,240,0.6)",
                transition: "all 0.2s",
              }}
            >
              <MessageSquareIcon size={14} /> Chat
            </button>
          )}
        </div>

        {/* VIDEO */}
        <div
          style={{
            flex: 1,
            background: "rgba(11,16,32,0.8)",
            border: "1px solid rgba(59,130,246,0.1)",
            borderRadius: "14px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <SpeakerLayout />
        </div>

        {/* CONTROLS */}
        <div
          style={{
            background: "rgba(15,23,42,0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(59,130,246,0.1)",
            borderRadius: "12px",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CallControls onLeave={() => navigate("/dashboard")} />
        </div>
      </div>

      {/* CHAT PANEL */}
      {chatClient && channel && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "14px",
            overflow: "hidden",
            background: "#1a1f2e",
            border: "1px solid rgba(59,130,246,0.12)",
            transition: "all 0.3s ease",
            width: isChatOpen ? "300px" : "0px",
            opacity: isChatOpen ? 1 : 0,
            flexShrink: 0,
          }}
        >
          {isChatOpen && (
            <>
              <div
                style={{
                  background: "rgba(15,23,42,0.9)",
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(59,130,246,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "14px",
                    color: "#F0F4FF",
                  }}
                >
                  Session Chat
                </span>
                <button
                  onClick={() => setIsChatOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "rgba(200,214,240,0.4)",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#F0F4FF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(200,214,240,0.4)")
                  }
                >
                  <XIcon size={16} />
                </button>
              </div>
              <div
                style={{ flex: 1, overflow: "hidden" }}
                className="stream-chat-dark"
              >
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default VideoCallUI;
