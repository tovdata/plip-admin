import { useMemo } from "react";
// Component
import { Select } from "antd";
// Data type
import type { SEARCH_TYPE } from "@/types";

/** [Component] 키워드 검색 셀렉트 */
export function KeywordSearchSelect({ onChange, searchType }: { onChange: (value: SEARCH_TYPE) => void, searchType: "company" | "service" | "user" }): JSX.Element {
  // 옵션
  const options: any[] = useMemo(() => [
    { label: "회사", value: "company" },
    { label: "서비스", value: "service" },
    { label: "사용자", value: "user" }
  ], []);

  return (
    <Select className="w-20" onChange={onChange} options={options} value={searchType} />
  );
}