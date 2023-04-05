import localFont from "next/font/local";
// Component
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from "recoil";
import { StyleProvider } from "@ant-design/cssinjs"
import { Authorization } from "@/components/templates/layout/Auth";
// Data type
import type { ThemeConfig } from "antd";
import type { AppProps } from "next/app";
// Style
import '@/styles/globals.css';
import { ConfigProvider } from "antd";

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
      retry: 0,  // error를 바로 캐치하여 반응하기 위해 0으로 설정하였습니다.
      // useErrorBoundary: true,  // useQuery를 발생하는 모든 오류를 AuthLayout에서 받을 수 있도록 defaultOption으로 설정했습니다.
      refetchOnWindowFocus: false
    }
  }
});
// Ant-design theme
const theme: ThemeConfig = {
  token: {
    fontFamily: font.style.fontFamily
  }
}

/** [Component] 메인 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <StyleProvider hashPriority="high">
          <ConfigProvider theme={theme}>
              <main className={`bg-inherit ${font.className}`}>
                <Authorization>
                  <Component {...pageProps} />
                </Authorization>
              </main>
          </ConfigProvider>
        </StyleProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}