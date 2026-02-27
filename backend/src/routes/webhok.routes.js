import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/clerk", async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === "user.created") {
      await User.create({
        clerkId: data.id,
        email: data.email_addresses?.[0]?.email_address,
        firstName: data.first_name,
        lastName: data.last_name,
        imageUrl: data.image_url,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
