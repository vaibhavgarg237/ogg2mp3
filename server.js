import express from "express";
import ffmpeg from "fluent-ffmpeg";
import * as url from "url";
import path from "path";
import { transcribeAudio } from "./utilities/process-audio";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

//handle file conversion
const BINARY_PATH = path.join(
  __dirname,
  "ffmpegPrebuild",
  "ffmpeg-windows",
  "bin",
  "ffmpeg.exe"
);
ffmpeg.setFfmpegPath(BINARY_PATH);
console.log(`setFfmpegPath call for path[: ${BINARY_PATH} ]`);

const ogg2mp3 = async () => {
  const inputPath = path.join(__dirname, "tmp", "input.ogg");
  const outputPath = path.join(__dirname, "tmp", "output.mp3");

  ffmpeg(inputPath)
    .output(outputPath)
    .on("end", () => {
      console.log("File conversion done");
      // transcribeAudio(outputPath);
    })
    .on("error", (err) => {
      console.log("error occured", err);
    })
    .run();
};
ogg2mp3();
