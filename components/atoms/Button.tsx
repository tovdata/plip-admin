import { Button } from "antd";
// Icon
import { RightOutlined, SearchOutlined } from "@ant-design/icons";

/** [Component] 회사 선택 버튼 */
export function CompanySelectButton({ id }: { id: string }): JSX.Element {
  return (
    <Button icon={<RightOutlined />} shape="circle" type="text" />
  );
}
/** [Component] 로그인 버튼 */
export function LoginButton({ children }: { children: string }): JSX.Element {
  return (
    <button className="block bg-blue-500 border-0 cursor-pointer duration-300 rounded-md px-4 py-2 text-white w-full hover:bg-blue-600 transition-colors" type="submit">{children}</button>
  );
}
/** [Component] 검색 버튼 */
export function SearchButton(): JSX.Element {
  return (
    <button className="bg-white border-0 cursor-pointer flex hover:bg-slate-200 px-1.5 py-1.5 rounded-full text-base" type="submit">
      <SearchOutlined />
    </button>
  );
}