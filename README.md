# create-image-cli

## Overview
An Interactive command line tool that simplifies the process of creating image using the [OpenAI Image Generation API](https://platform.openai.com/docs/api-reference/images/create).

## Installation
You can install create-image-cli globally using npm:

```bash
npm install -g create-image-cli
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
#### 1. Interactive Way:

```bash
create-image-cli start
```

This command will launch an interactive interface that guides you through the image generation process. You'll be prompted to enter the necessary information, such as the description or prompt for the image, and any additional options. Follow the on-screen instructions to customize the image generation according to your preferences.

#### 2. Non Interactive Way:

```bash
create-image-cli generate --description "A serene sunset over a mountain lake"
```

#### Options:

- `--description, -d` (Required): Image description or prompt to generate.

- `--model, -m` (Optional): Model to use for image generation.
  - Choices: `dall-e-2`, `dall-e-3`
  - Default: `dall-e-2`

- `--size, -s` (Optional): Size of the image.
  - dall-e-2 choices:  `256x256`, `512x512`, `1024x1024`
  - dall-e-3 choices: `1024x1024`, `1792x1024`, `1024x1792`
  - Default: `1024x1024`

- `--quality, -q` (Optional): Quality of the image. Supports ony for 
`dall-e-3`
  - Choices: `standard`, `hd`.
  - Default: `standard`

- `--style` (Optional): Style of the image. Supports ony for 
`dall-e-3`
  - Choices: `natural`, `vivid`.
  - Default: `natural`
