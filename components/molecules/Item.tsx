import { useRouter } from "next/router";
import { useCallback } from "react";
// Utilities
import { isEmptyNumber, lastSignin, transformToDate } from "@/utilities/common";
import { LastSigninTag } from "../atoms/Tag";

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
export function ServiceListItem({ service }: { service: any }): JSX.Element {
  return (
    <div className="border-solid border-0 border-b border-slate-200 cursor-pointer flex items-center justify-between last:border-b-0 px-6 py-3">
      <p className="m-0">{service.name}</p>
      <p className="m-0 text-gray-500 text-xs">{transformToDate(service.create_at)}</p>
    </div>
  );
}
/** [Component] 사용자 목록 아이템 */
export function UserListItem({ user }: { user: any }): JSX.Element {
  return (
    <div className="border-solid border-0 border-b border-slate-200 cursor-pointer flex items-center justify-between last:border-b-0 px-6 py-3">
      <div>
        <p className="m-0">{user.name}</p>
        <p className="m-0 text-gray-400 text-xs">{user.email}</p>
      </div>
      <div className="flex items-center">
        <LastSigninTag>{lastSignin(user.last_signin)}</LastSigninTag>
        <p className="ml-2 my-0 text-gray-500 text-xs">{transformToDate(user.affiliated_at)}</p>
      </div>
    </div>
  );
}