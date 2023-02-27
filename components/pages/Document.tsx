import { useCallback, useState } from 'react';
// Component
import Layout from '@/components/atoms/Layout';
import { PageHeader } from '@/components/atoms/Header';
import { Document, Documents } from '@/components/atoms/Document';

const Page: React.FC<any> = (): JSX.Element => {
  // 선택된 자료
  const [document, setDocument] = useState<any>(undefined);

  /** [Event handler] 자료 선택 초기화 */
  const onClear = useCallback((): void => setDocument(undefined), []);
  /** [Event handler] 자료 선택 (생성 포함) */
  const onSelect = useCallback((record: any): void => setDocument(record), []);

  // 컴포넌트 반환
  return (
    <Layout selectedKey='document'>
      {document ? (
        <Document document={document} onClear={onClear} onSelect={onSelect} />
      ) : (
        <>
          <PageHeader ghost title='자료 관리' />
          <Documents onSelect={onSelect} />
        </>
      )}
    </Layout>
  );
}

export default Page;