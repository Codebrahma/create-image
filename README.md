# create-image-cli

## Overview
An Interactive command line tool that simplifies the process of creating image using the [OpenAI Image Generation API](https://platform.openai.com/docs/api-reference/images/create).

## Installation
You can install create-image-cli globally using npm:

```bash
npm install -g create-image-cli
```

Alternatively, you can use npx to run the tool directly without installing it globally:

```bash
npx create-image-cli
```

## Usage

### 1. Generate an API key:
Before using the CLI, make sure you have obtained an API key from OpenAI. You can sign up and get your key [here](https://openai.com/).

### 2. Configure API Key:
Run the following command to set the API key.

```bash
export OPENAI_API_KEY=<YOUR_OPENAI_API_KEY>
```

### 3. Create Image:
Run the following command to initiate the image generation process:

```bash
create-image-cli
```

This command will launch an interactive interface that guides you through the image generation process. You'll be prompted to enter the necessary information, such as the description or prompt for the image, and any additional options. Follow the on-screen instructions to customize the image generation according to your preferences.