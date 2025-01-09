import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // اضافه کردن Font Awesome
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
