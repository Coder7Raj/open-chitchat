import express from "express";

const PORT = process.env.PORT || 4000;
const app = express();

app.get("/api/auth/signup", (req, res) => {
  res.send("signup is working");
});
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
