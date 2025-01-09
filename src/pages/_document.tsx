import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fa" dir="rtl">
      <Head>
        {/* فونت فارسی Hakaza */}
        <link
          rel="stylesheet"
          href="https://cdn.fontstorage.ir/fonts/hakaza/font-face.css"
        />
        
        {/* فونت انگلیسی Playfair Display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
        />

        {/* Font Awesome برای آیکون‌ها */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          integrity="sha384-dyB8e+45+qx6J7gWyQNKrujvW/txFr3U5I9rtBvjGIA6zRRoRx1Ksm5YYcdmHnYh"
          crossOrigin="anonymous"
        />
        <link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
  rel="stylesheet"
/>

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
