import dotenv from "dotenv";

dotenv.config();

import express from "express";

import connectDB from "./config/db.js";

import searchRoutes from "./routes/searchRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "E-commerce Search API is running",
  });
});


console.log(
  "Gemini API key loaded:",
  Boolean(process.env.GEMINI_API_KEY)
); 


app.use("/api/search", searchRoutes);

const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();