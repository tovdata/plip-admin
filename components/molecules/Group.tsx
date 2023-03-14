import { useCallback, useMemo, useState } from "react";
// Component
import { Form, Input } from "antd";
import { DescriptionGroupLabel, InputGroupLabel } from "@/components/atoms/Label";
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
import { KeywordSearchSelect } from "@/components/atoms/Select";
// Data type
import type { SEARCH_TYPE } from "@/types";
// Utilities
import { transformToDate } from "@/utilities/common";
import { SearchButton } from "../atoms/Button";


/** [Component] 설명 그룹 */
export function DescriptionGroup({ children, className, displayEmpty, label }: { children?: React.ReactNode, className?: string, displayEmpty?: boolean, label: React.ReactNode }): JSX.Element {
  return (
    <div className={className}>
      <div className="flex items-center mb-0.5">
        <DescriptionGroupLabel>{label}</DescriptionGroupLabel>
      </div>
      {children ? (
        <p className="m-0">{children}</p>
      ) : displayEmpty ? (
        <p className="m-0 text-gray-300">None</p>
      ) : (<></>)}
    </div>
  );
}
/** [Component] 폼(Form) 입력 그룹 */
export function FormInputGroup({ children, label, name, rules }: {  children?: React.ReactNode, label: React.ReactNode, name: string, rules?: any[] }): JSX.Element {
  return (
    <div>
      <div className="mb-1">
        <InputGroupLabel>{label}</InputGroupLabel>
      </div>
      <Form.Item name={name} rules={rules}>{children}</Form.Item>
    </div>
  )
}
/** [Component] 최근 정보 수정일 그룹 */
export function LastModifiedInfoGroup({ className, datetime, label, user }: { className?: string, datetime?: number, label: string, user?: string }): JSX.Element {
  // 클래스
  const combineClassName: string = useMemo(() => {
    const cn: string = "font-semibold mb-1 mt-0";
    return className ? `${cn} ${className}` : cn;
  }, [className]);

  return (
    <div className="flex flex-wrap justify-between last:mb-0 mb-1">
      <h4 className={combineClassName}>{label}</h4>
      <div className="flex justify-between w-36">
        <DescriptionParagraph>{transformToDate(datetime)}</DescriptionParagraph>
        <DescriptionParagraph>{user}</DescriptionParagraph>
      </div>
    </div>
  );
}
/** [Component] 검색 그룹 */
export function SearchGroup(): JSX.Element {
  // 검색 유형
  const [searchType, setSearchType] = useState<SEARCH_TYPE>("company");
  // 입력 엘리먼트 스타일
  const inputStyle: React.CSSProperties = useMemo(() => ({ width: "calc(100% - 80px)" }), []);

  /** [Event handler] 검색 유형 변경 */
  const onChangeSearchType = useCallback((value: SEARCH_TYPE): void => setSearchType(value), []);

  return (
    // <Input.Group compact>
    //   <KeywordSearchSelect onChange={onChangeSearchType} searchType={searchType} />
    //   <Input.Search style={inputStyle} />
    // </Input.Group>
    <form className="relative">
      <input type="search" className="bg-white block border-0 duration-300 drop-shadow-md pl-6 pr-10 py-3 rounded-full transition-all text-gray-900 text-sm w-full" placeholder="Search Mockups, Logos..." required />
      <div className="absolute flex flex-col h-full justify-center right-2 top-0">
        <SearchButton />
      </div>
    </form>
  );
}