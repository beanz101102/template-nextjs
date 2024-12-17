/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config

export default getRequestConfig(async ({ locale }) => {
  const messages = {};

  const messageFiles = ["common"];

  for (const file of messageFiles) {
    try {
      // eslint-disable-next-line @next/next/no-assign-module-variable
      const message = (await import(`../messages/${locale}/${file}.json`))
        .default;
      let finalMessage = message;
      if (!message[file]) {
        finalMessage = { [file]: message };
      }
      Object.assign(messages, finalMessage);
    } catch (error) {
      console.warn(`Failed to load messages for ${file} in ${locale}:`, error);
    }
  }

  return {
    messages,
  };
});
