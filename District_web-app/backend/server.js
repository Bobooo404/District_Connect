import express from "express";
import cors from "cors";
import "dotenv/config.js";
import mgnregaRoutes from "./routes/mgnregaRoutes.js";
// import getDistricts from "./routes/getDistricts.js";

const app = express();

// ✅ Configure CORS to allow your frontend domain
app.use(cors({
  origin: [
    "https://district-connect-uaqi.vercel.app", // Frontend (Vercel)
    "http://localhost:5173"                     // Local dev
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api/mgnrega", mgnregaRoutes);
// app.use("/api/get_all_districts", getDistricts);

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.send("✅ MGNREGA API Running");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
