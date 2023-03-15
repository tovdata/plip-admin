import { useCallback, useMemo, useState } from "react";
// Component
import { Input } from "antd";
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
import { FormBox } from "@/components/molecules/Box";
import { UserList } from "@/components/molecules/List";
import { UserTable } from "@/components/molecules/Table";
import { SearchableTableForm } from "@/components/organisms/form/Common";

/** [Component] 사용자 목록 폼(Form) */
export function UserListForm({ companyId, onOpen }: { companyId: string, onOpen: (value: any) => void }): JSX.Element {
  // 검색 키워드
  const [keyword, setKeyword] = useState<string>("");
  // 사용자 수
  const [count, setCount] = useState<number>(0);

  /** [Event handler] 사용자 수 설정 */
  const onCount = useCallback((value:number): void => setCount(value), []);
  /** [Event handler] 검색 */
  const onSearch = useCallback((value: string): void => setKeyword(value), []);

  // 소속 사용자 수 Element
  const uElement: React.ReactNode = useMemo(() => (<DescriptionParagraph>{`${count} 명`}</DescriptionParagraph>), [count]);

  return (
    <FormBox className="h-full" extra={uElement} title="사용자">
      <Input.Search addonBefore="사용자명" className="px-6" onSearch={onSearch} />
      <div className="mt-6">
        <UserList companyId={companyId} keyword={keyword} onCount={onCount} onOpen={onOpen} />
      </div>
    </FormBox>
  );
}
/** [Component] 사용자 목록 테이블 폼(Form) */
export function UserTableForm(): JSX.Element {
  return (
    <SearchableTableForm type="user">
      <UserTable />
    </SearchableTableForm>
  );
}