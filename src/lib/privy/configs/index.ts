/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { CHAINS } from "../../wagmi/configs/chains";

export const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
if (!chainId) throw new Error("Chain ID not found, set NEXT_PUBLIC_CHAIN_ID");

const supportedChains = [CHAINS[chainId]];

export const commonConfigPrivy = {
  appearance: {
    theme: "dark",
    accentColor: "#3b82f6",
  },
  defaultChain: CHAINS[chainId],
  supportedChains,
  embeddedWallets: {
    createOnLogin: "users-without-wallets",
  },
};
