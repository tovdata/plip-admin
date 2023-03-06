import { useCallback, useState } from "react";
// Component
import { Divider, Input } from "antd";
import { CompanyTable } from "@/components/molecules/Table";
import { ServiceList, UserList } from "@/components/molecules/List";

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
/** [Component] 서비스 목록 폼(Form) */
export function ServiceListForm({ companyId, onInit }: { companyId: string, onInit: (value: number) => void }): JSX.Element {
  // 검색 키워드
  const [keyword, setKeyword] = useState<string>("");

  /** [Event handler] 검색 */
  const onSearch = useCallback((value: string): void => setKeyword(value), []);

  return (
    <div>
      <Input.Search className="px-6" onSearch={onSearch} />
      <Divider className="mb-0" />
      <div>
        <ServiceList companyId={companyId} keyword={keyword} onInit={onInit} />
      </div>
    </div>
  );
}
/** [Component] 사용자 목록 폼(Form) */
export function UserListForm({ companyId, onInit }: { companyId: string, onInit: (value: number) => void }): JSX.Element {
  // 검색 키워드
  const [keyword, setKeyword] = useState<string>("");

  /** [Event handler] 검색 */
  const onSearch = useCallback((value: string): void => setKeyword(value), []);

  return (
    <div>
      <Input.Search className="px-6" onSearch={onSearch} />
      <Divider className="mb-0" />
      <div>
        <UserList companyId={companyId} keyword={keyword} onInit={onInit} />
      </div>
    </div>
  );
}