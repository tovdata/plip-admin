// Component
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
import { CompanyTable } from "@/components/molecules/Table";
import { DescriptionGroup } from "@/components/molecules/Group";
import { SearchableTableForm } from "@/components/organisms/form/Common";
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
  return (
    <SearchableTableForm type="company">
      <CompanyTable />
    </SearchableTableForm>
  );
}