const express = require("express");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
process.env.FFMPEG_PATH = ffmpegPath;
const { transcribeAudio } = require("./utilities/process-audio");

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  console.log("/ called");
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

const ogg2mp3 = async () => {
  const inputPath = path.join(__dirname, "tmp", "input.ogg");
  const outputPath = path.join(__dirname, "tmp", "output.mp3");

  ffmpeg(inputPath)
    .output(outputPath)
    .on("end", () => {
      console.log("File conversion done");
    })
    .on("error", (err) => {
      console.log("error occured", err);
    })
    .run();
};

ogg2mp3();
