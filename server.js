const express = require("express");
const axios = require("axios");
const app = express();

const LIVY_URL =
  "http://ec2-15-207-54-150.ap-south-1.compute.amazonaws.com:8998";

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const response = await axios.post(`${LIVY_URL}/batches`, req.body, {
      headers: { "Content-Type": "application/json" },
    });

    res.json("hi");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.post("/submit", async (req, res) => {
  try {
    const response = await axios.post(`${LIVY_URL}/batches`, req.body, {
      headers: { "Content-Type": "application/json" },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.get("/status/:job_id", async (req, res) => {
  console.log("Checking job status for:", req.params.job_id);
  try {
    const response = await axios.get(
      `${LIVY_URL}/batches/${req.params.job_id}`
    );
    console.log("Job status response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error checking job status:", error.toString());
    res.status(500).send(error.toString());
  }
});

app.get("/result/:job_id", async (req, res) => {
  console.log("Retrieving job result for:", req.params.job_id);
  try {
    const response = await axios.get(
      `${LIVY_URL}/batches/${req.params.job_id}/log`
    );
    console.log("Job result response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error retrieving job result:", error.toString());
    res.status(500).send(error.toString());
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
