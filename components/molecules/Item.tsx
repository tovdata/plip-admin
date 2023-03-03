import { useRouter } from "next/router";
import { useCallback } from "react";

/** [Component] 회사 목록 아이템 */
export function CompanyListItem({ name, id }: { name: string, id: string }): JSX.Element {
  // 라우터
  const router = useRouter();

  /** [Event handler] 회사 선택 */
  const onClick = useCallback((): Promise<boolean> => router.push(`/company/${id}`), [id]);

  return (
    <p className="border-solid border-0 border-b border-slate-200 cursor-pointer m-0 px-6 py-3 last:border-b-0" onClick={onClick}>{name}</p>
  );
}
/** [Component] 서비스 목록 아이템 */
export function ServiceListItem({ name, id }: { name: string, id: string }): JSX.Element {
  return (
    <p className="border-solid border-0 border-b border-slate-200 cursor-pointer m-0 px-6 py-3 last:border-b-0">{name}</p>
  );
}