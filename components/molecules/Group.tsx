// Component
import { Form } from "antd";
import { InputGroupLabel } from "@/components/atoms/Label";
// Style
import { StyleProvider } from "@ant-design/cssinjs";

/** [Component] 폼(Form) 입력 그룹 */
export function FormInputGroup({ children, label, name }: {  children?: React.ReactNode, label: React.ReactNode, name: string }): JSX.Element {
  return (
    <StyleProvider hashPriority="low">
      <div className="mb-1">
        <InputGroupLabel>{label}</InputGroupLabel>
      </div>
      <Form.Item name={name}>{children}</Form.Item>
    </StyleProvider>
  )
}