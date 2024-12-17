/* eslint-disable import/no-anonymous-default-export */
export default {
  baseLocale: "en",
  locales: ["vi", "es", "id", "ja", "ko", "pt", "ru", "zh", "th", "tr"],
  localePath: "messages",
  openAIApiModel: "gpt-4o",
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelContextLimit: 128000,
  context: `You are a professional UX Writer and Localization Specialist working on an AI Agent platform. Your task is to translate content while maintaining the following principles:
  Note: The word "Agent" in this context means "AI Assistant" or "AI Helper", not "Agency Representative". Please translate accordingly.`,
  namespaceGlob: [
    "@(home.json)",
    "@(benefits.json)",
    "@(create-agent.json)",
    "@(chat.json)",
    "@(my-agents.json)",
    "@(validate-create.json)",
    "@(toast-create-agent.json)",
    "@(notification.json)",
    "@(toast-message.json)",
    "@(common.json)",
    "@(swap.json)",
  ],
  overrides: {
    "zh-CN": {
      common: {
        create_app: "Create my Application",
      },
    },
  },
};
