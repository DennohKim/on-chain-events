import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { publicProvider } from "wagmi/providers/public";
import { createConfig, WagmiConfig, configureChains } from "wagmi";
import { createPublicClient, http } from "viem";
import { celoAlfajores } from "@wagmi/core/chains";


export default function App({ Component, pageProps }) {

  const { chains } = configureChains(
    [celoAlfajores],
    [publicProvider()]
  );
  
  const { connectors } = getDefaultWallets({
    appName: "Celo NFT Marketplace",
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    chains,
  });

  const config = createConfig({
    autoConnect: true,
    publicClient: createPublicClient({
      chain: celoAlfajores,
      transport: http()
    }),
    connectors
  });
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
