import { useCallback, useState } from "react";
// Component
import { CompanyList } from "@/components/molecules/List";
import { Input } from "antd";

/** [Component] 회사 목록 폼(Form) */
export function CompanyListForm(): JSX.Element {
  // 검색 키워드
  const [keyword, setKeyword] = useState<string>("");
  // 검색된 데이터 갯수
  const [count, setCount] = useState<number>(0);
  
  /** [Event handler] 검색된 데이터 수 */
  const onCount = useCallback((value: number): void => setCount(value), []);
  /** [Event handler] 검색 */
  const onSearch = useCallback((value: string): void => setKeyword(value), []);

  return (
    <div className="flex flex-col h-full">
      <div className="border-solid border-0 border-b border-slate-200 p-6 pb-3">
        <Input.Search onSearch={onSearch} />
        <p className="m-0 pt-3">{`검색된 회사 수: ${count}`}</p>
      </div>
      <div className="flex-1 overflow-auto">
        <CompanyList keyword={keyword} onCount={onCount} />
      </div>
    </div>
  );
}