import React, { useCallback, useState } from "react";
// Component
import { SearchGroup } from "@/components/molecules/Group";
// Data type
import type { SearchOption } from "@/types";

/** [Component] 검색 가능한 목록 테이블 폼(Form) */
export function SearchableTableForm({ children, type }: { children: JSX.Element, type?: string }): JSX.Element {
  // 검색 옵션
  const [option, setOption] = useState<SearchOption>({ period: {} });
  // 검색된 데이터 수
  const [count, setCount] = useState<number>(0);
  
  /** [Event handler] 검색된 데이터 수 */
  const onCount = useCallback((value: number): void => setCount(value), []);
  /** [Event handler] 검색 */
  const onSearch = useCallback((value: SearchOption): void => setOption(value), []);

  return (
    <div>
      <div className="px-6 py-4">
        <SearchGroup onSearch={onSearch} type={type} />
      </div>
      <p className="border-0 border-dashed border-gray-200 border-t m-0 px-6 py-4 text-sm">{`검색 결과 : ${count}개`}</p>
      <>{React.cloneElement(children, { onCount, option })}</>
    </div>
  );
}