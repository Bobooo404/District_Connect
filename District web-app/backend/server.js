import express from "express";
import cors from "cors";
import "dotenv/config.js";
import mgnregaRoutes from "./routes/mgnregaRoutes.js";
// import getDistricts from "./routes/getDistricts.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/mgnrega", mgnregaRoutes);
// app.use("/api/get_all_districts", getDistricts);

app.get("/", (req, res) => {
  res.send("✅ MGNREGA API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
