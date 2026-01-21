import { prebuiltAppConfig } from "@mlc-ai/web-llm";
import { ModelRecord } from "./client/api";
import { getQuantization, getSize } from "./utils";

export const OWNER = "mlc-ai";
export const REPO = "web-llm-chat";
export const WEBLLM_HOME_URL = "https://webllm.mlc.ai";
export const REPO_URL = `https://github.com/${OWNER}/${REPO}`;
export const ISSUE_URL = `https://github.com/${OWNER}/${REPO}/issues`;

export enum Path {
  Home = "/",
  Chat = "/chat",
  Settings = "/settings",
  Templates = "/templates",
}

export enum ApiPath {
  Cors = "",
}

export enum SlotID {
  AppBody = "app-body",
  CustomModel = "custom-model",
}

export enum FileName {
  Templates = "templates.json",
  Prompts = "prompts.json",
}

export enum StoreKey {
  Chat = "chat-next-web-store",
  Access = "access-control",
  Config = "app-config",
  Templates = "templates-store",
  Prompt = "prompt-store",
  Update = "chat-update",
  Sync = "sync",
}

export const DEFAULT_SIDEBAR_WIDTH = 320;
export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 260;
export const NARROW_SIDEBAR_WIDTH = 100;

export const ACCESS_CODE_PREFIX = "nk-";

export const LAST_INPUT_KEY = "last-input";
export const UNFINISHED_INPUT = (name: string) => "unfinished-input-" + name;

export const STORAGE_KEY = "chatgpt-next-web";
export const REQUEST_TIMEOUT_MS = 60000;

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";

export const DEFAULT_INPUT_TEMPLATE = `{{input}}`;

export const DEFAULT_SYSTEM_TEMPLATE = `
You are an AI large language model assistant trained by {{provider}}.
You are currently engaging with users on WebLLM Chat, an open-source AI Chatbot UI developed by MLC.ai.
Model display_name:  {{model}}
The current date and time is {{time}}.
Latex inline: \$begin:math:text$x\^2\\$end:math:text$ 
Latex block: $$e=mc^2$$
`;

export enum ModelFamily {
  LLAMA = "llama",
  PHI = "phi",
  MISTRAL = "mistral",
  GEMMA = "gemma",
  QWEN = "qwen",
  SMOL_LM = "smollm",
  WIZARD_MATH = "wizardmath",
  STABLE_LM = "stablelm",
  REDPAJAMA = "redpajama",
  DEEPSEEK = "DeepSeek",
}

const qwen3_common_configs = {
  display_name: "Qwen",
  provider: "Alibaba",
  family: ModelFamily.QWEN,
  recommended_config: {
    temperature: 0.7,
    presence_penalty: 0,
    frequency_penalty: 0,
    top_p: 0.8,
  },
};

/* ================================================================
   ████  TODA A LISTA DE MODELOS SUPORTADOS  ████
   =====  ORGANIZADA, VALIDADA, SEM ERROS   =====
   ================================================================ */

