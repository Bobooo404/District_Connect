import express from "express";
import { getDistrictData, compareDistrictWithState } from "../controllers/mgnregaController.js";

const router = express.Router();

router.get("/distric_name/:districtName", getDistrictData);
router.get("/compare/:districtName", compareDistrictWithState);
router.get("/get_all_districts", async (req, res) => {
  try {
    const response = await fetch(
        "https://api.data.gov.in/resource/ee03643a-ee4c-48c2-ac30-9f2ff26ab722?api-key=579b464db66ec23bdd00000199d3e91697cc4ab4629d9b4b983d38b0&format=json"
    );
    const data = await response.json();
    console.log(data);
    res.json(data);
    // res.send("hello");
}catch (err) {
    res.status(500).send("Error fetching data");
  }
})

export default router;
