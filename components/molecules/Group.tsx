import { useMemo } from "react";
// Component
import { Form } from "antd";
import { DescriptionGroupLabel, InputGroupLabel } from "@/components/atoms/Label";
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
// Utilities
import { transformToDate } from "@/utilities/common";

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