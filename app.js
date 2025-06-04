const express = require("express");
const cors = require("cors");
const { sendEmail } = require("./services/emailService");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { from, to, subject, text } = req.body;

  try {
    const result = await sendEmail(from, to, subject, text);
    if (result) {
      res.status(200).json({ message: "Email sent successfully!" });
    } else {
      res.status(500).json({ message: "Failed to send email." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while sending the email." });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
