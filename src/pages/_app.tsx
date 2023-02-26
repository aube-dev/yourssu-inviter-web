import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Noto_Sans_KR } from '@next/font/google';

const notoSansKR = Noto_Sans_KR({
  weight: ['500', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          * {
            font-family: ${notoSansKR.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
