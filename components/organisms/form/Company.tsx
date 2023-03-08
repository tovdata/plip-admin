import { useCallback, useState } from "react";
// Component
import { Input } from "antd";
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
import { FormBox } from "@/components/molecules/Box";
import { CompanyTable } from "@/components/molecules/Table";

/** [Component] 회사 목록 폼(Form) */
export function CompanyListForm(): JSX.Element {
  // 검색 키워드
  const [keyword, setKeyword] = useState<string>("");
  // 검색된 데이터 수
  const [count, setCount] = useState<number>(0);
  
  /** [Event handler] 검색된 데이터 수 */
  const onCount = useCallback((value: number): void => setCount(value), []);
  /** [Event handler] 검색 */
  const onSearch = useCallback((value: string): void => setKeyword(value), []);

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-4 px-6">
        <div className="flex items-center">
          <p className="m-0 text-sm">{`검색된 회사 수: ${count}`}</p>
        </div>
        <div className="col-end-5 flex items-center">
          <Input.Search onSearch={onSearch} />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <CompanyTable keyword={keyword} onCount={onCount} />
      </div>
    </div>
  );
}
/** [Component] 개인정보 보호책임자 정보 폼(Form) */
export function CompanyInfoForm({ className, company }: { className?: string, company: any }): JSX.Element {
  return (
    <FormBox className={className} title="개인정보 보호책임자">
      <div className="pb-5 px-6">
        <h4 className="my-0">
          <>{company?.m_name}</>
          <small className="text-blue-600"> [{company?.m_position}]</small>
        </h4>
        <DescriptionParagraph>{company?.m_email}</DescriptionParagraph>
      </div>
    </FormBox>
  );
}