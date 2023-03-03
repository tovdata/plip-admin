import localFont from "next/font/local";
// Component
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
// Data type
import type { AppProps } from "next/app";
// Style
import '@/styles/globals.css';

// Local font
const font = localFont({
  display: "fallback",
  src: [{
    path: "../public/fonts/Pretendard-Regular.woff2",
    weight: "400"
  }, {
    path: "../public/fonts/Pretendard-Medium.woff2",
    weight: "500"
  }, {
    path: "../public/fonts/Pretendard-SemiBold.woff2",
    weight: "600"
  }, {
    path: "../public/fonts/Pretendard-Bold.woff2",
    weight: "700"
  }, {
    path: "../public/fonts/Pretendard-ExtraBold.woff2",
    weight: "800"
  }, {
    path: "../public/fonts/Pretendard-Black.woff2",
    weight: "900"
  }],
  variable: "--font-pretendard"
});

// Query client
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

/** [Component] 메인 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <main className={font.className}>
          <Component {...pageProps} />
        </main>
      </RecoilRoot>
    </QueryClientProvider>
  );
}