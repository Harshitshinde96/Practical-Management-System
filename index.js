import express from "express";

const app = express();
const PORT = 3000;
// const PORT = 3000 || process.env.PORT;
let a=1;
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
