const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());

var data = [];

function isMobileNumber(phone) {
  var mob = /^[1-9]{1}[0-9]{9}$/;

  if (mob.test(phone) == false) {
    console.log("error in no");

    return false;
  }
}

app.post("/", async (req, res) => {
  const { username, date, phone, email } = await req.body;
  const ans = await isMobileNumber(phone);
  if (ans == false) {
    res.status(500);
    res.json({
      message: "Error in phone number",
    });
    return;
  }
  res.json({
    message: "success",
  });

  data = [...data, req.body];
  console.log(data);
});
app.get("/", async (req, res) => {
  res.json({ message: "success" });
});

app.get("/user-list", async (req, res) => {
  await res.send(data);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Example app listening at port :${PORT}`);
});
