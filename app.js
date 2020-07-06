const express = require("express");
const path = require("path");
const fs = require("fs");
const puppeteer = require("puppeteer-core");
const schedule = require("node-schedule");

const app = express();

const PUBLIC_DIR = path.join(__dirname, "public");

app.get("/download-pdf", async function (req, res) {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    args: ["--no-sandbox", "--headless", "--disable-gpu"],
  });
  const page = await browser.newPage();
  await page.goto(req.query.url);
  const pdfPath = path.join(
    PUBLIC_DIR,
    `${new Date().getTime()}-${Math.round(Math.random() * 1000)}.pdf`
  );
  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();

  res.download(pdfPath);
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send("Server Error");
});

schedule.scheduleJob("* * * * *", function () {
  const fileList = fs.readdirSync(PUBLIC_DIR);
  for (let file of fileList) {
    if (
      new Date().getTime() - (parseInt(file.split("-")[0]) || 0) >
      parseInt(process.env.MAXIMUM_LIFE)
    ) {
      fs.unlinkSync(path.join(PUBLIC_DIR, file));
    }
  }
});

module.exports = app;
