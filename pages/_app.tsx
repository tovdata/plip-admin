import '../styles/globals.css'
import type { AppProps } from 'next/app'
// React Query
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Recoil
import { RecoilRoot } from 'recoil';
// Style
import 'antd/dist/antd.css';
import { createGlobalStyle } from 'styled-components';

// 글로벌 스타일
const GlobalStyle = createGlobalStyle`
  body {
    .ant-table table {
      user-select: none;
    }
    .ant-table table > .ant-table-tbody > .ant-table-row {
      cursor: pointer;
    }
  }
`;

// 쿼리 클라이언트
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <GlobalStyle />
          <Component {...pageProps} />
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp
