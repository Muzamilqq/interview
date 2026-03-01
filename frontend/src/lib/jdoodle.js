// src/lib/jdoodle.js

const BACKEND_API = "https://interview-six-omega.vercel.app/api/run-code"; // Your Express backend

/**
 * Executes code via the backend proxy (which calls JDoodle API)
 * @param {string} language - programming language ('javascript', 'python', 'java')
 * @param {string} code - code to execute
 * @returns {Promise<{success: boolean, output?: string, error?: string}>}
 */
export async function executeCode(language, code) {
  try {
    const response = await fetch(
      "https://interview-six-omega.vercel.app/api/run-code",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      },
    );
    if (!response.ok) {
      return { success: false, error: `HTTP ${response.status}` };
    }

    const data = await response.json();

    if (data.error) {
      return { success: false, error: data.error };
    }

    return { success: true, output: data.output || "" };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
