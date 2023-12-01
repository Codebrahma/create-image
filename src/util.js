export const logWelcomeMessage = () => {
  console.log(
    "\x1b[36m",
    "┌──────────────────────────────────────────────────┐"
  );
  console.log(
    "\x1b[36m",
    "│ Welcome to Create Image CLI!                     │"
  );
  console.log(
    "\x1b[36m",
    "│                                                  │"
  );
  console.log(
    "\x1b[36m",
    "│ Create image using OpenAI's image generation API │"
  );
  console.log(
    "\x1b[36m",
    "│                                                  │"
  );
  console.log(
    "\x1b[36m",
    "└──────────────────────────────────────────────────┘"
  );
  console.log("\n");
};

export const logApiKeyNotSetMessage = () => {
  console.error("\x1b[33m", "OPENAI_API_KEY environment variable not set.");
  console.log("\x1b[33m", "Set by running the following command:");
  console.log("\x1b[33m", "export OPENAI_API_KEY=<your_openai_api_key>");
};
