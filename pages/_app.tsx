import localFont from "next/font/local";
// Component
import { RecoilRoot } from "recoil";
import { StyleProvider } from "@ant-design/cssinjs"
import Authorization from '@/components/templates/Auth';
import GlobalQueryProvider from '@/components/templates/Provider';
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

// Ant-design theme
const theme: ThemeConfig = {
  components: {
    Modal: {
      fontFamily: font.style.fontFamily
    }
  },
  token: {
    fontFamily: font.style.fontFamily
  }
}

/** [Component] 메인 */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <RecoilRoot>
        <GlobalQueryProvider>
          <StyleProvider hashPriority="high">
            <main className={`bg-inherit ${font.className}`}>
              <Authorization>
                <Component {...pageProps} />
              </Authorization>
            </main>
          </StyleProvider>
        </GlobalQueryProvider>
      </RecoilRoot>
    </ConfigProvider>
  );
}