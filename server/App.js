const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/crm", require("./routes/crm.routes"));
app.use("/api/geo", require("./routes/geo.routes"));


async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.log(`Server error ${e.message}`);
    process.exit();
  }
}

start();
