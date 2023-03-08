import { useCallback, useMemo, useState } from "react";
// Component
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
import { FormBox } from "@/components/molecules/Box";
import { ConsentTable, IppTable, PippTable } from "@/components/molecules/Table";

/** [Component] 동의서 문서 목록 폼(Form) */
export function ConsentDocumentationForm({ serviceId }: { serviceId: string }): JSX.Element {
  // 동의서 개수
  const [count, setCount] = useState<number>(0);

  /** [Event handler] 동의서 개수 설정 */
  const onCount = useCallback((value: number): void => setCount(value), []);

  // Extra Element
  const extra: React.ReactNode = useMemo(() => (<DescriptionParagraph>{`${count} 개`}</DescriptionParagraph>), [count]);

  return (
    <FormBox extra={extra} title="동의서">
      <ConsentTable onCount={onCount} serviceId={serviceId} />
    </FormBox>
  );
}
/** [Component] 내부 관리계획 문서 목록 폼(Form) */
export function IppDocumentationForm({ companyId }: { companyId: string }): JSX.Element {
  // 동의서 개수
  const [count, setCount] = useState<number>(0);
  /** [Event handler] 동의서 개수 설정 */
  const onCount = useCallback((value: number): void => setCount(value), []);

  // Extra Element
  const extra: React.ReactNode = useMemo(() => (<DescriptionParagraph>{`${count} 개`}</DescriptionParagraph>), [count]);

  return (
    <FormBox extra={extra} title="내부 관리계획">
      <IppTable companyId={companyId} onCount={onCount} />
    </FormBox>
  );
}
/** [Component] 개인정보 처리방침 문서 목록 폼(Form) */
export function PippDocumentationForm({ serviceId }: { serviceId: string }): JSX.Element {
  // 동의서 개수
  const [count, setCount] = useState<number>(0);

  /** [Event handler] 동의서 개수 설정 */
  const onCount = useCallback((value: number): void => setCount(value), []);

  // Extra Element
  const extra: React.ReactNode = useMemo(() => (<DescriptionParagraph>{`${count} 개`}</DescriptionParagraph>), [count]);

  return (
    <FormBox extra={extra} title="개인정보 처리방침">
      <PippTable onCount={onCount} serviceId={serviceId} />
    </FormBox>
  );
}