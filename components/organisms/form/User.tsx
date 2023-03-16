import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
// Component
import { Input } from "antd";
import { SearchableTableForm } from "@/components/organisms/form/Common";
// Component (dynamic)
const UserList: ComponentType<any> = dynamic(() => import("@/components/molecules/List").then((module: any): any => module.UserList), { loading: () => (<></>), ssr: false });
const UserTable: ComponentType<any> = dynamic(() => import("@/components/molecules/Table").then((module: any): any => module.UserTable), { loading: () => (<></>), ssr: false });
// Data type
import type { ComponentType } from "react";

/** [Component] 사용자 목록 폼(Form) */
export function UserListForm({ companyId, onCount, onOpen }: { companyId: string, onCount: (value:number) => void, onOpen: (value: any) => void }): JSX.Element {
  // 검색 키워드
  const [keyword, setKeyword] = useState<string>("");

  /** [Event handler] 검색 */
  const onSearch = useCallback((value: string): void => setKeyword(value), []);

  return (
    <>
      <Input.Search addonBefore="사용자명" className="px-6" onSearch={onSearch} />
      <div className="mt-6">
        <UserList companyId={companyId} keyword={keyword} onCount={onCount} onOpen={onOpen} />
      </div>
    </>
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