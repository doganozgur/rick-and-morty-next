import type { AppProps } from "next/app";
import { Poppins } from "@next/font/google";
import "@/styles/main.scss";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
