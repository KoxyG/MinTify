import { useAvatar, useName } from '@coinbase/onchainkit/identity';
import { createContext, useContext } from "react";
import { baseSepolia } from 'wagmi/chains';
import { setOnchainKitConfig } from "@coinbase/onchainkit";
// import { useAccount } from "wagmi";

const MintifyContext = createContext();

export function useMintifyContext() {
  return useContext(MintifyContext);
}

export function MintifyProvider({ children }) {

  const API_KEY = process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY;
  // setOnchainKitConfig({ apiKey: API_KEY });
  // const { data: name, isLoading: nameIsLoading } = useName({ address, chain: baseSepolia });
  // const { data: avatar, isLoading: avatarIsLoading } = useAvatar({ address, chain: baseSepolia });

  return (
    <MintifyContext.Provider
      value={{
        // nameIsLoading,
        // address,
        // avatar,
        // avatarIsLoading,
      }}
    >
      {children}
    </MintifyContext.Provider>
  );
}