import { useCallback, useState } from "react";
// Component
import { Input } from "antd";
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
import { CompanyTable } from "@/components/molecules/Table";
import { DescriptionGroup } from "@/components/molecules/Group";
// Utilities
import { transformToDate } from "@/utilities/common";

/** [Component] 회사 정보 폼(Form) */
export function CompanyInfoForm({ company }: { company: any }): JSX.Element {
  return (
    <div className="grid grid-cols-12 pb-5 px-6">
      <DescriptionGroup className="col-span-3" label="회사명">{company?.name}</DescriptionGroup>
      <DescriptionGroup className="col-span-3" label="생성 일자">{transformToDate(company?.created_at)}</DescriptionGroup>
      <DescriptionGroup className="col-span-3" label="개인정보 보호책임자">
        <div className="flex flex-wrap items-end">
          <p className="mr-2 my-0">
            <>{company?.m_name}</>
            <small className="text-blue-600"> [{company?.m_position}]</small>
          </p>
          <DescriptionParagraph>{company?.m_email}</DescriptionParagraph>
        </div>
      </DescriptionGroup>
    </div>
    
  );
}
/** [Component] 회사 목록 테이블 폼(Form) */
export function CompanyTableForm(): JSX.Element {
  // 검색 키워드
  const [keyword, setKeyword] = useState<string>("");
  // 검색된 데이터 수
  const [count, setCount] = useState<number>(0);
  
  /** [Event handler] 검색된 데이터 수 */
  const onCount = useCallback((value: number): void => setCount(value), []);
  /** [Event handler] 검색 */
  const onSearch = useCallback((value: string): void => setKeyword(value), []);

  return (
    <div>
      <div className="mb-4 px-6">
        <Input.Search addonBefore="회사명" onSearch={onSearch} />
        <p className="mb-0 text-sm">{`검색 결과 : ${count}개`}</p>
      </div>
      <CompanyTable keyword={keyword} onCount={onCount} />
    </div>
  );
}