const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const transcribeAudio = async (filePath) => {
  const formData = new FormData();
  formData.append("model", "whisper-1");
  formData.append("file", fs.createReadStream(filePath));
  console.log(filePath);
  axios
    .post("https://api.openai.com/v1/audio/transcriptions", formData, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": `multipart/form-data; boundary=${formData._boundary} `,
      },
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.error(error.response.data);
    });
};

// transcribeAudio(outputPath);

// export { transcribeAudio };
module.exports = {
  transcribeAudio,
};
