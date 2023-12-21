#!/usr/bin/env node

import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import inquirer from "inquirer";
import createImage from "./create-image.js";
import { logApiKeyNotSetMessage, logWelcomeMessage } from "./util.js";

async function start(argv) {
  try {
    logWelcomeMessage();

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

    if (!OPENAI_API_KEY) {
      logApiKeyNotSetMessage();
      return;
    }

    let options = {
      ...argv,
    };
    if (argv?._?.[0] === "start") {
      const descriptionMaxLen = 1000;

      const questions = [
        {
          type: "input",
          name: "description",
          message: "Enter image description:",
          validate: function (value) {
            const length = value.trim().length;
            if (length > 0) {
              if (length > descriptionMaxLen) {
                return `Description should be less than ${descriptionMaxLen} characters.`;
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

      options = await inquirer.prompt(questions);
    }

    await createImage(options);
  } catch (error) {
    console.error(
      "\x1b[31m",
      `Something went wrong. Please try again. ${error?.message || ""}`
    );
  } finally {
    process.exit(0);
  }
}

const argv = yargs(hideBin(process.argv))
  .command(
    "start",
    "Generate Image in an interactive way by selecting the necessary choices."
  )
  .command(
    "generate",
    "Generate Image in non-interactive way by passing the necessary options.",
    (_yargs) => {
      return _yargs
        .option("description", {
          alias: "d",
          describe: "Image description",
          demandOption: true,
        })
        .option("model", {
          alias: "m",
          describe: "Model",
          default: "dall-e-2",
          choices: ["dall-e-2", "dall-e-3"],
        })
        .option("size", {
          alias: "s",
          describe: "Size",
          default: "1024x1024",
        })
        .option("quality", {
          alias: "q",
          describe: "Quality (Supports Only for DALL-E 3 Model)",
        })
        .option("style", {
          describe: "Style (Supports Only for DALL-E 3 Model)",
        })
        .check((_argv) => {
          const isDallE3 = _argv.model === "dall-e-3";

          // Description validation
          const desc = _argv.description.trim();
          const descLen = desc.length;
          if (descLen === 0) {
            throw new Error("Please enter a description for image generation.");
          } else if (descLen > 1000) {
            throw new Error(`Description should be less than 1000 characters.`);
          }

          // Size validation
          const sizes = isDallE3
            ? ["1024x1024", "1792x1024", "1024x1792"]
            : ["256x256", "512x512", "1024x1024"];
          if (!sizes.includes(_argv.size)) {
            throw new Error(
              `Invalid size for model ${
                _argv.model
              }. Valid sizes are: ${sizes.join(", ")}`
            );
          }

          // Quality validation
          if (isDallE3) {
            const qualities = ["standard", "hd"];
            if (!_argv.quality) {
              _argv.quality = "standard";
            }
            if (!qualities.includes(_argv.quality)) {
              throw new Error(
                `Invalid quality for model ${
                  _argv.model
                }. Valid qualities are: ${qualities.join(", ")}`
              );
            }
          } else if (_argv.quality) {
            delete _argv.quality;
            delete _argv.q;
          }

          // Style validation
          if (isDallE3) {
            const styles = ["natural", "vivid"];
            if (!_argv.style) {
              _argv.style = "natural";
            }
            if (!styles.includes(_argv.style)) {
              throw new Error(
                `Invalid style for model ${
                  _argv.model
                }. Valid styles are: ${styles.join(", ")}`
              );
            }
          } else if (_argv.style) {
            delete _argv.style;
          }

          return true;
        });
    }
  )
  .demandCommand(1, "")
  .showHelpOnFail(true)
  .strict().argv;

start(argv);
