import axios from "axios";
import fs from "fs";

async function createImage(input) {
  try {
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

    const prompt = input.description.toLowerCase();

    console.log("\nCreating image...\n");

    const response = await axios({
      method: "post",
      url: "https://api.openai.com/v1/images/generations",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      data: {
        prompt,
        model: input.model,
        n: 1,
        size: input.size,
        quality: input?.quality || "standard",
      },
    });
    const { data } = response;

    const url = data?.data?.[0]?.url;
    if (!url) {
      console.log("\x1b[31m", "Unable to create image. Please try again.");
      return;
    }

    console.log("Image created successfully.\n");

    console.log("Image URL:\n");
    console.log(url);
    console.log("\n");

    console.log("Downloading image...\n");

    const dir = "created-images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const imagePath = `created-images/image-${data?.created || Date.now()}.png`;

    await axios({
      method: "get",
      url,
      responseType: "stream",
    }).then((response) => {
      response.data.pipe(fs.createWriteStream(imagePath));
    });

    console.log(`Image downloaded at ${process.cwd()}/${imagePath}`);
  } catch (error) {
    console.error("\x1b[31m", "Something went wrong. Please try again.");
  }
}

export default createImage;
