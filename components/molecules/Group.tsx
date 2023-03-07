// Component
import { Form } from "antd";
import { DescriptionGroupLabel, InputGroupLabel } from "@/components/atoms/Label";
import { transformToDate } from "@/utilities/common";
import { DescriptionParagraph } from "../atoms/Paragraph";

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
export function LastModifiedInfoGroup({ datetime, label, user }: { datetime?: number, label: string, user?: string }): JSX.Element {
  return (
    <div className="flex items-center justify-between last:mb-0 mb-1">
      <p className="font-semibold m-0">{label}</p>
      <div className="flex justify-between w-28">
        <DescriptionParagraph>{transformToDate(datetime)}</DescriptionParagraph>
        <DescriptionParagraph>{user}</DescriptionParagraph>
      </div>
    </div>
  );
}