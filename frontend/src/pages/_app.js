import "../styles/globals.css";
import "@coinbase/onchainkit/styles.css";
import NavBar from "../Components/navbar";
import Footer from "../Components/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Playfair_Display } from "next/font/google";
import { MintifyProvider } from "../Context/mintifyContext";
import Loader from "../Components/Loader";
import { useState } from "react";
import { ThirdwebProvider } from "thirdweb/react";


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});


export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  return (
    <ThirdwebProvider>
      <MintifyProvider>
        <div className={`${playfair.className} bg-[#17123d]`}>
          <NavBar />
          <>{loading ? <Loader /> : <Component {...pageProps} />}</>

          <Footer />
        </div>
      </MintifyProvider>
    </ThirdwebProvider>
  );
}
