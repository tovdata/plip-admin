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
import { useAuthPopupSetter, useAuthPopupValue } from "@/models/jotai/atoms/authPopup";

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

// Ant-design theme
const theme: ThemeConfig = {
  token: {
    fontFamily: font.style.fontFamily
  }
}

/** [Component] 메인 */
export default function App({ Component, pageProps }: AppProps) {
  // 로그인 권한에 따른 팝업 상태
  const setAuthPopup = useAuthPopupSetter();

  // Query client
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
        onError: (error: any) => {
          if ((error as Error).name === 'UNAUTHORIZED') {
            setAuthPopup({open: true})
          }
        }
      }
    }
  });

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