/* eslint-disable import/no-anonymous-default-export */
export default {
  baseLocale: "en",
  locales: ["vi", "es", "id", "ja", "ko", "pt", "ru", "zh", "th", "tr"],
  localePath: "messages",
  openAIApiModel: "gpt-4o",
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelContextLimit: 128000,
  context: "",
  namespaceGlob: ["@(common.json)"],
  overrides: {
    "zh-CN": {
      common: {
        create_app: "Create my Application",
      },
    },
  },
};
