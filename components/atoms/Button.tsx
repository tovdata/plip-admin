import { Button } from "antd";
// Icon
import { RightOutlined } from "@ant-design/icons";

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