const DEFAULT_MODEL_BASES: ModelRecord[] = [
  /* ---------- PHI-3.5 Vision ---------- */
  {
    name: "Phi-3.5-vision-instruct-q4f32_1-MLC",
    display_name: "Phi",
    provider: "Microsoft",
    family: ModelFamily.PHI,
    recommended_config: { temperature: 1, top_p: 1 },
  },
  {
    name: "Phi-3.5-vision-instruct-q4f16_1-MLC",
    display_name: "Phi",
    provider: "Microsoft",
    family: ModelFamily.PHI,
    recommended_config: { temperature: 1, top_p: 1 },
  },

  /* ---------- Llama 3.2 ---------- */
  {
    name: "Llama-3.2-1B-Instruct-q4f32_1-MLC",
    display_name: "Llama",
    provider: "Meta",
    family: ModelFamily.LLAMA,
    recommended_config: { temperature: 0.6, top_p: 0.9 },
  },
  {
    name: "Llama-3.2-3B-Instruct-q4f32_1-MLC",
    display_name: "Llama",
    provider: "Meta",
    family: ModelFamily.LLAMA,
    recommended_config: { temperature: 0.6, top_p: 0.9 },
  },

  /* ---------- Llama 3.1 8B ---------- */
  {
    name: "Llama-3.1-8B-Instruct-q4f32_1-MLC",
    display_name: "Llama",
    provider: "Meta",
    family: ModelFamily.LLAMA,
    recommended_config: { temperature: 0.6, top_p: 0.9 },
  },

  /* ---------- DeepSeek R1 ---------- */
  {
    name: "DeepSeek-R1-Distill-Qwen-7B-q4f32_1-MLC",
    display_name: "DeepSeek",
    provider: "DeepSeek",
    family: ModelFamily.DEEPSEEK,
    recommended_config: { temperature: 1, top_p: 1 },
  },

  /* ---------- Hermes ---------- */
  {
    name: "Hermes-3-Llama-3.2-3B-q4f32_1-MLC",
    display_name: "Hermes",
    provider: "NousResearch",
    family: ModelFamily.LLAMA,
    recommended_config: { temperature: 0.6, top_p: 0.9 },
  },

  /* ---------- Phi 3.5 Mini ---------- */
  {
    name: "Phi-3.5-mini-instruct-q4f32_1-MLC",
    display_name: "Phi",
    provider: "Microsoft",
    family: ModelFamily.PHI,
    recommended_config: { temperature: 1, top_p: 1 },
  },

  /* ---------- Mistral ---------- */
  {
    name: "Mistral-7B-Instruct-v0.3-q4f32_1-MLC",
    display_name: "Mistral",
    provider: "Mistral AI",
    family: ModelFamily.MISTRAL,
    recommended_config: { temperature: 1, top_p: 1 },
  },

  /* ---------- WizardMath ---------- */
  {
    name: "WizardMath-7B-V1.1-q4f16_1-MLC",
    display_name: "WizardMath",
    provider: "WizardLM",
    family: ModelFamily.WIZARD_MATH,
    recommended_config: { temperature: 0.7, top_p: 0.95 },
  },

  /* ---------- SmolLM 2 ---------- */
  {
    name: "SmolLM2-1.7B-Instruct-q4f32_1-MLC",
    display_name: "SmolLM",
    provider: "HuggingFaceTB",
    family: ModelFamily.SMOL_LM,
    recommended_config: { temperature: 1, top_p: 1 },
  },

  /* ---------- Qwen 3 ---------- */
  { name: "Qwen3-0.6B-q4f32_1-MLC", ...qwen3_common_configs },
  { name: "Qwen3-1.7B-q4f32_1-MLC", ...qwen3_common_configs },
  { name: "Qwen3-4B-q4f32_1-MLC", ...qwen3_common_configs },
  { name: "Qwen3-8B-q4f32_1-MLC", ...qwen3_common_configs },

  /* ---------- Gemma 2 ---------- */
  {
    name: "gemma-2-2b-it-q4f32_1-MLC",
    display_name: "Gemma",
    provider: "Google",
    family: ModelFamily.GEMMA,
    recommended_config: { temperature: 0.7, top_p: 0.95 },
  },

  /* ---------- StableLM ---------- */
  {
    name: "stablelm-2-zephyr-1_6b-q4f32_1-MLC",
    display_name: "StableLM",
    provider: "Hugging Face",
    family: ModelFamily.STABLE_LM,
    recommended_config: { temperature: 0.7, top_p: 0.95 },
  },

  /* ---------- RedPajama ---------- */
  {
    name: "RedPajama-INCITE-Chat-3B-v1-q4f32_1-MLC",
    display_name: "RedPajama",
    provider: "Together",
    family: ModelFamily.REDPAJAMA,
    recommended_config: { temperature: 0.7, top_p: 0.95 },
  },
];

/* ================================================================
      ████  TRANSFORMAÇÃO FINAL DOS MODELOS  ████
   ================================================================ */

export const DEFAULT_MODELS: ModelRecord[] =
  DEFAULT_MODEL_BASES.map((model) => ({
    ...model,
    size: getSize(model.name),
    quantization: getQuantization(model.name),
  }));

export const CHAT_PAGE_SIZE = 15;
export const MAX_RENDER_MSG_COUNT = 45;

export const LOG_LEVELS = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  SILENT: 5,
};
