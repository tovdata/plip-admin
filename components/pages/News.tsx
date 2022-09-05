import { useCallback, useState } from 'react';
// Component
import { PageHeader } from '@/components/atoms/Header';
import Layout from '@/components/atoms/Layout';
import { News, NewsList } from '@/components/atoms/News';

const Page: React.FC<any> = (): JSX.Element => {
  // 선택된 뉴스
  const [news, setNews] = useState<any>(undefined);

  /** [Event handler] 뉴스 선택 초기화 */
  const onClear = useCallback((): void => setNews(undefined), []);
  /** [Event handler] 뉴스 선택 (생성 포함) */
  const onSelect = useCallback((record: any): void => setNews(record), []);

  // 컴포넌트 반환
  return (
    <Layout selectedKey='news'>
      {news ? (
        <News news={news} onClear={onClear} onSelect={onSelect} />
      ) : (
        <>
          <PageHeader ghost title='뉴스 관리' />
          <NewsList onSelect={onSelect} />
        </>
      )}
    </Layout>
  );
}

export default Page;