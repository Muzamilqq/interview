import express from "express";
import fetch from "node-fetch"; // if using Node < 18
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Request body:", req.body); // <--- check what frontend is sending
    const { language, code } = req.body;

    const languageMap = {
      javascript: { lang: "nodejs", versionIndex: "3" },
      python: { lang: "python3", versionIndex: "3" },
      java: { lang: "java", versionIndex: "4" },
    };

    const langConfig = languageMap[language];
    if (!langConfig)
      return res.status(400).json({ error: "Unsupported language" });

    const jdoodleResponse = await fetch("https://api.jdoodle.com/v1/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        script: code,
        language: langConfig.lang,
        versionIndex: langConfig.versionIndex,
        clientId: process.env.JD_CLIENT_ID,
        clientSecret: process.env.JD_CLIENT_SECRET,
      }),
    });

    const data = await jdoodleResponse.json();
    console.log("JDoodle response:", data);

    if (data.error) return res.status(400).json({ error: data.error });

    res.json({ output: data.output });
  } catch (err) {
    console.error("Error in /api/run-code:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
