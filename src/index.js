#!/usr/bin/env node

import inquirer from "inquirer";
import createImage from "./create-image.js";
import { logApiKeyNotSetMessage, logWelcomeMessage } from "./util.js";

async function start() {
  try {
    logWelcomeMessage();

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

    if (!OPENAI_API_KEY) {
      logApiKeyNotSetMessage();
      return;
    }

    const questions = [
      {
        type: "input",
        name: "description",
        message: "Enter image description (Max 50 characters):",
        validate: function (value) {
          const length = value.trim().length;
          if (length > 0) {
            if (length > 50) {
              return "Description should be less than 50 characters.";
            }
            return true;
          } else {
            return "Please enter a description for image generation.";
          }
        },
      },
      {
        type: "list",
        name: "model",
        message: "Select model:",
        choices: [
          {
            name: "DALL-E 2",
            value: "dall-e-2",
            short: "dall-e-2",
          },
          {
            name: "DALL-E 3",
            value: "dall-e-3",
            short: "dall-e-3",
          },
        ],
      },
      {
        type: "list",
        name: "size",
        message: "Select image size:",
        choices: ["256x256", "512x512", "1024x1024"],
        when: (answers) => answers.model === "dall-e-2",
      },
      {
        type: "list",
        name: "size",
        message: "Select image size:",
        choices: ["1024x1024", "1792x1024", "1024x1792"],
        when: (answers) => answers.model === "dall-e-3",
      },
      {
        type: "list",
        name: "quality",
        message: "Select image quality:",
        choices: [
          {
            name: "Standard",
            value: "standard",
            short: "standard",
          },
          {
            name: "High Definition (HD)",
            value: "hd",
            short: "hd",
          },
        ],
        default: "standard",
        when: (answers) => answers.model === "dall-e-3",
      },
      {
        type: "list",
        name: "style",
        message: "Select image style",
        choices: [
          {
            name: "Vivid (Generates hyper-real and dramatic image)",
            value: "vivid",
            short: "vivid",
          },
          {
            name: "Natural (Generates less hyper-real looking image)",
            value: "natural",
            short: "natural",
          },
        ],
        default: "vivid",
        when: (answers) => answers.model === "dall-e-3",
      },
    ];

    const answers = await inquirer.prompt(questions);

    await createImage(answers);
  } catch (error) {
    console.error("\x1b[31m", "Something went wrong. Please try again.");
  } finally {
    process.exit(0);
  }
}

start();
